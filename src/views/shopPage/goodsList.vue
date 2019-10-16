<template>
<!-- 点餐栏 -->
  <div>
    <div class="catalog">
      <ul>
        <li v-for="category in goodsCategory" :key="category.name">
          {{ category.name }}
        </li>
      </ul> 
    </div>
    <div class="goodsList">
      <div v-if="!goodsCategory[0]"> 店铺暂未添加商品 </div>
      <div v-else class="category" v-for="category in  goodsCategory" :key="category.name">
        <dl>
          <dt> {{category.name}} </dt>
            <goods-list-item class="item" v-for="item in category.goods" :key="item.id"  :goodsinfo="item" :shopcar="shopcar"  @update="updateShopcar">
            </goods-list-item>
        </dl>
      </div>
    </div>
    <bottom-shopcar :price="price" :shopcar="shopcar" :shopInfo="shopInfo" @update="updateShopcar"></bottom-shopcar>
  </div>

</template>

<script>
import bottomShopcar from '@/components/shop/bottomShopCar.vue'
import goodsListItem from '@/components/shop/goodsListItem.vue'
export default {
  props:['shopInfo','goodsCategory'],
  data() {
    return {
      catalog:[],
      shopcar:[
        // {
        //   id: 100,
        //   name: '汉堡',
        //   unitPrice: 100,
        //   imgUrl:require('@/assets/panda3.png'),
        //   amount: 0,
        // }
      ], //将选中商品的部分信息,和数量存入
      price: 0,
    }
  },
  components:{
    bottomShopcar,
    goodsListItem,
  },
  created(){
    // 发送ajax请求 获取goodsCategory里的数据 （在服务器端处理成这样的格式）
    for (let category of this.goodsCategory) {
      this.catalog.push(category.name) 
    }
  },
  methods:{
    updateShopcar: function(itemInfo, isAdd){ //iteminfo内数据和shopcar内的json数据一致
      var isNewItem = true
      // 判断商品添加或移除
      if (isAdd)
        this.price = (( this.price*100 + itemInfo.unitPrice*100)/100).toFixed(2)
      else
        this.price = (( this.price*100 - itemInfo.unitPrice*100)/100).toFixed(2)
      // 如果商品已经在购物车里 则更新购物车 （数量增加）
      this.shopcar.forEach( item => {
        if (item.id !== itemInfo.id) 
          return
        item.amount = itemInfo.amount
        isNewItem = false
      })
      // 不然的话 将商品加入购物车shopcar数组
      if (isNewItem)
        this.shopcar.push(itemInfo)
      this.shopcar = this.shopcar.filter( (item)=>{
        return item.amount>0
      } )
    },

    init: function(){
      this.catalog = [],
      this.shopcar = [],
      this.price = 0,
      this.goodsCategory=[]
    }

  }
}
</script>

<style lang="stylus" scoped>
// 隐藏滚动条
::-webkit-scrollbar
  display none
div
  display flex
  div.catalog
    position sticky
    z-index -1
    top 7vw
    height 100vh
    overflow-y scroll
    scrollbar-width none
    background-color #eee
    min-width 20vw
    ul
      width 100%
      li
        padding 8vw 2vw
        background-color #eee
        white-space wrap
        text-overflow ellipsis
        overflow hidden
        font-size 4vw
        max-height 10vw
  .goodsList
    flex 2 
    flex-direction column
    padding-bottom 10vw
    .category
      flex-direction column
      dt
        color #444
        font-size 0.95rem
        font-size 3.7vw
        margin-left 2vw 
        font-weight bold
        height 9vw
        line-height 9vw
      .item
        //border 1px solid #666
</style>