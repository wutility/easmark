export default function cleanUp (text) {
  const boldItalic = /([*_]{1,3})((.|\n)+?)\1/g
  const strike = /(~{1,3})((.|\n)+?)\1/g
  const marked = /`([^`].*?)`/g

  text = text.replace(boldItalic, (_, stars, value) => {
    return stars.length % 2 ? `<strong>${value}</strong>` : `<em>${value}</em>`
  });

  // match: ~~word~~
  text = text.replace(strike, (_, stars, value) => {
    return `<s>${value}</s>`
  });

  // match: `word`
  text = text.replace(marked, (_, value) => {
    return `<span class="marked">${value}</span>`
  });

  // paragraph
  if(!/^\<.*\>/g.test(text.trim())) {
    text = `<p>${text}</p>`
  }

  return text
}