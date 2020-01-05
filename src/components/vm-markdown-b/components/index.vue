<template>
    <div class="vm-markdown" :style="{width: width, height:height}">
        <vm-markdown-menu
            :bgMenu="themeValue.bgMenu"
            :menuBorder="themeValue.menuBorder"
            :menuColor="themeValue.menuColor"
            :hoverColor="themeValue.hoverColor"
            :uploadImage="uploadImage"
            @textChange="updateHtmlString">
        </vm-markdown-menu>
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

<script>
import VmMarkdownMenu from './vm-markdown-menu.vue'
import marked from 'marked'
import theme from '../config/theme.js'
export default {
    name: 'VmMarkdown',
    components: {
        VmMarkdownMenu,
    },
    props: {
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
    watch: {
        markdString(value) {
            this.$emit('markdwon-change', value)
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
            this.$emit('html-change', value)
        }
    },
    mounted() {
        this.markdString = this.defaultText
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
        }
    }
}

</script>

<style lang="scss">
@import url('../assets/iconfont/iconfont.css');
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
