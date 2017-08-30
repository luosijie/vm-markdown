let intro = 
`### Install
\`\`\`
npm install --save vm-markdown
\`\`\`
### Usage
\`\`\`
import VmMarkdown from 'vm-markdown'
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
            :defaultText="intro">
</VmMarkdown>
\`\`\`
`
export default intro