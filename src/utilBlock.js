import { outdent } from './helpers'

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
}

export default utilBlock