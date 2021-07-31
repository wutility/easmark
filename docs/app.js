const txtArea = document.getElementById('txt');
const markdownEL = document.getElementById('markdown');

let isCode = false;
const bold = /\*\*(.*)\*\*/gim;
const italics = /\*(.*)\*/gim;
const codeblock = /```\s*([^]+?.*?[^]+?[^]+?)```/g;

txtArea.value = localStorage.getItem('md') || `# Heading 1

Lorem **Ipsum** ~~is~~ simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.

This is the *[Markdown Guide](https://www.markdownguide.org)*.

- [ ] Task 1
  - [ ] Task child 1
  - [x] Task child 2
- [x] Task 2

## Heading 2

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

#### Code

## Heading 3

- **First** item.
   - item child 1.
   - item child 2.
- ***Second*** item.
- *Third item*.
- ~~Fourth item~~.

> vulputate velit ultrices, feugiat magna quis, aliquet tellus
> Fusce lacinia sapien sit amet erat mollis, eu tincidunt nulla mattis

&[Google](https://google.com)

I love supporting the **[EFF](https://eff.org)**.
This is the *[Markdown Guide](https://www.markdownguide.org)*.

See the section on [code](#code).`;

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
