<template>
  <div class="vm-markdown" :style="{width: width, height:height}">
    <VmMarkdownMenu :bgMenu="themeValue.bgMenu" 
                    :menuBorder="themeValue.menuBorder"
                    :menuColor="themeValue.menuColor"
                    :hoverColor="themeValue.hoverColor"
                    @textChange="updateHtmlString"
                  >
    </VmMarkdownMenu>
    <div class="content">
      <div class="vm-markdown-edit" :style="{backgroundColor: themeValue.bgLeft}" contenteditable="true">
        <textarea v-focus class="vm-markdown-content" v-model="markdString"></textarea>
      </div>
      <div class="vm-markdown-html" v-html="htmlString" :style="{backgroundColor: themeValue.bgRight}">
      </div>
    </div>
    
  </div>
</template>
<style lang="scss">
  @import url('../assets/iconfont/iconfont.css');
  // @import url('//at.alicdn.com/t/font_395110_atvjh67aqsuzyqfr.css');
  .vm-markdown{
    background-color: white;
    border-radius: 4px;
    min-width: 700px;
    min-height: 300px;
    overflow: hidden;
    .content{
      display: flex;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      height: calc(100% - 40px);
      width: 100%;
      text-align: left;
      font-size: 16px;
      border: 1px solid #eeeff1;
      border-top: none;
      .vm-markdown-edit, .render{       
        height: 100%;    
      }
      .vm-markdown-edit{
        width: 50%;
        box-sizing: border-box;
        outline: none;
        border-right: 1px solid #eeeff1;
        flex-shrink: 0;
        .vm-markdown-content{
          width: 100%;
          height: 100%;
          padding: 15px;
          overflow: auto;
          box-sizing: border-box;
          resize: none;
          outline: none;
          border: none;
          background-color: transparent;
          font-size: 14px;
          color: #232323;
          line-height: 24px;
        }
      }
      .vm-markdown-html{
        padding: 15px;
        overflow: auto;
        flex-grow: 1;
        word-wrap:break-word;
        ul{
              margin: 10px 20px;
              list-style-type: square;
              padding: 0;
          }
        ol{
              margin: 10px 20px;
              list-style-type: decimal;
              padding: 0;
          }
        li{
              display: list-item;
              padding: 0;
          }
        hr{
              margin: 15px 0;
              border-top: 1px solid #eeeff1;
          }
        pre{
              display: block;
              margin: 10px 0;
              padding: 8px;
              border-radius: 4px;
              background-color: #f2f2f2;
              color: #656565;
              font-size: 14px;
            }
        blockquote{
                      display: block;
                      border-left: 4px solid #ddd;
                      margin: 15px 0;
                      padding: 0 15px;
                  }
        img{
               margin: 20px 0;
            }
        a{
            color: #41b883;
          }
        table{
                 border: 1px solid #eee;
                 border-collapse: collapse;
              }
        tr{
              border: 1px solid #eee;
          }
        th{
              padding: 8px 30px;
              border-right: 1px solid #eee;
              background-color: #f2f2f2;
          }
        td{
              padding: 8px 30px;
              border-right: 1px solid #eee;
          }
      }
    }
  }
</style>
<script>
import VmMarkdownMenu from './vm-markdown-menu.vue'
import marked from 'marked'
import theme from '../theme/theme.js'
export default {
  name: 'VmMarkdown',
  components: {
    VmMarkdownMenu,
  },
  props:{
    theme:{
      type: String,
      default: 'default'
    },
    width:{
      type: String,
      default: '900px'
    },
    height:{
      type: String,
      default: '500px'
    },
    defaultText:{
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      markdString: '',
      htmlString: ''
    }
  },
  computed: {
    themeValue: function () {
      if (theme.hasOwnProperty(this.theme)) {
        return theme[this.theme]
      }else{
        return theme.dark
      }
    }
  },
  methods: {
    updateHtmlString (data) {
      this.markdString = data
    },
    layoutControl () {
      let VmMarkdownLayout = document.querySelector('.vm-markdown-layout')
      let VmMarkdown = document.querySelector('.vm-markdown')
      let VmMarkdownEdit = document.querySelector('.vm-markdown-edit') 
      
      let buttons = VmMarkdownLayout.querySelectorAll('button')
      buttons.forEach(elem=>{
        elem.addEventListener('click', evt => {
          switch (elem.dataset.layout) {
            case 'default' :
              VmMarkdownEdit.style.width = '50%'
              break;
            case 'right' :
              VmMarkdownEdit.style.width = '100%'
              break;
            case 'left' :
              VmMarkdownEdit.style.width = '0'
              break;
            case 'zoom' :
              if (VmMarkdown.style.position === 'fixed') {
                VmMarkdown.style = 'width:' + this.width + ';' +
                                   'height:' + this.height + ';'
              }else{
                VmMarkdown.style.position = 'fixed'
                VmMarkdown.style.left = '0'
                VmMarkdown.style.top = '0'
                VmMarkdown.style.margin = '0'
                VmMarkdown.style.width = '100%'
                VmMarkdown.style.height = '100%'
              }
              break
          }
        })
      })
    },
    parseHtml () {
      let style = {
        ul: `
              margin: 10px 20px;
              list-style-type: square;
              padding: 0;
            `,
        ol: `
              margin: 10px 20px;
              list-style-type: decimal;
              padding: 0;
            `,
        li: `
              display: list-item;
              padding: 0;
            `,
        hr: `
              margin: 15px 0;
              border-top: 1px solid #eeeff1;
            `,
        pre: `
              display: block;
              margin: 10px 0;
              padding: 8px;
              border-radius: 4px;
              background-color: #f2f2f2;
              color: #656565;
              font-size: 14px;
             `,
        blockquote: `
                      display: block;
                      border-left: 4px solid #ddd;
                      margin: 15px 0;
                      padding: 0 15px;
                    `,
        img: `
               margin: 20px 0;
             `,
        a: `
            color: #41b883;
           `,
        table: `
                 border: 1px solid #eee;
                 border-collapse: collapse;
               `,
        tr: `
              border: 1px solid #eee;
            `,
        th: `
              padding: 8px 30px;
              border-right: 1px solid #eee;
              background-color: #f2f2f2;
            `,
        td: `
              padding: 8px 30px;
              border-right: 1px solid #eee;
            `
      }
      let html = document.getElementsByClassName('vm-markdown-html')[0]
      let tagNames = Object.keys(style)
      for (let i = 0; i < tagNames.length; i++) {
        let _tagNames = html.getElementsByTagName(tagNames[i])
        if (_tagNames.length > 0) {
          for (let j = 0; j < _tagNames.length; j++) {
            _tagNames[j].style = style[tagNames[i]]
          }
        }
      }
    },
    getHtml () {
      let html = document.querySelector('.vm-markdown-html')
      this.$emit('getHtml', html.innerHTML)
    }
  },
  watch: {
    markdString(value){
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      })
      this.htmlString = marked(value)

      setTimeout(()=>{
        this.parseHtml()
        this.getHtml()
      },0)
    }
  },
  mounted () {
    this.markdString = this.defaultText
    this.layoutControl()
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>
