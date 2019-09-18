<template>
  <div>
    <img src="../assets/panda.png" alt="">
    <h4>没有查找到商家</h4>
    <router-link to="/login">
      <button>登录查看</button>
    </router-link>
    
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
div
  text-align center
  padding 5vw 0 20vw 0
  img 
    width 60vw
    height 50vw
    opacity 0.7
  h4
    color #777
    margin 2vw 0 7vw 0
  button 
    height 10vw
    width 30vw
    border none
    border-radius 4%
    background-color #4D7
    color #fff
    font-size 1rem

</style>