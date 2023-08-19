// https://codepen.io/rothkj1022/pen/eNONZz
function toSentenceCase(theString) {
	var newString = theString.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g,function(c){return c.toUpperCase()});
  return newString;
}

// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export {
  toSentenceCase,
  toTitleCase
}