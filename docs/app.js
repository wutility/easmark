const txtArea = document.getElementById('txt');
const markdownEL = document.getElementById('markdown');

let isCode = false;
const bold = /\*\*(.*)\*\*/gim;
const italics = /\*(.*)\*/gim;
const codeblock = /```\s*([^]+?.*?[^]+?[^]+?)```/g;

txtArea.value = localStorage.getItem('md') || `# What is Lorem Ipsum?

Lorem **Ipsum** ~~is~~ simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.

### How To Use The Demo

- **1111111** yyy.
   - rrrr.
   - vvvv.
- Proin vulputate velit ultrices, feugiat magna quis, aliquet tellus.
- Fusce lacinia sapien sit amet erat mollis, eu tincidunt nulla mattis.

> sdsd
> dfdf

- [ ] 111111
  - [ ] aaaaa
  - [x] bbbbb
- [x] 22222`;

markdownEL.innerHTML = window.easmark(txtArea.value)

function onConvert (e) {
  let str = localStorage.getItem('md') || e.target.value.trim();
  markdown.innerHTML = window.easmark(str);  
  hljs.highlightAll();
}

const onKeyup = e => {
  localStorage.setItem('md', e.target.value)
}

const options = {
  parent: '.editor', // or document.querySelector('#parent-id')
  direction: 'horizontal',
  gutterSize: 5,
  minSize: 0,
  sizes: [50, 50]
};

SplitViews(options);

function select_scroll_1 (e) { markdownEL.scrollTop = txtArea.scrollTop; }
function select_scroll_2 (e) { txtArea.scrollTop = markdownEL.scrollTop; }

txtArea.addEventListener('change', onConvert, false)
txtArea.addEventListener('blur', onConvert, false)
txtArea.addEventListener('keyup', onKeyup, false);

txtArea.addEventListener('scroll', select_scroll_1, false);
markdownEL.addEventListener('scroll', select_scroll_2, false);

hljs.highlightAll();
