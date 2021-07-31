export default function cleanUp (text) {
  const boldItalic = /([*_]{1,3})((.|\n)+?)\1/g
  const strike = /(~{2,})((.|\n)+?)\1/g
  const marked = /`([^`].*?)`/g

  text = text.replace(boldItalic, (_, stars, value) => {
    return stars.length === 1
      ? `<em>${value}</em>`
      : stars.length === 3
        ? `<strong><em>${value}</strong></em>`
        : `<strong>${value}</strong>`
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
  if (!/^\<.*\>/g.test(text.trim())) {
    text = `<p>${text}</p>`
  }

  return text
}