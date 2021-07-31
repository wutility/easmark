/*! Easmark - v1.0.0 | Copyright 2020 - Haikel Fazzani */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.easmark = factory());
}(this, (function () { 'use strict';

  const outdent = (text) => {
    return text.replace(new RegExp('^' + (text.match(/^\s+/) || '')[0], 'gm'), '');
  };

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
      temp = text.match(/^[+-]/m) ? 'ul' : 'ol';
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
        return `<h${hash.length} id="${value.replace(/\s+/g, '-')}">${value}</h${hash.length}>`
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
    const strike = /(~{2,})((.|\n)+?)\1/g;
    const marked = /`([^`].*?)`/g;

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

  return easmark;

})));
//# sourceMappingURL=index.umd.js.map
