
import Vue from 'vue'
 import hljs from 'highlight.js'
 import 'highlight.js/styles/an-old-hope.css'
 let Highlight = function (Vue, options) {
   Vue.directive('highlight', function (el) {
     let blocks = el.querySelectorAll('pre code'); // querySelectorAll可以根据自己的富文本生成的代码做调整 我这里默认刚好
     blocks.forEach((block)=>{
        hljs.highlightBlock(block)
        block.innerHTML = `<ol><li>${block.innerHTML.replace(
          /\n/g,
          `</li><li class="line">`
        )}</li></ol>`;
        
      })
   })
 }
 export default Highlight