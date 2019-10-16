<template>
  <div class="orderItem">
    
    <div class="card">
      <img src="@/assets/panda2.png" alt="tupian">
      <div class="info">
        <div class="orderHead">
          <div class="title">
            <span class="name"> {{order.shopInfo.name}} </span>
            <span class="deliver">订单没有配送中</span>
          </div>
          <p class="time">{{order.time | timeFormat}}</p>
        </div>
        <div class="orderContent"> 
          <span class="ellipsis">{{ order.shopcar[0].name }}等{{order.shopcar.length}}件商品</span>
          <span class="price">  ￥{{order.totalPrice}} </span>
        </div>
      </div>
    </div>


    <div class="orderBottom">
      <button class="bb" @click="toShop">再来一单</button>
      <button class="ba" @click="notice">立即评价</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  props:['order'],
  data() {
    return {
      shopname:'三米周浦',
      time: new Date()
    }
  },
  methods:{
    notice(){
      Toast({
        message:'没写',
        duration:800
      })
    },
    toShop(){
      this.$router.push({
        path:'/shopPage/' + this.order.shopInfo.id 
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.orderItem
  padding 4vw 0 0 4vw
  white-space nowrap
  margin-bottom 3vw
  background-color #fff
  div.card
    display flex
    flex-direction row
    img
      width 10vw
      height 10vw
      border-radius 1vw
      margin-right 3vw
    .info
      display flex
      flex-direction column
      width 82vw
      .orderHead
        padding  0 3vw 3vw 0
        border-bottom 1px solid rgba(200,200,200,0.2)
        .title
          display flex
          flex-direction row
          align-items center
          justify-content space-between
          .name
            width 40vw
            font-size 5vw
        .deliver
          font-size 3.6vw
        .time
          font-size 3vw
          line-height 6vw
          color #888
      .orderContent
        display flex
        flex-direction row
        padding 4vw 4vw 4vw 0
        font-size 3.5vw
        justify-content space-between
        border-bottom 1px solid rgba(200,200,200,0.2)
        span 
          line-height 4vw
          max-width 50vw
        .price
          font-weight bold
  .orderBottom
    padding 3vw 
    display flex
    justify-content flex-end
    button
      margin-right 2vw
      font-size 3.5vw
      padding 1vw 2vw
      background-color #fff
    .ba
      color #f53
      border 1px solid #f53
    .bb
      color #29f
      border 1px solid #29f


</style>