<template>
  <div>
    <!-- 头部地址栏 -->
    <top-address></top-address>
    <!-- 伪造搜索框 -->
    <fake-search></fake-search>
    <!-- 滑动导航栏 -->
    <swipe></swipe>
    <!-- 精选套餐 -->
    <ad></ad>
    <!-- 标题 -->
    <div class= "subtitle">
    <span>—</span> 标题 <span>—</span>
    </div>
  </div>
</template>

<script>
import topAddress from '../../components/home/topAddress'
import fakeSearch from '../../components/home/fakeSearch'
import swipe from '../../components/home/swipe'
import ad from '../../components/home/adBoard'
export default {
  components: {
    fakeSearch,
    topAddress,
    swipe,
    ad
  }
}
</script> 

<style lang="stylus" scoped>
  .subtitle
    text-align center
    margin 2vw 0 0
    padding 3vw
    font-size 1.1rem
    span
      margin 1vw
      color #999
</style>
