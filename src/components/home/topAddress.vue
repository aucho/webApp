<template>
  <div class="header">
    <div  class="used-for-address-selection-later">
      <div class="address-area">
        <svg class="icon" aria-hidden="true">
          <use href="#icon-left-circle"/>
        </svg>
        <span class="ellipsis">地址栏</span>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.header
  background-color #08f
  padding 0.7rem 1rem 0rem
  color white
  div/**/
    height 2.2rem
    display flex
    align-items center
    div/*图标+span+图标*/
      width 60%
      svg
        width 1.2rem
      span/*地址信息*/
        font-size 19px
        font-weight 600
        margin 0 0.2rem
</style>
