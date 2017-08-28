<template>
  <VmMarkdownDropdown>
    <ul class="vm-markdown-table" v-insertTable:color="filterColor">
    </ul>
  </VmMarkdownDropdown>
</template>
<style lang="scss">
  ul.vm-markdown-table{
    margin: 3px;
    width: 160px;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    list-style: none;
    li{
      float: left;
      width: 20px;
      height: 20px;
      background: black;
      margin: 3px;
      border-radius: 2px;
     background-color: #e0e0e0;
     &:hover{
      background-color: #232323;
     }
    }
  }
</style>
<script>
import VmMarkdownDropdown from './vm-markdown-dropdown.vue'
export default {
  name: 'VmMarkdownTable',
  components: {
    VmMarkdownDropdown
  },
  props: {
    hoverColor: {
      type: String,
      default: '#232323'
    }
  },
  computed: {
    filterColor: function () {
      if (this.hoverColor === '#fafbfc') {
        return '#232323'
      }else{
        return this.hoverColor
      }
    }
  },
  directives:{
    insertTable: {
      inserted: function(el,binding){
        let length = 24
        let x = 0, y = 0
        for(let i=0; i<length; i++){
          let setx = i%6 + 1
          let sety = parseInt(i/6) + 1
          let li = document.createElement('li')
          li.setAttribute('data-x', setx)
          li.setAttribute('data-y', sety)
          el.appendChild(li)
        }

        el.addEventListener('mouseover', function(evt){
          if (evt.target.tagName === 'LI') {
            x= evt.target.getAttribute('data-x')
            y= evt.target.getAttribute('data-y')
            let lis = el.querySelectorAll('li')
            for(let i=0; i<lis.length; i++){
              lis[i].style.backgroundColor = '#e0e0e0'
              if(lis[i].dataset.x <= x && lis[i].dataset.y <= y){
                lis[i].style.backgroundColor = binding.value
              }
            }
          }
        })

        el.addEventListener('click', function(evt){
          if(x && y){
            let th = '| Head '
            let td = '| Data '
            let tl = '| ---  '
            let str = ''
            let ths = '', tls = '', tds = ''
            for(let i=0; i<x; i++){
              ths = ths.concat(th)
              tls = tls.concat(tl)
            }
            for(let j=0; j<y; j++){
              for(let k=0; k<x; k++){
                tds = tds.concat(td)
              }
              tds += ' |\n'
            }
            ths += ' |\n'
            tls += ' |\n'
            str += ths + tls + tds
            document.execCommand('insertText', false, str)
          }         
          
        })
      }
    }
  }
}
</script>
