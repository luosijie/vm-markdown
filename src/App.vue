<template>
  <div id="app">
    <div class="logo">
      <svg 
       xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink"
       width="200px" height="174px">
        <path fill-rule="evenodd"  fill="rgb(53, 73, 94)"
         d="M163.335,110.425 L130.001,143.887 L130.001,143.887 L100.000,174.003 L69.999,143.887 L69.999,143.887 L34.998,108.752 L64.999,78.636 L100.000,113.771 L133.334,80.309 L163.335,110.425 Z"/>
        <path fill-rule="evenodd"  fill="rgb(65, 184, 131)"
         d="M170.002,103.733 L140.001,73.617 L170.002,43.500 L200.003,73.617 L170.002,103.733 ZM70.332,73.282 L135.001,8.365 L165.002,38.481 L100.333,103.398 L70.332,73.282 ZM-0.003,73.617 L73.329,0.003 L103.330,30.119 L29.998,103.733 L-0.003,73.617 Z"/>
      </svg>
    </div>
    
    <!-- <img src="./assets/logo_vmeditor.png" height="250" width="250"> -->
    <h2 class="logo-name"><span style="color: #41b883">V</span>M Markdown</h2>
    <p class="desc">Markdown for Vue</p>
    <div class="themes" @click="selectTheme">
      <span data-theme="default" style="width:28px;height:28px"></span>
      <span data-theme="dark"></span>
      <span data-theme="green"></span>
      <span data-theme="gray"></span>
      <span data-theme="princess"></span>
    </div>
    <h4>theme = "<span class="theme-type">default</span>"</h4>
    <VmMarkdown :theme="theme" 
                width="1000px" 
                height="800px" 
                v-on:gethtml="showHtml"
                class="markdown"
                :defaultText="intro">
    </VmMarkdown>
    <div class="author">
      <a href="https://github.com/luosijie/vm-markdown">
        <i class="iconfont icon-github"></i>
      </a>
      <span>Designed by <a href="https://github.com/luosijie">JesseLuo</a></span>
    </div>
  </div>
</template>

<script>
import VmMarkdown from './components/vm-markdown.vue'
import 'highlight.js/styles/github.cs'
// import VmMarkdown from '../dist/vm_markdown.min.js'
import intro from './text/intro.js'
export default {
  name: 'app',
  components: {
    VmMarkdown
  },
  data: function () {
    return {
      theme: 'default',
      intro: intro
    }
  },
  methods: {
    showHtml (html) {
      // get html string here
    },
    selectTheme (evt) {
      if(evt.target.tagName.toLowerCase() === 'span'){
        let theme = evt.target.dataset.theme
        let themeType = document.querySelector('.theme-type')
        let spans = evt.target.parentNode.querySelectorAll('span')
        for(let i; i < spans.length; i++){
          spans[i].style = ''
        }
        this.theme = theme
        themeType.innerText = theme
        evt.target.style.width = '28px'
        evt.target.style.height = '28px'
      } 
    }
  }
}
</script>

<style lang="scss">
// @import url('./assets/iconfont/iconfont.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.markdown{
  margin-top: 16px;
}
.author{
  margin: 30px 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  i{
    color: #232323;
    font-size: 28px;
  }
}
.logo{
  svg{
    transform: scale(0.7);
  }
}
h2.logo-name{
  color: #35495e;
}
.themes{
  display: flex;
  align-items: center;
  span{
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: red;
    border-radius: 50%;
    margin: 0 6px;
    border: 2px solid #e0e0e0;
    cursor: pointer;
    color: white;
    &:nth-child(1){
      background-color: #35495e;
    }
    &:nth-child(2){
      background-color: #232323;
    }
    &:nth-child(3){
      background-color: #41b883;
    }
    &:nth-child(4){
      background-color: #fafbfc;
    }
    &:nth-child(5){
      background-color: #27292c;
    }
    &:nth-child(5){
      background-color: #f05959;
    }
  }
}
h2 {
  font-weight: bold;
  margin: 0px 0;
}
p.desc{
  color: #858585;
  margin: 20px 0 30px 0;
}
a {
  color: #42b983;
  text-decoration: none;
}
</style>
