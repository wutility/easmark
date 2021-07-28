var utilBlocks = {
  regex: {    
    heading: /^(#+)\s+(.*)/,
    blockquote: /^>\s+.*/g,
    list: /^(?:(^|\n)([+-]|\d+\.) +(.*(\n[ \t]+.*)*))+/,
  },
  heading (text, regex) {
    return text.replace(regex, (_, hash, value) => {
      return `<h${hash.length}>${value}</h${hash.length}>`
    });
  },
  blockquote (text) {
    text = text.replace(/\>\s+/g, '')
    return `<blockquote>${text}</blockquote>`
  },
  list (text, regex, temp) {
    return text
  },
  table (text) {
    return text
  }
}
