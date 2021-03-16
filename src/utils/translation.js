import {db} from './firebase';

const handleTranslation = (
    text, setChartLoader, analyzeText, setError, frontendErrorLog) => {
  setChartLoader(true);
  db.collection('translations').add({input: text}).then(docRef => {
    db.collection('translations')
      .doc(docRef.id)
      .onSnapshot({includeMetadataChanges: true}, doc => {
        if (doc.data().translated !== undefined) {
          setChartLoader(false);
          (doc.data().translated.en !== text) &&
          analyzeText(doc.data().translated.en);
          (doc.data().translated.en === text) &&
          setError('Unsupported text language');
        }
      });
  }).catch(err => {
    frontendErrorLog(err).then(_ => {
    }).catch(_ => {
    });
  });
};

export default handleTranslation;
