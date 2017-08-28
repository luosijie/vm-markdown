let intro = 
`### Install
\`\`\`
npm install --save vm-markdwon
\`\`\`
### Usage
\`\`\`
import VmMarkdown from 'vm-markdwon'
export default {
  ...
  components: {
  	VmMarkdown
  },
  methods: {
  	showHtml (data) {
      console.log(data)
    }
  }
  ...
}
\`\`\`
\`\`\`
<VmMarkdown :theme="theme" 
            width="1000px" 
            height="600px" 
            v-on:getHtml="showHtml"
            class="markdown"
            :defaultText="intro">
</VmMarkdown>
\`\`\`
`
export default intro