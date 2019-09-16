<template>
  <mt-swipe :auto = "0">
    <mt-swipe-item>
      <ul>
        <li v-for="gItem in gItems" :key="gItem.id">
          <div class="container">
            <img src="https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/" alt="">
          </div>
          <span>{{gItem.gName}}</span>
        </li>
      </ul>
    </mt-swipe-item>
    <mt-swipe-item>
      <ul>
        <li v-for="gItem in gItems2" :key="gItem.id">
          <div class="container">
            <img src="https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/" alt="">
          </div>
          <span>{{gItem.gName}}</span>
        </li>
      </ul>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  data(){
    return{
      gItems:[
        { gName: "美食", gImg : "url" },
        { gName: "汉堡简餐", gImg : "url" },
        { gName: "美食", gImg : "url" },
        { gName: "美食", gImg : "url" },
        { gName: "美食", gImg : "url" },
        { gName: "美食", gImg : "url" },
        { gName: "美食", gImg : "url" },
        { gName: "美食", gImg : "url" },
        { gName: "美食", gImg : "url" },
        { gName: "美食", gImg : "url" },
      ],
      gItems2:[
        { gName: "美食", gImg : "url" },
        { gName: "美食", gImg : "url" },
        { gName: "美食", gImg : "url" },
        { gName: "美食", gImg : "url" },
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.mint-swipe
  height 50vw
  .mint-swipe-item
    width 100%
    height 100%
    ul
      // display flex
      // flex-wrap wrap
      li
        width 20%
        margin-top 0.8rem
        text-align center
        display inline-block
        color #444
        font-size 0.85rem
        .container
          margin 0 auto
          height 3rem
          width 3rem
          img 
            width 100%
            height 100%
            
        span 
          display block
          margin 0.3rem

.mint-swipe >>> .mint-swipe-indicator
  border-radius 2px
  width 16px
  height 4px
  background-color #aaa
.mint-swipe >>> .mint-swipe-indicator.is-active
  background-color #300
</style>
