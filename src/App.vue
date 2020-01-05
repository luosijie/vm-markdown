<template>
    <div id="app">
        <div class="logo">
            <img src="../static/logo.png" alt="" width="250" height="250">
        </div>
        <h2 class="logo-name">
            <span style="color: #41b883">V</span>M Markdown
        </h2>
        <p class="desc">Markdown for Vue</p>

        <div class="themes" @click="selectTheme">
            <span data-theme="default" style="width:28px;height:28px"/>
            <span data-theme="dark"/>
            <span data-theme="green"/>
            <span data-theme="gray"/>
            <span data-theme="princess"/>
        </div>
        <h4>
            theme = "
            <span class="theme-type">default</span>"
        </h4>
        <VmMarkdown
            :theme="theme"
            :uploadImage="uploadImage"
            :defaultText="intro"
            width="1000px"
            height="800px"
            class="markdown"
            @html-change="htmlChange"
            @markdwon-change="showMarkdwon"
        />
        <div class="author">
            <a href="https://github.com/luosijie/vm-markdown">
                <i class="iconfont icon-github"></i>
            </a>
            <span>
                Designed by
                <a href="https://github.com/luosijie">JesseLuo</a>
            </span>
        </div>
    </div>
</template>

<script>
// import VmMarkdown from './../dist/vm_markdown.min.js'
import VmMarkdown from "./components/vm-markdown/index.js"
import "highlight.js/styles/github.css"
import intro from "./text/intro.js"
import hljs from 'highlight.js'
export default {
    name: "app",
    components: {
        VmMarkdown
    },
    data: function() {
        return {
            theme: "default",
            intro: intro
        };
    },
    methods: {
        async uploadImage(file) {
            const imgUrl = await this.uploadRequest(file);
            return imgUrl
        },
        uploadRequest(file) {
            const result = "https://github.com/luosijie/Front-end-Blog/blob/master/img/logo_vmmarkdown_name.png?raw=true"
            return new Promise((resolve, reject) => {
                window.setTimeout(() => {
                    resolve(result)
                }, 1000)
            })
        },
        htmlChange(html) {
            console.log("html-content", html)
            this.$nextTick(() => {
                const codes = document.querySelectorAll(".markdown-body pre code");
                codes.forEach(elem => {
                    hljs.highlightBlock(elem);
                });
            });
            // get html string here
        },
        showMarkdwon(markdown) {
            // console.log("markdwon-content", markdown)
        },
        selectTheme(evt) {
            if (evt.target.tagName.toLowerCase() === "span") {
                let theme = evt.target.dataset.theme;
                let themeType = document.querySelector(".theme-type");
                let spans = evt.target.parentNode.querySelectorAll("span");
                for (let i; i < spans.length; i++) {
                    spans[i].style = "";
                }
                this.theme = theme;
                themeType.innerText = theme;
                evt.target.style.width = "28px";
                evt.target.style.height = "28px";
            }
        }
    }
};
</script>

<style lang="scss">
// @import url('./assets/iconfont/iconfont.css');
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.markdown {
    margin-top: 16px;
}
.author {
    margin: 30px 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    i {
        color: #232323;
        font-size: 28px;
    }
}
.logo {
    svg {
        transform: scale(0.7);
    }
}
h2.logo-name {
    color: #35495e;
}
.themes {
    display: flex;
    align-items: center;
    span {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-color: red;
        border-radius: 50%;
        margin: 0 6px;
        border: 2px solid #e0e0e0;
        cursor: pointer;
        color: white;
        &:nth-child(1) {
            background-color: #35495e;
        }
        &:nth-child(2) {
            background-color: #232323;
        }
        &:nth-child(3) {
            background-color: #41b883;
        }
        &:nth-child(4) {
            background-color: #fafbfc;
        }
        &:nth-child(5) {
            background-color: #27292c;
        }
        &:nth-child(5) {
            background-color: #f05959;
        }
    }
}
h2 {
    font-weight: bold;
    margin: 0px 0;
}
p.desc {
    color: #858585;
    margin: 20px 0 30px 0;
}
a {
    color: #42b983;
    text-decoration: none;
}
</style>
