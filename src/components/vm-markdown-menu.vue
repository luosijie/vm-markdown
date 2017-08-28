<template>
  <div class="vm-editor-menu"
       :style="{backgroundColor:bgMenu, color:menuColor, border:menuBorder}" 
       v-hover:color="hoverColor">
    <div class="command">
      <VmMarkdownButton icon="iconfont icon-heading">
        <VmMarkdownDropdown>
          <ul class="vm-editor-ul" :style="{color: filterColor}">
            <li @click="insertText('# Title\n')">
              <h1>H1</h1>
            </li>
            <li @click="insertText('## Title\n')">
              <h2>H2</h2>
            </li>
            <li @click="insertText('### Title\n')">
              <h3>H3</h3>
            </li>
            <li @click="insertText('#### Title\n')">
              <h4>H4</h4>
            </li>
            <li @click="insertText('##### Title\n')">
              <h5>H5</h5>
            </li>
          </ul>
        </VmMarkdownDropdown>
      </VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-bold" @click.native="insertText(' **Bold** ')"></VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-italic" @click.native="insertText(' *Italic* ')"></VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-strikethrough" 
                        @click.native="insertText(' ~~Strikethrough~~ ')">                
      </VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-ol" @click.native="insertText('1. Ordered List\n')"></VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-ul" @click.native="insertText('- Unordered List\n')"></VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-quote"  @click.native="insertText(' > Blockquote\n\n')"></VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-code" @click.native="insertText('```\nCode\n```\n')"></VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-table" @click.native="insertText()">
        <VmMarkdownTable :hoverColor="bgMenu">
        </VmMarkdownTable>
      </VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-image" 
                        @click.native="insertText('![Logo](https://github.com/luosijie/Front-end-Blog/blob/master/img/logo_vmmarkdown_name.png?raw=true)')">
      </VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-link" @click.native="insertText('[JesseLuo](https://github.com/luosijie)')"></VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-line" @click.native="insertText('***\n')"></VmMarkdownButton>
    </div>
    <div class="layout">
      <VmMarkdownButton icon="iconfont icon-layout-default"></VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-layout-right"></VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-layout-left"></VmMarkdownButton>
      <VmMarkdownButton icon="iconfont icon-layout-zoom"></VmMarkdownButton>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="scss">
  .vm-editor-menu{
    display: flex;
    height: 40px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    border-radius: 4px 4px 0px 0px;
    position: relative;
    
    .command, .layout{
      display: flex;
    }
    .line{
      display: inline-block;
      width: 1px;
      height: 40px;
      margin: 0 10px;
      background-color: #eeeff1;
    }
  }
  ul.vm-editor-ul{
    padding: 0;
    margin: 0;
    li{
      margin: 0;
      padding: 5px 30px;
      display: flex;
      justify-content: center;
      &:hover{
        background: #f8f8f8;
      }
      h1{
        text-align: center;
      }
    }  
  }
</style>
<script>
import VmMarkdownButton from './vm-markdown-button.vue'
import VmMarkdownDropdown from './vm-markdown-dropdown.vue'
import VmMarkdownTable from './vm-markdown-table.vue'
export default {
  name: 'VmMarkdownMenu',
  components: {
    VmMarkdownButton,
    VmMarkdownDropdown,
    VmMarkdownTable
  },
  props: {
    bgMenu: {
      type: String,
      default:'#fafbfc'
    },
    menuBorder: {
      type: String,
      default:'1px solid #eeeff1'
    },
    menuColor: {
      type: String,
      default: '#858585'
    },
    hoverColor: {
      type: String,
      default:'#232323'
    }
  },
  computed: {
    filterColor: function(){
      if(this.bgMenu === '#fafbfc'){
        return '#232323'
      }else{
        return this.bgMenu
      }
    }
  },
  methods: {
    insertText(string){
      document.execCommand('insertText', false, string)
    }
  },
  directives:{
    hover: {
      update: function (el,binding) {
        el.addEventListener('mouseover', function (evt) {
          if (evt.target.tagName == 'I') {
            evt.target.style.color = binding.value
          } 
        })
        el.addEventListener('mouseout', function (evt) {
          if (evt.target.tagName == 'I') {
            evt.target.style.color = ''
          } 
        })
      }
    }
  }
}
</script>
