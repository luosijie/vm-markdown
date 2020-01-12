<template>
	<div class="vm-editor-menu" :style="{backgroundColor:bgMenu, color:menuColor, border:menuBorder}">
		<div class="command">
			<MenuButton icon="iconfont vm-heading" v-if="_tools.heading">
				<dropdown>
					<ul class="vm-editor-ul" :style="{color: hoverColor}">
						<li @click="insertText('# Title\n')">
							<h1>H1</h1>
						</li>
						<li @click="insertText('## Title\n')">
							<h2>H2</h2>
						</li>
						<li @click="insertText('### Title\n')">
							<h3>H3</h3>
						</li>
						<li @click="insertText('#### Title\n')">
							<h4>H4</h4>
						</li>
						<li @click="insertText('##### Title\n')">
							<h5>H5</h5>
						</li>
					</ul>
				</dropdown>
			</MenuButton>
			<MenuButton icon="iconfont vm-bold" @click.native="insertText(' **Bold** ')" v-if="_tools.bold"/>
			<MenuButton icon="iconfont vm-italic" @click.native="insertText(' *Italic* ')" v-if="_tools.italic"/>
			<MenuButton icon="iconfont vm-strikethrough" @click.native="insertText(' ~~Strikethrough~~ ')" v-if="_tools.strike"/>
			<MenuButton icon="iconfont vm-ol" @click.native="insertText('1. Ordered List\n')" v-if="_tools.ol"/>
			<MenuButton icon="iconfont vm-ul" @click.native="insertText('- Unordered List\n')" v-if="_tools.ul"/>
			<MenuButton icon="iconfont vm-quote" @click.native="insertText(' > Blockquote\n\n')" v-if="_tools.quote"/>
			<MenuButton icon="iconfont vm-code" @click.native="insertText('```\nCode\n```\n')" v-if="_tools.code"/>
			<MenuButton icon="iconfont vm-table" v-if="_tools.table">
				<ToolTable :hoverColor="hoverColor" @textChange="uploadTable"/>
			</MenuButton>
			<MenuButton icon="iconfont vm-image" keep-slot v-if="_tools.image">
				<input type="file" accept="image/jpeg,image/jpg,image/png" @change="fileChange" class="load-img">
				<!-- <VmMarkdownUpload @file-loaded="fileLoaded"/> -->
			</MenuButton>
			<MenuButton icon="iconfont vm-link" @click.native="insertText('[JesseLuo](https://github.com/luosijie)')" v-if="_tools.link"/>
			<MenuButton icon="iconfont vm-line" @click.native="insertText('***\n')" v-if="_tools.line"/>
		</div>
		<div class="vm-markdown-layout">
			<MenuButton icon="iconfont vm-layout-default" layout="default" v-if="_tools.layoutDefault"/>
			<MenuButton icon="iconfont vm-layout-right" layout="right" v-if="_tools.layoutRight"/>
			<!-- <Button icon="iconfont vm-layout-left" layout="left" v-if="_tools.layoutLeft"/> -->
			<MenuButton icon="iconfont vm-layout-zoom" layout="zoom" v-if="_tools.layoutZoom"/>
		</div>
	</div>
</template>

<script>
import MenuButton from './menu-button.vue'
import dropdown from './dropdown.vue'
import ToolTable from './tool-table.vue'
// import VmMarkdownUpload from './vm-markdown-upload.vue'
import insertText from '../assets/js/insertText.js'
export default {
	name: 'VmMarkdownMenu',
	components: {
		MenuButton,
		dropdown,
		ToolTable
		// VmMarkdownUpload
	},
	props: {
		bgMenu: {
			type: String,
			default: '#fafbfc'
		},
		menuBorder: {
			type: String,
			default: '1px solid #eeeff1'
		},
		menuColor: {
			type: String,
			default: '#858585'
		},
		hoverColor: {
			type: String,
			default: '#232323'
		},
		tools: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	computed: {
		_tools() {
			const tools = {
				'heading': true,
				'bold': true,
				'italic': true,
				'strike': true,
				'ol': true,
				'ul': true,
				'quote': true,
				'code': true,
				'table': true,
				'image': true,
				'link': true,
				'line': true,
				'layoutZoom': true,
				'layoutLeft': true,
				'layoutRight': true,
				'layoutDefault': true
			};
			return Object.assign(tools, this.tools);
		},
		filterColor: function() {
			if (this.bgMenu === '#fafbfc') {
				return '#232323'
			} else {
				return this.bgMenu
			}
		}
	},
	methods: {
		insertText(string) {
			let content = document.querySelector('.vm-markdown-content')
			insertText(content, string)
			this.$emit('textChange', content.value)
		},
		uploadTable(content) {
			this.$emit('textChange', content)
		},
		fileChange(e) {
			const files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
			this.$emit('file-loaded', files);
			e.target.value = "";
		    console.log("图片上传文件", e.target.value);
		}
	},
	mounted() {
		let menu = document.querySelector('.vm-editor-menu')
		menu.addEventListener('mouseover', evt => {
			if (evt.target.tagName == 'I') {
				evt.target.style.color = this.hoverColor
			}
		})
		menu.addEventListener('mouseout', function(evt) {
			if (evt.target.tagName == 'I') {
				evt.target.style.color = ''
			}
		})
	}
}

</script>

<style lang="scss">
.vm-editor-menu {
	display: flex;
	height: 40px;
	box-sizing: border-box;
	justify-content: space-between;
	align-items: center;
	padding: 0 15px;
	position: relative;

	.command,
	.vm-markdown-layout {
		display: flex;
	}

	.line {
		display: inline-block;
		width: 1px;
		height: 40px;
		margin: 0 10px;
		background-color: #eeeff1;
	}
}
.load-img {
	cursor: pointer;
	position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
}
ul.vm-editor-ul {
	padding: 0;
	margin: 0;

	li {
		margin: 0;
		padding: 5px 30px;
		display: flex;
		justify-content: center;

		&:hover {
			background: #f8f8f8;
		}

		h1 {
			text-align: center;
		}
	}
}

</style>
