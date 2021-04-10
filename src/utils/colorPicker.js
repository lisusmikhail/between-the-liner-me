
function colorPicker(entry) {

  let color;
  switch (entry.name) {
    case 'sadness':
      color = `#007Aff`;
      break;
    case 'joy':
      color = `#fb8832`;
      break;
    case 'fear':
      color = `#dadada`;
      break;
    case 'disgust':
      color = `#97aa76`;
      break;
    case 'anger':
      color = `#9b51e0`;
      break;
    case 'no emotion':
      color = `#e6e5e6`;
      break;
    default:
      color = `#73c85b`;
  }


  return color;
}

export default colorPicker;
