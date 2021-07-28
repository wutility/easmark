function cleanUp (text) {
  const boldItalic = /([*_]{1,3})((.|\n)+?)\1/g
  const strike = /(~{1,3})((.|\n)+?)\1/g

  text = text.replace(boldItalic, (_, stars, value) => {
    return stars.length % 2 ? `<strong>${value}</strong>` : `<em>${value}</em>`
  });

  text = text.replace(strike, (_, stars, value) => {
    return `<s>${value}</s>`
  });

  return text
}

function easmark (text) {
  let blocks = text.split(/\n\s*\n/);
  let result = []

  for (let block of blocks) {
    Object.keys(utilBlocks.regex).forEach(reg => {
      if (block.match(utilBlocks.regex[reg])) {
        block = utilBlocks[reg](block, utilBlocks.regex[reg])
      }
    });

    Object.keys(utilInline.regex).forEach(reg => {
      if (block.match(utilInline.regex[reg])) {
        block = utilInline[reg](block, utilInline.regex[reg])
      }
    });

    result.push(block)
  }

  return result.map(line => cleanUp(line)).join('\n')
}