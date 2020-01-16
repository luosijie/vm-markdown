let intro = 
`### Install
\`\`\`
npm install --save vm-markdown
\`\`\`
### Usage
\`\`\`
<template>
  <VmMarkdown
    :uploadImage="uploadImage"
    theme="default" //dark, green, gray, princess
    width="1000px" 
    height="600px" 
    @change="onChange"
  />
</template>
<script>
  import VmMarkdown from "vm-markdown"
  import "highlight.js/styles/github.css"
  import hljs from 'highlight.js'
  export default {
    name: "app",
    components: {
        VmMarkdown
    },
    methods: {
      onChange(data) {
        // data = {html, markdown}
        this.$nextTick(() => {
            const codes = document.querySelectorAll(".markdown-body pre code");
            codes.forEach(elem => {
                hljs.highlightBlock(elem);
            });
        });
      },
      // your method to upolad the file to server and
      async uploadImage(file) {
        const imgUrl = await this.uploadRequest(file);
        return imgUrl
      }
    }
  }
</script>
\`\`\`
`
export default intro