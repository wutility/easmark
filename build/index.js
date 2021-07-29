const utilBlock = {
  regex: {
    list: /^(?:(^|\n)([+-]|\d+\.) +(.*(\n[ \t]+.*)*))+/,
    table: /^(\|[^\n]+\|\r?\n)((?:\|:?[-]+:?)+\|)(\n(?:\|[^\n]+\|\r?\n?)*)/g,
    //  taskList: /\-\s\[\s?x?\]\s+(.*)\n/g,
    code: /(`{3,}|~{3,})\n? *(\S+)? *([\s\S]+?)\1/gm,
  },
  code (text, regex) {
    return text.replace(regex, (_, backticks, lang, code) => {

      code = code.replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

      return `<pre><code class="language-${lang}">${code.replace(/^\n*\s+/g, '')}</code></pre>`
    })
  },
  list (text, regex, listType) {
    // let self = this
    // listType = text.match(/^[+-]/m) ? 'ul' : 'ol';
    // return text ?
    //   `<${listType}>${text.replace(/(?:[+-]|\d+\.) +(.*)\n?(([ \t].*\n?)*)/g, (_, a, b) =>
    //     `<li>${(`${a}\n${outdent(b)
    //       .replace(regex, self.list)}`)}</li>`)}</${listType}>`
    //   : '';
    return text
  },
  taskList (text, regex, listType) {
    return text
  },
  table (text) {
    return text
  }
};

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
    text = text.replace(/\>\s+/g, '');
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
};

function cleanUp (text) {
  const boldItalic = /([*_]{1,3})((.|\n)+?)\1/g;
  const strike = /(~{1,3})((.|\n)+?)\1/g;
  const marked = /`([^`].*?)`/g;

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
    text = `<p>${text}</p>`;
  }

  return text
}

function applyRegex (block, util) {
  Object.keys(util.regex).forEach(reg => {
    if (block.match(util.regex[reg])) block = util[reg](block, util.regex[reg]);
  });
  return block
}

function easmark (text) {
  let blocks = text.split(/\n\s*\n/);
  let result = [];

  for (let block of blocks) {
    block = applyRegex(block, utilInline);
    block = applyRegex(block, utilBlock);
    
    result.push(block);
  }

  return result.map(line => cleanUp(line)).join('\n')
}

export default easmark;
//# sourceMappingURL=index.js.map
