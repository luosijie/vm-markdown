<p align="center">
  <img src="https://github.com/luosijie/Front-end-Blog/blob/master/img/logo_vmmarkdown_name.png?raw=true">
</p>
<p align="center">
    <strong>Markdown for Vue,</strong> <a href="https://luosijie.github.io/vm-markdown/">Live Demo</a>
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

```js
import VmMarkdown from 'vm-markdown'
export default {
  ...
  components: {
  	VmMarkdown
  },
  methods: {
  	showHtml (html) {
      // get html string here
    }
  }
  ...
}
```

```vue
<VmMarkdown theme="default" //dark, green, gray, princess 
            width="1000px" 
            height="600px" 
            v-on:gethtml="showHtml"
            :defaultText="intro">
</VmMarkdown>
```


### License

[MIT](https://github.com/luosijie/vm-editor/blob/master/LICENSE.md)
