<template>
<div>
  <div v-if="loading" class="loading">
    <mt-spinner type="snake"></mt-spinner>
  </div>
  <div v-if="error">
    {{error}}
  </div>
  <div v-if="shopInfo">
    <div class="topImageContainer">
      <div class="backButton">
        <router-link to="/home">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-left"></use>
        </svg> 
        </router-link>
      </div>
    </div>
    <div class="shopInfo">
      <div><img src="@/assets/panda3.png" alt="商店背景图片" class="logo"></div>
      <h2 class="ellipsis"> {{shopInfo.name}} </h2>
      <section class="score"> 
        <span>评价{{shopInfo.score}}&ensp;</span> 
        <span>月售{{shopInfo.sellvolume}}</span> 
      </section>
      <section class="notice ellipsis"> 公告:&ensp;{{shopInfo.notice}} </section>
    </div>
    <div class="shopSwitch">
      <div>
        <div :class="{borderB:isGoodslist}" @click="toGoods" >点餐</div>
      </div>
      <div>
        <div :class="{borderB:!isGoodslist}" @click="toComments">评价</div>
      </div>
    </div>
    <router-view :shopInfo="shopInfo" :goodsCategory="goodsCategory" v-if="isGoodslist"></router-view>
    <router-view v-else></router-view>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      shopInfo: null,
      // {
      //   id:12138,
      //   name:'商家的名字（啦啦啦分店xx街道）',
      //   score:'5.0',
      //   shopVolume:'1000',
      //   notice:'今日不营业今日不营业今日不营业今日不营业今日不营业今日不营业',
      //   imgUrl:'',
      //   bgImgUrl:''
      // }

      // 传给子组件的
      goodsCategory:null,
      loading: false,
      error: null,
      isGoodslist:null,
    }
  },
  created(){
    this.loading = true
    this.axios.get(`/api/shop`,{
      params:{
        id:this.$route.params.id
      }
    }).then((results)=>{
      this.loading = false
      if (typeof(results.data)==='string')
      {
        this.error = results.data        
        setTimeout(()=>{
          this.$router.push({
            path:'/'
          })
        },1000)
      }
      else
      {
        this.shopInfo = results.data[0][0]
        this.goodsCategory = results.data[1]
      }
    }).catch(err=>{
      this.error = err
    })

    if (this.$route.path === `/shopPage/${this.$route.params.id}/goodsList`)
      this.isGoodslist = true
    else if (this.$route.path === `/shopPage/${this.$route.params.id}/comments`)
      this.isGoodslist = false
  },
  methods:{
    toGoods(){
      this.isGoodslist = true;
      this.$router.push({
        path:`/shopPage/${this.shopInfo.id}/goodsList`
      })
    },
    toComments(){
      this.isGoodslist = false;
      this.$router.push({
        path:`/shopPage/${this.shopInfo.id}/comments`
      })
    }
  }
}
</script>

<style lang="stylus">
$blue = #29f
.topImageContainer
  background-image url('../../assets/panda2.png')
  width 100%
  height 30vw
  .backButton
    padding 2vw
    .icon
      color #fff
.shopInfo
  width 100%
  display flex
  flex-flow column
  align-items center
  .logo
    width 22vw
    height 22vw
    border-radius 2vw
    margin -12vh 0 0 0
  h2
    font-size 6vw
    line-height 6.5vw
    text-align center
    width 70vw
  .score
    color #666
    font-size 0.9rem
  .notice
    padding 2vh
    width 75vw
    font-size 0.8rem
    text-align center
    color #999
.shopSwitch
  width 100vw
  margin 2vh auto 0
  padding 1vw 0 0 0
  border-bottom  1px solid rgba(96,96,96,0.1)
  position sticky
  background-color #fff
  top: 0
  div
    width 50%
    // height 7vw
    display inline-block
    text-align center
    line-height 5vw
    font-size 1.2rem
    div
      padding-bottom 2vw
      width auto 
      color #555
    .borderB
      border-bottom 1vw solid $blue
    .router-link-exact-active
      border-bottom 1vw solid $blue
.loading
  padding 45%
</style>