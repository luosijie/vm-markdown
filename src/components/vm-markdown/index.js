import VmMarkdown from './components/index.vue'

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.component('VmMarkdown', VmMarkdown)
}
export default VmMarkdown
