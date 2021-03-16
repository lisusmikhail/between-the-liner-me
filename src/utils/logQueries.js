import {db} from './firebase';

const logQueries = (result, text, frontendErrorLog) => {
  const {emotions, isEnglish, isError, isProcessableEntity} = result.data;
  db.collection('query').add({
    input: text,
    emotions: emotions,
    isEnglish: isEnglish,
    isError: isError,
    isProcessableEntity: isProcessableEntity,
    timestamp: new Date().getTime(),
  }).then(() => {
  }).catch(err => {
    frontendErrorLog(err).then(_ => {
    }).catch(_ => {
    });
  });
};

export default logQueries;
