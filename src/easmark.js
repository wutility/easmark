import utilBlock from './utilBlock'
import utilInline from './utilInline'
import cleanUp from './cleanUp'

function applyRegex (block, util) {
  Object.keys(util.regex).forEach(reg => {
    if (block.match(util.regex[reg])) block = util[reg](block, util.regex[reg])
  });
  return block
}

export default function easmark (text) {
  let blocks = text.split(/\n\s*\n/)
  let result = []

  for (let block of blocks) {
    block = applyRegex(block, utilInline)
    block = applyRegex(block, utilBlock)
    
    result.push(block)
  }

  return result.map(line => cleanUp(line)).join('\n')
}