<template>
  <div class="background">
    <div class="header">
      <svg class="icon" aria-hidden="true" @click="back">
          <use xlink:href="#icon-left"></use>
      </svg>
      <h3 class="title">订单确认</h3>      
    </div>
    <div class="content">
      <section class="address" >
        <p style="font-size:0.95rem">订单配送至</p>
        <h2 class="ellipsis" v-if="orderInfo.userInfo.address"> {{orderInfo.userInfo.address }} </h2>
        <h2 class="ellipsis" v-else>请先选择收货地址</h2>
        <p> <span>{{orderInfo.userInfo.usrName}}</span> <span class="ellipsis">{{orderInfo.userInfo.mailAddress}}</span> </p>
      </section>

      <section class="container">
        <h3> {{orderInfo.shopInfo.name}} </h3>
        <ul>
          <li class="goodsItem" v-for="item in orderInfo.shopcar" :key="item.id" > 
            <img class="img" :src="item.imgUrl" alt="商品图片"> 
            <span class="goodsName ellipsis"> {{item.name}} </span> 
            <span class="amount ellipsis"> × {{item.amount}} </span>
            <span class="price ellipsis"> ￥{{(item.unitPrice * item.amount).toFixed(2)}} </span>
          </li>
          <li class="goodsItem">
            <div class="img"> <span>商家</span></div>
            <span class="goodsName">配送费</span>
            <span class="amount ellipsis"> </span>
            <span class="price"> ￥{{orderInfo.deliverPrice}} </span>
          </li>
          <li class="goodsItem">
            <div class="img"> <span>优惠</span></div>
            <span class="goodsName">红包?</span>
            <span class="amount ellipsis"> </span>
            <span class="price">￥{{orderInfo.discount}} </span>
          </li>
          <li class="totalPrice">
            <span>小计</span>
            <span class="price">￥{{orderInfo.totalPrice}} </span>
          </li>
        </ul>
      </section>

      <section class="container">
        <ul class="options">
          <li> <span>餐具数量</span> </li>
          <li> <span>备注</span> </li>
        </ul>
      </section>
    </div>
    <footer-submit :orderInfo="orderInfo">  </footer-submit>
  </div>
</template>

<script>
import footerSubmit from '@/components/order/submitOrder.vue'
export default {
  data() {
    return {
      orderInfo:
      {
        userInfo:this.$store.state.userInfo,
        shopcar:[
          // {
          //   id:0,
          //   name:'namemememmemeemmememememmememem',
          //   amount:2,
          //   unitPrice:123.45,
          //   imgUrl:require('@/assets/panda2.png')
          // },
        ],
        shopInfo:null,
        deliverPrice:0,
        discount:-10,
        totalPrice:0,
      }
    }
  },
  methods:{
    // 页面刷新时 返回商品页面
    back: function(){
      this.$router.go(-1)
    }
  },
  components:{
    footerSubmit
  },
  created(){
    // 接收param数据
    if (!this.$route.params.shopcar) {
      this.$router.go(-1)
      return
    }
    this.orderInfo.shopcar = this.$route.params.shopcar
    this.orderInfo.deliverPrice = this.$route.params.deliverPrice
    this.orderInfo.shopInfo = this.$route.params.shopInfo
    this.orderInfo.shopcar.forEach( item =>{
      this.orderInfo.totalPrice += item.unitPrice*100*item.amount/100
    })
    this.orderInfo.totalPrice += (this.orderInfo.deliverPrice*100 + this.orderInfo.discount*100)/100
  }
}
</script>

<style lang="stylus" scoped>
$blue = #08f
.background
  background -webkit-linear-gradient(#f55, #fff); /* Safari 5.1-6.0 */
  background -o-linear-gradient(#eee, #fff); /* Opera 11.1-12.0 */ 
  background -moz-linear-gradient(#eee, #fff); /* Firefox 3.6-15 */
  background linear-gradient( 180deg, $blue 10%, #f5f5f5 90%);
  min-height 100vh
  padding-bottom 14vw
  .header
    height 14vw
    width 100%
    position fixed
    background-color $blue
    .icon
      margin 2vw
      color #fff
    .title
      position absolute
      left 50%
      top 0
      color #fff
      transform translateX(-50%)
  .content
    padding 14vw 2vw 0
    .address
      padding 2vw 2vw 5vw 2vw
      color #fff
      h2
        margin 3vw 0
      span
        padding-right 2vw
    .container
      background-color #fff
      display flex
      padding 0 5vw
      margin-bottom 2vw
      box-shadow 0 0 1px 0 #fff
      border-radius 1vw
      flex-direction column
      color #000
      .goodsItem
        display flex
        flex-direction row
        align-items center
        border-bottom 0.5px solid rgba(0,0,0,0.1)
        .img 
          height 12vw
          width 12vw
          margin 2vw 2vw 2vw 0
          border-radius 2vw
          text-align center
          span 
            line-height 12vw
            background-color #66aaff
            color #ffffff
            padding 0.5vw
            font-size 3.5vw
        .goodsName
          flex 5
        .amount
          flex 2
          font-size 3.5vw
        .price
          flex 3
          text-align right
          font-size 4vw
          color #f40
      .totalPrice
        color #000
        // font-size 1.5rem
        line-height 13vw
        float right
        color #666
        .price
          font-size 5.5vw
          color #222   
      .options
        line-height 12vw
        li
          border-bottom 0.5px solid rgba(0,0,0,0.1)
.ellipsis
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
</style>