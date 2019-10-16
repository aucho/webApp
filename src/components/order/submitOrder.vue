<template>
  <footer class="bottomShopcar">
    <div class="totalPrice">
      <span class="price" > ￥{{ orderInfo.totalPrice }} </span>
    </div>
    
    <div class="settle settleActive" @click="submitOrder">
      <div>提交订单</div>
    </div>
  </footer>

  

</template>

<script>
import {Toast} from 'mint-ui'
export default {
  props:['orderInfo'],

  methods:{
    submitOrder: function(){
      this.orderInfo.time = new Date()
      // 提交订单到后台
      this.axios.post('/api/order',this.orderInfo).then((res)=>{
        if (res.data==='ok'){
          this.$router.push({
            name:'ordersPage'
          })
        }
        else{
          Toast(res.data)
        }
      }).catch(()=>{
        alert('网络错误')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bottomShopcar
    position fixed
    bottom 0
    width 100vw
    height 13vw
    background-color rgba(48,48,48,0.8)
    display flex
    flex-direction row
    align-items left 
    .totalPrice
      flex 6
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
      .price
        color #ffffff
        margin-left 4vw
        font-size 1.4rem
        font-size 5.5vw
    .settle
      flex 4
      text-align center
      cursor pointer
      background-color #5b4
      div
        color #fff
        font-size 5vw
        font-weight bold
        line-height 13vw
</style>