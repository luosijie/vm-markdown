<template>
  <div class="vm-markdown-button"  @mouseleave="hideSlot" @click="showSlot">
    <i :class="icon" :data-layout="layout"></i>
    <!-- <i :class="icon" @click="showSlot"></i> -->
    <slot v-if="slot || keepSlot"></slot>
  </div>
</template>
<style lang="scss">
  .vm-markdown-button{
    // width: 24px;
    // height: 24px;
    position: relative;
    border-radius: 4px;
    outline: 0;
    cursor: pointer;
    background-color: transparent;
    border: none;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    color: inherit;
    &:first-child{
      margin-left: 0;
    }
    i{
      display: inline-block;
      line-height: 24px;
      width: 24px;
      font-size: 16px;
      // color: #858585;
      color: inherit;
      text-align: center;
    }
  }
</style>
<script>
export default {
  name: 'VmMarkdownButton',
  props: {
    keepSlot: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'iconfont icon-heading'
    },
    layout: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      slot: false
    }
  },
  methods: {
    showSlot () {
      this.slot === false ? this.slot = true : this.slot = false
    },
    hideSlot () {
      this.slot = false
    },
  }
}
</script>
