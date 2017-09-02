import VmMarkdown from './vm-markdown.vue'

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.component('VmMarkdown', VmMarkdown)
}

export default VmMarkdown
