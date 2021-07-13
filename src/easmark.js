function easmark (text) {
  const regex = {
    meta: /^---.*---\n/g,
    task: /\-\s\[\s?x?\]\s+(.*)\n/g,
    heading: /(#*)\s(.*)/g,
    img: /\!?\[(.*)\]\((.*)\)/g, // image or link
    quote: /\>\s+(.*)/g,
    mark: /`([^`].*?)`/g,
    bold: /__(?=\S)([\s\S]*?\S)__(?!_)|\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/g,
    del: /(\~\~)(.*?)\1/g,
    code: /^\s*(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n *)+\n?/gm
  };

  function handleBlocks (text) {
    if(!text) return;

    let textToBlocks = text.split(/([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g);

    let ntext = textToBlocks
      .map(block => {        
        // heading
        if (block.startsWith('#')) {
          block = block.replace(regex.heading, (m, hset, g) => {
            return `<h${hset.length} id="${g.replace(/\s+/g, '-')}">${g}</h${hset.length}>`
          });
        }

        // tasks: - [ ] task 1   - [x] task 2
        if (block.startsWith('- [') && block.match(regex.task)) {
          let tasks = `<ul>`;
          block.split('\n').forEach(task => {
            let value = task.replace(/\-\s\[(\s?x?)\]\s+(.*)/g, (m, hset, content) =>
              `<input type="checkbox" disabled ${hset === 'x' ? 'checked' : ''}> ${content}`);
            tasks += `<li>${value}</li>`
          });
          tasks += `</ul>`;
          block = tasks;
        }

        // list
        if (block.startsWith('- ') || block.startsWith('1. ')) {
          let isUl = block.startsWith('- ') ? 'ul' : 'ol';
          let list = `<${isUl}>`;
          block.split(/\n/g).forEach(item => {
            list += `<li>${item.slice(2).trim()}</li>`
          });
          list += `</${isUl}>`;
          block = block.replace(block, list);
        }

        // quote
        if (block.startsWith('>')) {
          block = block.replace(regex.quote, (m, content) => {
            return `<blockquote>${content}</blockquote>`
          });
        }

        // table
        if (block.startsWith('|')) {
          console.log(block.match(/^(\|[^\n]+\|\r?\n)((?:\|:?[-]+:?)+\|)(\n(?:\|[^\n]+\|\r?\n?)*)/g));
        }

        if(block.match(/^(\n|\s)/g)) {
          block = `<p>${block}</p>`
        }

        return block
      })
      .join('');

    return ntext + '\n';
  }

  text = handleBlocks(text)

  text = text.replace(regex.img, (match, alt, url) => {
    return match.startsWith('![')
      ? `<img src="${url}" alt="${alt}" />`
      : `<a href="${url}">${alt}</a>`
  });

  // bold and italic: **word** *word*
  text = text.replace(regex.bold, (match, content) => {
    console.log(match, content);
    return `<b>${content}</b>`
  });

  // delete: ~~word~~
  text = text.replace(regex.del, (match, stars, content) => {
    return `<del>${content.trim()}</del>`
  });

  // mark: `word`
  text = text.replace(regex.mark, (match, content) => {
    return `<mark>${content.trim()}</mark>`
  });

  // code block: ```code```
  text = text.replace(regex.code, (match, backticks, lang, content) => {
    if (lang.trim() !== 'html') content = content.replace(/(<([^>]+)>)/g)
    return `<pre class="language-${lang}"><code>${content.trim()}</code></pre>`
  });

  return text
}