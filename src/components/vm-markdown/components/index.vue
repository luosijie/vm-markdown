<template>
    <div class="vm-markdown" :style="{width: width, height:height}">
        <VmMarkdownMenu 
            :bgMenu="themeValue.bgMenu" 
            :menuBorder="themeValue.menuBorder" 
            :menuColor="themeValue.menuColor" 
            :hoverColor="themeValue.hoverColor"
            :tools="tools" 
            @textChange="updateHtmlString"
            @file-loaded="fileLoaded">
        </VmMarkdownMenu>
        <div class="content">
            <div 
                class="vm-markdown-edit" 
                :style="{backgroundColor: themeValue.bgLeft}">
                <textarea class="vm-markdown-content" v-model="markdString"/>
            </div>
            <div 
                class="markdown-body vm-markdown-body" 
                v-html="htmlString" 
                :style="{backgroundColor: themeValue.bgRight}">
            </div>
        </div>
    </div>
</template>

<script>
import VmMarkdownMenu from './menu.vue'
import marked from 'marked'
import theme from '../theme/theme.js'
import hljs from "highlight.js";
import insertText from '../assets/js/insertText.js'
import "highlight.js/styles/github.css";
export default {
    name: 'VmMarkdown',
    components: {
        VmMarkdownMenu,
    },
    props: {
        value: '',
        uploadImage: {
            type: Function,
            default() {
                return () => {};
            }
        },
        theme: {
            type: String,
            default: 'default'
        },
        width: {
            type: String,
            default: '900px'
        },
        height: {
            type: String,
            default: '500px'
        },
        defaultText: {
            type: String,
            default: ''
        },
        tools: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            markdString: '',
            htmlString: ''
        }
    },
    computed: {
        themeValue: function() {
            if (theme.hasOwnProperty(this.theme)) {
                return theme[this.theme]
            } else {
                return theme.dark
            }
        }
    },
    methods: {
        async fileLoaded(files) {
            const res = await this.uploadImage(files);
            let content = document.querySelector('.vm-markdown-content');
            const string = `![img](${res})`;
            insertText(content, string);
        },
        updateHtmlString(data) {
            this.markdString = data
        },
        layoutControl() {
            let VmMarkdownLayout = document.querySelector('.vm-markdown-layout')
            let VmMarkdown = document.querySelector('.vm-markdown')
            let VmMarkdownEdit = document.querySelector('.vm-markdown-edit')

            let is = VmMarkdownLayout.querySelectorAll('i')
            for (let i = 0; i < is.length; i++) {
                is[i].addEventListener('click', evt => {
                    switch (is[i].dataset.layout) {
                        case 'default':
                            VmMarkdownEdit.style.width = '50%'
                            break;
                        case 'right':
                            VmMarkdownEdit.style.width = '100%'
                            break;
                        case 'left':
                            VmMarkdownEdit.style.width = '0'
                            break;
                        case 'zoom':
                            if (VmMarkdown.style.position === 'fixed') {
                                VmMarkdown.style.cssText = 'width:' + this.width + ';' +
                                    'height:' + this.height + ';'
                            } else {
                                VmMarkdown.style.position = 'fixed'
                                VmMarkdown.style.zIndex = 999
                                VmMarkdown.style.left = '0'
                                VmMarkdown.style.top = '0'
                                VmMarkdown.style.margin = '0'
                                VmMarkdown.style.width = '100%'
                                VmMarkdown.style.height = '100%'
                            }
                            break
                    }
                })
            }
        },
        getHtml() {
            let html = document.querySelector('.vm-markdown-body')
            this.$emit('gethtml', html.innerHTML)
        }
    },
    watch: {
        markdString(value) {
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            })
            this.$emit('input', value)
            this.htmlString = marked(value)
            this.$nextTick(() => {
                const codes = document.querySelectorAll(".markdown-body pre code");
                codes.forEach(elem => {
                    hljs.highlightBlock(elem);
                });
            });
            setTimeout(() => {
                this.getHtml()
            }, 0)
        },
        value(value) {
            this.markdString = value
        }
    },
    mounted() {
        this.markdString = this.defaultText
        this.layoutControl()
    }
}

</script>

<style lang="scss">
@import url('../assets/iconfont/iconfont.css');

.vm-markdown {
    background-color: white;
    min-width: 700px;
    min-height: 300px;
    overflow: hidden;
    .content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        overflow: hidden;
        height: calc(100% - 40px);
        width: 100%;
        text-align: left;
        font-size: 16px;
        border: 1px solid #eeeff1;
        border-top: none;

        .vm-markdown-edit,
        .render {
            height: 100%;
        }

        .vm-markdown-edit {
            width: 50%;
            box-sizing: border-box;
            outline: none;
            border-right: 1px solid #eeeff1;
            flex-shrink: 0;

            .vm-markdown-content {
                width: 100%;
                height: 100%;
                padding: 15px;
                overflow: auto;
                box-sizing: border-box;
                resize: none;
                outline: none;
                border: none;
                background-color: transparent;
                font-size: 14px;
                color: #232323;
                line-height: 24px;
            }
        }
        .markdown-body {
            padding: 15px;
            overflow: auto;
            flex-grow: 1;
            word-wrap: break-word;
        }
    }
}

</style>
