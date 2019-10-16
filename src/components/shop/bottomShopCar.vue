<template>
  <footer >
    <!-- 遮罩层 -->
    <div class="mask" v-show="isShopcarItemShow"></div>
    
    <!-- 购物详情 -->
    <transition name="grow">
      <ul class="shopcarContent" v-if="isShopcarItemShow">
        <li class="shopcarContentTop"> 订单详情 </li>
        <li v-for="item in shopcar" :key="item.id">
          <span class="ellipsis name"> {{item.name}} </span>
          <span class="price">￥{{(item.unitPrice*item.amount).toFixed(2)}}</span>
          <span class="buttonContainer" >
            <button class="minus" @click="remove(item)" v-show="item.amount">--</button>
            <span v-show="item.amount"> {{item.amount}} </span>
            <button class="add" @click="add(item)">+</button>
          </span>
        </li>
        <li v-show="!isFoodSelected">未选购商品</li>
      </ul>    
    </transition>

    <!-- 底层购物车部分 -->
    <div class="bottomShopcar">
      <div :class="{bigCircleActive:isFoodSelected}" class="bigCircle" @click="showShopcarItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shop_car"></use>
        </svg> 
      </div>
        
      <div class="totalPrice" :class="{totalPriceActive:isFoodSelected}" @click="showShopcarItem">
        <span class="price" v-if="isFoodSelected" > ￥{{ price }} </span>
        <span class="price" v-else >没有选购商品 </span>
        <span class="extralFee" v-show="deliverPrice">另需配送费 {{deliverPrice}} </span>
      </div>
      
      <div class="settle" :class="{settleActive:isFoodSelected}">
        <!-- 结算时传递shopcar信息 -->
        <div  @click="toOrder" v-if="isFoodSelected">结算</div>
        <span v-else>清选择商品 </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props:['price', 'shopcar','shopInfo'],
  data() {
    return {
      isFoodSelected: false,
      deliverPrice: 1,
      isShopcarItemShow: false,
    }
  },
  created(){  
    this.isFoodSelected = Boolean(this.shopcar.length)
  },
  watch:{
    // 控制isFoodSelected
    // 购物车为空时 不显示详情 以及遮罩
    shopcar: function(self){
      this.isFoodSelected = Boolean(self.length)
      if (!self.length)
        this.isShopcarItemShow  = false
    }
  },
  methods:{
    showShopcarItem: function(){
      this.isShopcarItemShow = !this.isShopcarItemShow
    },
    add:function(item){
      item.amount ++
      this.$emit('update',item, true) //true stands for add
    },
    remove:function(item){
      item.amount --
      this.$emit('update',item, false) //false stands for remove
    },
    toOrder:function(){
      this.$router.push({
        name:'order',
        params:{
          shopcar:this.shopcar,
          deliverPrice:this.deliverPrice,
          shopInfo:this.shopInfo
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
footer 
  position fixed
  bottom 0
  .mask
    width 100vw
    height 100vh
    z-index 3
    background-color rgba(48,48,48,0.3)
  .shopcarContent
    background-color #fdfdfd
    max-height 50vw
    overflow auto
    .shopcarContentTop
      top 40vw
      height 10vw 
      background-color #ddd
      color #444
    li
      line-height 13vw
      border-bottom 1px solid rgba(0,0,0,0.1)
      display flex
      justify-content space-between
      align-items baseline
      padding 1vw 2vw
      .name 
        width 50vw
      .price
        flex 20vw
      .buttonContainer
        flex 30vw
        right 0
        text-align center
        button
          padding  0
          font-size 4.7vw
          width 5.8vw 
          height 5.8vw 
          border-radius 50%
          border 0.08rem solid #08f
        .minus
          background-color #fff
          color #08f
  .bottomShopcar
    width 100vw
    height 13vw
    background-color rgba(48,48,48,0.9)
    display flex
    flex-direction row
    align-items left 
    .bigCircle
      z-index 5
      margin -3vw 5vw 5vw 5vw
      width 11vw
      height 10vw
      padding 1.5vw 0.5vw 0 0
      border-radius 50%
      background-color #303030
      border 1.5vw solid #3d3d3d
      text-align center
      .icon
        width 8vw
        height 8vw 
        color #999
    .bigCircleActive
      background-color #29f
      .icon
        color #fff
    .totalPrice
      margin 0 20vw 0 0
      width 23vw
      display flex
      color #aaa
      flex-direction column
      justify-content center
      span 
        padding 1vw 0
        font-size 1rem
        font-size 3.7vw
      .extralFee
        font-size 0.9rem
        font-size 3.5vw
    .totalPriceActive
      .price
        color #ffffff
        font-size 1.2rem
        font-size 4.6vw
        font-weight bold
    .settle
      flex 1
      text-align center
      background-color #999
      cursor pointer
      span
        color #fff
        font-size 4vw
        font-weight bold
        line-height 13vw
    .settleActive
      background-color #5b4
      div
        color #fff
        font-size 5vw
        font-weight bold
        line-height 13vw

</style>