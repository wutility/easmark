var utilInline = {
  regex: {
    code: /(`{3,}|~{3,})\n? *(\S+)? *([\s\S]+?)\1/gm,
    media: /[!&]?\[([!&]?\[.*?\)|[^\]]*?)]\((.*?)( .*?)?\)|(\w+:\/\/[$\-.+!*'()/,\w]+)/g // image or link or iframe
  },
  code (text, regex) {
    return text.replace(regex, (_, backticks, lang, code) => {

      code = code.replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

      return `<pre><code class="language-${lang}">${code.replace(/^\n*\s+/g, '')}</code></pre>`
    });
  },
  media (text, regex) {    
    console.log(text);
   return text.replace(regex, (match, title, src) => {
      return /^!/.test(match)
        ? `<img src="${src}" alt="${title}">\n`
        : /^&/.test(match)
          ? `<iframe src="${src}" title="${title}"></iframe>\n`
          : `<a href="${src}">${title}</a>\n`
    });
  }
}

/**
 * line.replace(regex, (match, title, src) => {
      console.log(match);
      return /^!/.test(match)
        ? `<img src="${src}" alt="${title}">`
        : /^&/.test(match)
          ? `<iframe src="${src}" title="${title}"></iframe>`
          : `<a href="${src}">${title}</a>`
    })
 */