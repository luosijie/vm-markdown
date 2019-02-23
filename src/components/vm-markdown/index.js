import VmMarkdown from './components/index.vue'
import hljs from 'highlight.js'

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.component('VmMarkdown', VmMarkdown)
}
export { hljs }
export default VmMarkdown
