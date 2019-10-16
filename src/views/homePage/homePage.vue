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
    <div v-if="this.$store.state.authorized">
      <div v-if="listLoading" class="loading">
        <mt-spinner type="snake" class="spinner"></mt-spinner>
    </div>

      <div v-if="error"> 店铺加载失败</div>

      <div v-if="shops"  class="shoplist" >
        <shop-list-item  
           v-for="shopitem in shops" 
           :shopInfo="shopitem"  
           :key="shopitem.id">
        </shop-list-item>
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
      shops: null,
      // [
      //   {
      //     imgUrl:'',
      //     id:0,
      //     name:'商家名称',
      //     score: 5.0,
      //     sellvolume:100,
      //     price: 0,
      //     tag:'描述a,描述b,描述ccccccccccccccccc'
      //     notice:'本店公告啦啦啦'
      //   },
      // ],
      error:null,
      listLoading:null,
      // loading:null,
      // list:[],
    }
  },
  created(){
    this.fetchData()
  },
  watch: {
    '$route':'fetchData'
  },
  methods:{
    fetchData(){
      this.error = this.post = null
      this.listLoading = true
      this.axios.get('/api/home').then((res)=>{
        this.shops = res.data
        this.listLoading = false
      }).catch(err=>{
        // console.log(err)
        this.error = err.toString()
      })
    },
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
  .loading
    padding 5vh 45%
    .spinner
      left 50%
    // transform translateX(-50%)
</style>
