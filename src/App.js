import React, {useState, useEffect} from 'react';
import Loader from 'react-loader-spinner';
import TextArea from './components/TextArea/TextArea';
import EmotionChart from './components/EmotionChart/EmotionChart';
import useWindowSize from './customHooks/useWindowSize';
import {SIGNIFICANT_VALUE_THRESHOLD} from './utils/constants';
import {functions} from './utils/firebase';
import logQueries from './utils/logQueries';
import handleTranslation from './utils/translation';
import './App.css';

function App() {
  // functions.useEmulator("localhost", 5001);
  const textToCheck = functions.httpsCallable('textToCheck');
  const frontendErrorLog = functions.httpsCallable('frontendErrorLog');
  const [emotions, setEmotions] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [chartLoader, setChartLoader] = useState(false);
  const [typingLoader, setTypingLoader] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  
  const resetStates = () => {
    setEmotions([]);
    setData([]);
    setError('');
  };
  
  const windowSize = useWindowSize();
  
  const handleTypings = (state) => {
    setTypingLoader(state);
  };
  
  const analyzeResults = (result, text) => {
    const {emotions, isEnglish, isError, isProcessableEntity} = result.data;
    if (emotions) {
      setEmotions(Object.entries(emotions));
      setError('');
    } else if (isError && !isEnglish) {
      handleTranslation(text, setChartLoader, analyzeText, setError,
          frontendErrorLog);
    } else if (isError && !isProcessableEntity) {
      setError('Not enough text..');
    } else {
      setError('Sorry, some error occurred.');
    }
  };
  
  const analyzeText = (text) => {
    setChartLoader(true);
    setTypingLoader(false);
    resetStates();
    textToCheck(text).then((result) => {
      setChartLoader(false);
      setTypingLoader(false);
      logQueries(result, text, frontendErrorLog);
      analyzeResults(result, text);
    }).catch((err) => {
      frontendErrorLog(err).then(_ => {
      }).catch(_ => {
      });
      setChartLoader(false);
      setTypingLoader(false);
      setError('Sorry, some error occurred. Try again later.');
    });
  };
  
  useEffect(() => {
    setScreenWidth(windowSize.width);
  }, [windowSize]);
  
  useEffect(() => {
    const highPercentageEmotion = emotions.filter((emotion) => {
      return emotion[1] > SIGNIFICANT_VALUE_THRESHOLD;
    });
    if (highPercentageEmotion.length === 0 && emotions.length !== 0) {
      setData(oldArray => [...oldArray, {name: 'no emotion', value: 1}]);
    } else if (emotions.length - highPercentageEmotion.length > 1) {
      // eslint-disable-next-line array-callback-return
      highPercentageEmotion.map(emotion => {
        setData(
            oldArray => [...oldArray, {name: emotion[0], value: emotion[1]}]);
      });
    } else {
      // eslint-disable-next-line array-callback-return
      emotions.map(emotion => {
        setData(
            oldArray => [...oldArray, {name: emotion[0], value: emotion[1]}]);
      });
    }
  }, [emotions]);
  
  return (
      <div className='main' id='main'>
        <h1 className='main__title'>Between-The-Liner</h1>
        <p className='main__subtitle'>Get an instant emotional analysis of your
          text.
        </p>
        <TextArea
            analyzeText={analyzeText}
            resetStates={resetStates}
            handleTypings={handleTypings}
            error={error}
        />
        {(error !== '') &&
        <p className='main__subtitle main__subtitle_error'>{error}</p>}
        {typingLoader && <Loader
            className='main__typing-loader'
            type='ThreeDots'
            color='#8f0505'
            height={100}
            width={100}
            timeout={20000}
        />}
        {chartLoader && <Loader
            className='main__chart-loader'
            type='TailSpin'
            color='#8f0505'
            height={100}
            width={100}
            timeout={20000}
        />}
        <EmotionChart
            data={data}
            screenWidth={screenWidth}
        />
      </div>
  );
}

export default App;

