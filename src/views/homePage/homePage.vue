<template>
  <div>
    <!-- 头部地址栏 -->
    <top-address></top-address>
    <!-- 伪造搜索框 -->
    <fake-search></fake-search>
    <!-- 滑动导航栏 -->
    <swipe></swipe>
    <!-- 广告 -->
    <ad></ad>
    <!-- 标题 -->
    <div class= "subtitle">
    <span>—</span> 标题 <span>—</span>
    </div>
    <!-- 商家 -->
    <div v-if="authorized">
      <div class="shoplist" >
        <shop-list-item :shopinfo = "shopitem"  v-for="shopitem in shops" :key="shopitem.id"></shop-list-item>
      </div>
    </div>

    <!-- 需要登陆 -->
    <requireLogin v-else></requireLogin>
  </div>
</template>

<script>
import topAddress from '../../components/home/topAddress'
import fakeSearch from '../../components/home/fakeSearch'
import swipe from '../../components/home/swipe'
import ad from '../../components/home/adBoard'
import requireLogin from '../../components/requireLogin'
import shopListItem from '../../components/home/shopListItem'
export default {
  data() {
    return {
      authorized: true,
      shops:[
        {
          imgUrl:'',
          id:0,
          name:'商家名称',
          score: 5.0,
          sellvolume:100,
          price: 0,
          tag:['描述aaaaaaaaaaaaa','描述b','aaa','bbb','ccccccccccccccccc']
        },
        {
          imgUrl:'',
          id:1,
          name:'商家baaaaaaaaaaaaaaaaaaaaaaaa',
          score: 5.0,
          sellvolume:10086,
          price: 0,
          tag:['很难吃']
        },
      ]
      
    }
  },
  components: {
    fakeSearch,
    topAddress,
    swipe,
    ad,
    requireLogin,
    shopListItem,

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
  .shoplist
    margin-bottom 20vw
</style>
