const utilInline = {
  regex: {
    //url:/https?:\/\/[^\/?#\s]*(?:\/[^?#\s]*)?(?:\?[^#\s]*)?(?:#\S*)?/g,
    heading: /^(#+)\s+(.*)/,
    blockquote: /^>\s+.*/g,
    media: /[!&]?\[([!&]?\[.*?\)|[^\]]*?)]\((.*?)( .*?)?\)|(\w+:\/\/[$\-.+!*'()/,\w]+)/g
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
  media (text, regex) {
   return text.replace(regex, (match, title, src) => {
      return /^!/.test(match)
        ? `<img src="${src}" alt="${title}">\n`
        : /^&/.test(match)
          ? `<iframe src="${src}" title="${title}"></iframe>\n`
          : `<a href="${src}">${title}</a>\n`
    });
  }
}

export default utilInline