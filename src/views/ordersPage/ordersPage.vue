<template>
<div  class="orderpage" >
  <div v-if="loading" class="loading"> <div class="loading-container"><mt-spinner></mt-spinner></div> </div>
  <div v-else-if="error" style="padding: 16vw">
    <span>订单列表获取失败，请检查网络是否有问题</span> 
    <div><button @click="request">重试</button></div>
  </div>
  <div v-else-if="!orders[0]" style="width:100vw; text-align:center;">没有订单</div>
  <div v-else class="ordersList">
    <order-list-item v-for="order in orders" :key="order.id" :order="order"> </order-list-item>
  </div>
</div>

</template>

<script>
import { Toast } from 'mint-ui'
import orderListItem from '@/components/order/orderListItem' 
export default {
  data() {
    return {
      orders: [],
      // [
      //   { orderId:0,
      //     userInfo:{doesNotMatter:''}
      //     shopcar:[{ name:'食品啦啦啦', somethingElse:'' },{name:'goodsname', somethingElse:''} ],
      //     shopInfo:{ name:'商店名字', imgUrl:'', somethingElse:'' },
      //     deliverPrice: 0,
      //     discount: -10,
      //     totalPrice:666.66,
      //     time: new Date()
      //   },
      // ]
      loading:false,
      error:false,
    }
  },
  components:{
    orderListItem
  },
  created(){
    // 从服务器获取订单信息
    this.request()
  },
  methods:{
    request(){
      // 从服务器获取订单信息
      this.loading = true
      this.axios.get('/api/getOrders', {
        params:{
          userId: this.$store.state.userInfo.id
        }
      })
      .then( 
        res =>{ 
          if (res.data instanceof Array){
            this.orders = res.data
          }
          else if(res.data instanceof String)
            Toast(res.data)
          else{
            Toast('服务器错误')
            this.error = true
          }        
          this.loading = false
        }
      )
      .catch(
        err=>{
          console.log(err)
          Toast('网络错误')
          this.error = true
          this.loading = false
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
div.orderpage
  background-color #eee
  min-height 100vh
  .ordersList
    padding-bottom 14vw
.loading 
  width 100vw
.loading-container
  margin auto
</style>
