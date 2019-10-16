<template>
  <dd class="marginbottom">
    <img :src="url" alt="商品图片" title="商品图片">
    <div class="goodsinfo">
      <h3 v-text="name" class="ellipsis"></h3>
      <p>{{description}}</p>
      <p class="score ellipsis">
        <span> 好评率 {{favorableRate}} </span>
        <span class="count">月售 {{sellVolume}} </span>
      </p>
      <div class="ellipsis price">
        <span>￥{{price}}</span>
        <span class="buttonContainer" >
          <button class="minus" @click="minus" v-show="amount">--</button>
          <span v-show="amount"> {{amount}} </span>
          <button class="add" @click="add">+</button>
        </span>
      </div>
    </div>
  </dd>
</template>

<script>
export default {
  props:['goodsinfo','shopcar'],
  data() {
    return {
      selectedAmount: 0,
      name: this.goodsinfo.name,
      favorableRate: this.goodsinfo.favorableRate,
      sellVolume:this.goodsinfo.sellVolume,
      price: this.goodsinfo.unitPrice,
      description: this.goodsinfo.description,
      url: this.goodsinfo.imgUrl ? require(`@/assets/${this.goodsinfo.imgUrl}`): '',

      amount: 0
    }
  },
  mounted(){
    // console.log(this.goodsinfo)
  },
  watch: {
    // 绑定商品组件和父组件的商品数量 使购物车的商品和数量能和该组件双向绑定
    shopcar: function(self){
      var isInShopcar = false
      self.forEach(item=>{
        if (item.id !== this.goodsinfo.id) return
        // 如果该组件在购物车内 则吧isInShopcar置为真
        isInShopcar = true
        if (item.amount === this.amount) return
        this.amount = item.amount
      })
      // 对不在购物车中的商品组件处理
      if (isInShopcar) return
      this.amount = 0
    }
  },
  methods:{
    add: function(){
      this.amount++
      let itemInfo = {
        id: this.goodsinfo.id,
        name: this.name,
        unitPrice: this.price,
        imgUrl: this.url,
        amount: this.amount
      }
      let isAdd = true
      // 向父组件传值
      this.$emit('update', itemInfo, isAdd)
    },
    minus: function(){
      if (!this.amount) return
      this.amount--
      let itemInfo = {
        id: this.goodsinfo.id,
        name: this.name,
        unitPrice: this.price,
        imgUrl: this.url,
        amount: this.amount
      }
      let isAdd = false
      this.$emit('update', itemInfo, isAdd)
    }
  }
}
</script>

<style lang="stylus" scoped>
.marginbottom
  display flex
  margin 0 0 5vw 0
  img 
    width 22vw
    height 22vw
    margin 3vw
    border-radius 5%
  .goodsinfo
    padding 3vw 0
    border-bottom 0.02rem solid rgba(100,100,100,0.5)
    flex-direction column
    display flex
    flex 7
    h3
      line-height 6vw
      font-size 4.5vw
      width 45vw
      margin 0 0 0.5rem 0
    p
      line-height 6vw
      width 50vw 
      color #666
      display flex
      font-size 3.2vw
      flex-direction row
      align-items center
    .score
      .count
        color #666
        margin-left 3vw
    .price
      display flex
      justify-content space-between
      align-items baseline
      margin-left -0.5vw
      font-size 4.5vw
      color #f47
      line-height 8vw
      .buttonContainer
        margin-right 4vw
        height 8.6vw
        span 
          padding 0 1vw 0 1vw
          font-size 4vw
          color #333
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

.ellipsis
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
</style>