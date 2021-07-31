const outdent = (text) => {
  return text.replace(new RegExp('^' + (text.match(/^\s+/) || '')[0], 'gm'), '');
}

const utilBlock = {
  regex: {
    list: /^(?:(^|\n)([+-]|\d+\.) +(.*(\n[ \t]+.*)*))+/g,
    table: /^(\|[^\n]+\|\r?\n)((?:\|:?[-]+:?)+\|)(\n(?:\|[^\n]+\|\r?\n?)*)/g,
    code: /(`{3,}|~{3,})\n? *(\S+)? *([\s\S]+?)\1/gm,
  },
  code (text, regex) {
    console.log(text);
    return text.replace(regex, (_, backticks, lang, code) => {

      code = code.replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

      return `<pre><code class="language-${lang}">${code.replace(/^\n*\s+/g, '')}</code></pre>`
    })
  },
  list (text, temp = '') {
    temp = text.match(/^[+-]/m) ? 'ul' : 'ol'
    // task list - [ ]
    text = text.replace(/(\[\s?x?\])\s+(.*)\n/g, (m, g) => m
    .replace(g, `<input type="checkbox" ${g.includes('x') ? 'checked' : ''} disbaled/>`));

    return text ?
      `<${temp}>${text.replace(/(?:[+-]|\d+\.) +(.*)\n?(([ \t].*\n?)*)/g, (match, a, b) =>
        `<li>${(`${a}\n${outdent(b || '')
          .replace(utilBlock.regex.list, utilBlock.list)}`)}</li>`)}</${temp}>`
      : '';
  },
  table (text) {
    console.log(text);
    return text
  }
}

export default utilBlock