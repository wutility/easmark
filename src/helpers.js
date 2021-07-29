function outdent (text) {
  const m = text.match(new RegExp('^' + (text.match(/^\s+/) || '')[0], 'gm'))
  if (m) {
    text = text.replace(new RegExp('^' + (text.match(/^\s+/) || '')[0], 'gm'), '')
  }
  else {
    text = '- ssfsdfsffsfsfsf'
  }

  console.log(text);
  return text;
}

export {
  outdent
}