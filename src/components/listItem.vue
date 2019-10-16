<template >
  <div>
    <section class="list">
      <div>
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="svg"></use>
        </svg>
        <span>{{title}}</span>
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-right"></use>
      </svg>
    </section>
  </div>
</template>

<script>
export default {
  props:['svg','title']
}
</script>

<style lang="stylus" scoped>
section.list
  font-size 4vw
  padding 4vw 8vw
  display flex  
  align-items center
  flex-direction row
  justify-content space-between
  border-bottom 1px solid #eee
  div
    display flex 
    align-items center
    .icon
      width 6vw
      color #49f
      margin 1vw 2vw 1vw 0vw
  .icon
    width 6vw
    color #aaa
</style>