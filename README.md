<p align="center">
  <img src="https://github.com/luosijie/Front-end-Blog/blob/master/img/logo_vmmarkdown_name.png?raw=true">
</p>

<p align="center">
    <a href="https://luosijie.github.io/vm-markdown/">example</a>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/version-0.2.8-blue.svg?style=flat">
  <img src="https://img.shields.io/badge/dependency-vue-green.svg?style=flat">
  <img src="https://img.shields.io/badge/dependency-marked-yellow.svg?style=flat">
</p>

### Install

```bash
npm install --save vm-markdown
```
### Usage

```vue
<template>
  <vm-markdown
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
      // your method to upolad the file to server
      async uploadImage(file) {
        const imgUrl = await this.uploadRequest(file);
        return imgUrl
      }
    }
  }
</script>
```

### License

[MIT](https://github.com/luosijie/vm-editor/blob/master/LICENSE.md)
