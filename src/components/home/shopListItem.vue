<template>
  <div class="marginbottom">
    <img :src="url" alt="商家图片">
    <router-link :to="address" tag="div">
      <div class="shopinfo">
        <h2 v-text="name" class="ellipsis"></h2>
        <p class="score">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-star"></use>
          </svg>
          <span>{{score}} </span>
          <span class="count">月售 {{sellvolume}} </span>
        </p>
        <p > 人均￥{{price}} </p>
        <p class="ellipsis tags">
          <span class="tag ellipsis"  v-for="tag in tags" :key="tag" > {{tag}} </span>
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props:['shopInfo'],
  data() {
    return {
      name: this.shopInfo.name,
      score: this.shopInfo.score.toFixed(1),
      sellvolume:this.shopInfo.sellvolume,
      price: this.shopInfo.price,
      tags: this.shopInfo.tags.split(','),
      url: this.shopInfo.imgUrl? require(`@/assets/${this.shopInfo.imgUrl}`):'',
      address:'/shopPage/'+this.shopInfo.id
    }
  },
  mounted(){
    // console.log(this.shopinfo)
    // console.log(this.shopinfo.tag[0])
  },
}
</script>

<style lang="stylus" scoped>
.marginbottom
  display flex
  width 100vw
  margin 0 0 5vw 0
  font-size 3.9vw
  img 
    width 25vw
    height 25vw
    margin 3vw
    border-radius 5%
  .shopinfo
    padding 3vw 0
    border-bottom 1px solid #eee
    flex-direction column
    display flex
    flex 7
    h2
      line-height 6.5vw
      font-size 5vw
      width 50vw
      margin 0 0 1.5vw 0
    p
      width 60vw 
      color #666
      display flex
      flex-direction row
      line-height 4.5vw
      align-items center
      .tag
        margin 2vw 2vw 0 0 
        padding 1.4vw
        font-size 3.5vw
        border-radius 0.5vw
        background-color rgba(255,86,48,.2)
        color #f63
        max-width 20vw
    .score
      color #f63
      .icon
        margin-left -1.5vw
      .count
        color #666
        margin-left 3vw
.ellipsis
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
</style>