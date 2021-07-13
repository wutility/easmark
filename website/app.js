const txtArea = document.getElementById('txt');
const markdownEL = document.getElementById('markdown');

let isCode = false;
const bold = /\*\*(.*)\*\*/gim;
const italics = /\*(.*)\*/gim;
const codeblock = /```\s*([^]+?.*?[^]+?[^]+?)```/g;

txtArea.value = localStorage.getItem('md') || `[
  { h1: "JSON To Markdown" },
  {
    img: [
      { title: "Some image", source: "https://example.com/some-image.png" }
      , { title: "Another image", source: "https://example.com/some-image1.png" }
      , { title: "Yet another image", source: "https://example.com/some-image2.png" }
    ]
  },
  { h2: "Features" },
  { blockquote: "A JSON to Markdown converter." },
  {
    ul: [
      "Easy to use"
      , "You can programatically generate Markdown content"
      , "..."
    ]
  },
  { h2: "How to contribute" },
  {
    ol: [
      "Fork the project"
      , "Create your branch"
      , "Raise a pull request"
    ]
  }
]`;

function onConvert (e) {
  let str = localStorage.getItem('md') || e.target.value.trim();
  markdown.innerHTML = easmark(str);
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
