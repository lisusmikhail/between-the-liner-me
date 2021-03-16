
function colorPicker(entry) {
  
  let color;
  switch (entry.name) {
    case 'sadness':
      color = `#cf5c10`;
      break;
    case 'joy':
      color = `#00C49F`;
      break;
    case 'fear':
      color = `#123777`;
      break;
    case 'disgust':
      color = `#FFBB28`;
      break;
    case 'anger':
      color = `#c40065`;
      break;
    case 'no emotion':
      color = `#a9c36b`;
      break;
    default:
      color = `#73c85b`;
  }
  
  
  return color;
}

export default colorPicker;
