<template>
    <div class="vm-markdown" :style="{width: width, height:height}">
        <VmMarkdownMenu :bgMenu="themeValue.bgMenu" :menuBorder="themeValue.menuBorder" :menuColor="themeValue.menuColor" :hoverColor="themeValue.hoverColor" @textChange="updateHtmlString">
        </VmMarkdownMenu>
        <div class="content">
            <div class="vm-markdown-edit" :style="{backgroundColor: themeValue.bgLeft}">
                <textarea class="vm-markdown-content" v-model="markdString"/>
            </div>
            <div 
                class="markdown-body"
                v-html="htmlString"
                :style="{backgroundColor: themeValue.bgRight}"
            />
        </div>
    </div>
</template>
<style lang="scss">
@import url('../assets/iconfont/iconfont.css');

// @import url('//at.alicdn.com/t/font_395110_atvjh67aqsuzyqfr.css');
.vm-markdown {
    background-color: white;
    border-radius: 4px;
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
<script>
import VmMarkdownMenu from './vm-markdown-menu.vue'
import marked from 'marked'
import theme from '../theme/theme.js'
import hljs from 'highlight.js'
export default {
    name: 'VmMarkdown',
    components: {
        VmMarkdownMenu,
    },
    props: {
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
        }
    },
    data: function() {
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
            let html = document.querySelector('.vm-markdown-html')
            this.$emit('gethtml', html.innerHTML)
        }
    },
    watch: {
        markdString(value) {
            this.$emit('getMarkdString', value)
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
        }
    },
    mounted() {
        this.markdString = this.defaultText
        this.layoutControl()
    }
}

</script>
