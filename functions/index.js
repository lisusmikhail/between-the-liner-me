const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const NaturalLanguageUnderstandingV1 = require(
    "ibm-watson/natural-language-understanding/v1");
const {IamAuthenticator} = require("ibm-watson/auth");
const API_KEY = functions.config().watson.key;
const API_URL = functions.config().watson.url;

const winston = require("winston");
const {LoggingWinston} = require("@google-cloud/logging-winston");
const loggingWinston = new LoggingWinston();
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    loggingWinston,
  ],
});

const getNLUInstance = () => {
  return new NaturalLanguageUnderstandingV1({
    version: "2020-08-01",
    authenticator: new IamAuthenticator({
      apikey: API_KEY,
    }),
    serviceUrl: API_URL,
  });
};

const errorHandler = (err) => {
  const isUnsupportedLanguage = (JSON.parse(err.body).
      error.
      indexOf("unsupported text language:") !== -1);
  const isNotProcessableEntity = (JSON.parse(err.body).
      error.
      indexOf("not enough text for language id") !== -1);
  if (isUnsupportedLanguage) {
    return {
      emotions: null,
      isEnglish: false,
      isError: true,
      isProcessableEntity: true,
    };
  } else if (isNotProcessableEntity) {
    return {
      emotions: null,
      isEnglish: true,
      isError: true,
      isProcessableEntity: false,
    };
  } else {
    return {
      emotions: null,
      isEnglish: true,
      isError: true,
      isProcessableEntity: true,
    };
  }
};

const emotionCalc = (text) => {
  const naturalLanguageUnderstanding = getNLUInstance();
  const analyzeParams = {
    "features": {
      "emotion": {},
    },
    "text": text,
  };

  return naturalLanguageUnderstanding.analyze(analyzeParams).
      then((analysisResults) => {
        const emotions = analysisResults.result.emotion.document.emotion;
        logger.info(JSON.stringify(emotions), analysisResults);
        return {
          emotions: emotions,
          isEnglish: true,
          isError: false,
          isProcessableEntity: true,
        };
      }).
      catch((err) => {
        logger.error("Watson Error:", err);
        return errorHandler(err);
      });
};

exports.textToCheck = functions.https.onCall((text, context) => {
  return emotionCalc(text);
});

exports.frontendErrorLog = functions.https.onCall((err, context) => {
  logger.error(JSON.stringify(err));
});
