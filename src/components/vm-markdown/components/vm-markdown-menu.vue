<template>
    <div class="vm-editor-menu" :style="{backgroundColor:bgMenu, color:menuColor, border:menuBorder}">
        <div class="command">
            <vm-markdown-button icon="iconfont icon-heading">
                <vm-markdown-dropdown>
                    <ul class="vm-editor-ul" :style="{color: filterColor}">
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
                </vm-markdown-dropdown>
            </vm-markdown-button>
            <vm-markdown-button icon="iconfont icon-bold" @click.native="insertText(' **Bold** ')"/>
            <vm-markdown-button icon="iconfont icon-italic" @click.native="insertText(' *Italic* ')"/>
            <vm-markdown-button icon="iconfont icon-strikethrough" @click.native="insertText(' ~~Strikethrough~~ ')">
            </vm-markdown-button>
            <vm-markdown-button icon="iconfont icon-ol" @click.native="insertText('1. Ordered List\n')"/>
            <vm-markdown-button icon="iconfont icon-ul" @click.native="insertText('- Unordered List\n')"/>
            <vm-markdown-button icon="iconfont icon-quote" @click.native="insertText(' > Blockquote\n\n')"/>
            <vm-markdown-button icon="iconfont icon-code" @click.native="insertText('```\nCode\n```\n')"/>
            <vm-markdown-button icon="iconfont icon-table">
                <vm-markdown-table :hoverColor="bgMenu" @textChange="uploadTable"/>
            </vm-markdown-button>
            <vm-markdown-button icon="iconfont icon-image" keepSlot>
                <input type="file" accept="image/jpeg,image/jpg,image/png" @change="insertImage" class="load-img">
            </vm-markdown-button>
            <vm-markdown-button icon="iconfont icon-link" @click.native="insertText('[JesseLuo](https://github.com/luosijie)')"/>
            <vm-markdown-button icon="iconfont icon-line" @click.native="insertText('***\n')"/>
        </div>
        <div class="vm-markdown-layout">
            <vm-markdown-button icon="iconfont icon-layout-default" layout="default"/>
            <vm-markdown-button icon="iconfont icon-layout-right" layout="right"/>
            <vm-markdown-button icon="iconfont icon-layout-left" layout="left"/>
            <vm-markdown-button icon="iconfont icon-layout-zoom" layout="zoom"/>
        </div>
    </div>
</template>

<script>
import VmMarkdownButton from './vm-markdown-button.vue'
import VmMarkdownDropdown from './vm-markdown-dropdown.vue'
import VmMarkdownTable from './vm-markdown-table.vue'
import insertText from '../utils/insertText.js'
export default {
    name: 'VmMarkdownMenu',
    components: {
        VmMarkdownButton,
        VmMarkdownDropdown,
        VmMarkdownTable
    },
    props: {
        uploadImage: {
            type: Function,
            default() {
                return () => {}
            }
        },
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
        }
    },
    computed: {
        filterColor: function() {
            if (this.bgMenu === '#fafbfc') {
                return '#232323'
            } else {
                return this.bgMenu
            }
        }
    },
    methods: {
        async insertImage(e) {
            const files = e.target.files || e.dataTransfer.files;
            const file = files[0];
            if (!files.length)
                return;
            let imgUrl = await this.uploadImage(file);
            imgUrl = `![image](${imgUrl})` 
            this.insertText(imgUrl)
        },
        insertText(string) {
            let content = document.querySelector('.vm-markdown-content')
            insertText(content, string)
            this.$emit('textChange', content.value)
        },
        uploadTable(content) {
            this.$emit('textChange', content)
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
    border-radius: 4px 4px 0px 0px;
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
.load-img {
    display: inline-block;
    z-index: 999;
	cursor: pointer;
	position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
}
</style>
