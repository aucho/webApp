<template>
  <div class="search">
    <router-link to="/search">
      <svg class="icon" aria-hidden="true">
        <use href="#icon-search"/>
      </svg>
      <span>search here</span>
    </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
$background-color
.search/*header下 伪造搜索框外围*/
  background-color #08f
  margin -1px
  padding 0.6rem 1rem
  position sticky
  top 0
  a /*router-link*/
    display flex
    background-color white
    width 90%
    height 6vw
    border-radius 0.25rem
    padding 2vw 5% 
    span 
      margin 1vw
</style>