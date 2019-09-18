<template>
  <div class="marginbottom">
    <img src="../../assets/panda3.png" alt="商家图片">
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
        <span class="tag"  v-for="tag in tags" :key="tag" > {{tag}} </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props:['shopinfo'],
  data() {
    return {
      name: this.shopinfo.name,
      score: this.shopinfo.score,
      sellvolume:this.shopinfo.sellvolume,
      price: this.shopinfo.price,
      tags: this.shopinfo.tag,
      url: this.shopinfo.imgUrl
    }
  },
  mounted(){
    console.log(this.shopinfo)
    console.log(this.shopinfo.tag[0])
  }
}
</script>

<style lang="stylus" scoped>
.marginbottom
  display flex
  width 100vw
  margin 0 0 5vw 0
  img 
    width 25vw
    height 25vw
    margin 3vw
    border-radius 5%
  .shopinfo
    padding 3vw 0
    border-bottom 0.02rem solid rgba(100,100,100,0.5)
    flex-direction column
    display flex
    flex 7
    h2
      width 50vw
      margin 0 0 0.5rem 0
    p
      width 60vw 
      color #666
      display flex
      flex-direction row
      align-items center
      .tag
        margin 2vw 2vw 0 0 
        padding 1.4vw
        font-size 0.9rem
        border-radius 0.5vw
        background-color rgba(255,86,48,.2)
        color #f63
    .tags:last-child
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .score
      color #f63
      .count
        color #666
        margin-left 3vw

.ellipsis
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
</style>