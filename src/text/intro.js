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
    },
    showRaw (data) {
      console.log(data)
    }
  }
  ...
}
\`\`\`
\`\`\`
<VmMarkdown theme="default" //dark, green, gray, princess
            width="1000px" 
            height="600px" 
            v-on:gethtml="showHtml"
            v-on:getraw="showRaw"
            :defaultText="intro">
</VmMarkdown>
\`\`\`
`
export default intro