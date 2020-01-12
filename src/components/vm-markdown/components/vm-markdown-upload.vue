<template>
    <vm-markdown-dropdown>
        <div class="upload">
            <span class="add">+</span>
            <span class="desc">请选择本地图片</span>
            <input type="file" accept="image/jpeg,image/jpg,image/png" @change="fileChange">
        </div>
    </vm-markdown-dropdown>
</template>
<script>
import VmMarkdownDropdown from './dropdown.vue'
export default {
    name: 'VmMarkdownUpload',
    components: {
        VmMarkdownDropdown
    },
    props: {
        hoverColor: {
            type: String,
            default: '#232323'
        }
    },
    methods: {
        fileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            console.log("图片加载完成...", this.$emit('change', files))
            this.$emit('change', files);
        }
    },
    computed: {
        filterColor: function() {
            if (this.hoverColor === '#fafbfc') {
                return '#232323'
            } else {
                return this.hoverColor
            }
        }
    }
}

</script>
<style lang="scss" scoped>
.upload {
    cursor: pointer;
    position: relative;
    padding: 10px;
    width: 200px;
    span {
        display: inline-block;
        vertical-align: middle;
    }
    .add {
        border: 1px solid #d2d2d2;
        width: 50px;
        height: 50px;
        text-align: center;
        border-radius: 4px;
        font-size: 30px;
        box-sizing: border-box;
    }
    .desc {
        margin-left: 10px;
    }
    input {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
    }
}

</style>
