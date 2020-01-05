import index from './components/index.vue'
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.component('VmMarkdown', index)
}
export default index
