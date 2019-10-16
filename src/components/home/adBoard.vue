<template>
  <div class="adBoard">
    <div class="description">
      <h3>广告描述</h3>
      <div class="des1">图片取自饿了么</div>
      <div class="des2">点击抢购 ></div><!-- <router-link class="des2"></router-link> -->
      <img src="https://fuss10.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?imageMogr/format/webp/thumbnail/!282x188r/gravity/Center/crop/282x188/">
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .adBoard
    padding 0 2.6vw
    .description
      padding 3.2vw 4.6vw
      height 30vw
      // background #f4f4f4
      background: -webkit-linear-gradient(#eee, #fff); /* Safari 5.1-6.0 */
      background: -o-linear-gradient(#eee, #fff); /* Opera 11.1-12.0 */ 
      background: -moz-linear-gradient(#eee, #fff); /* Firefox 3.6-15 */
      background: linear-gradient(90deg, #eee 10%, #f5f5f5 90%);
      h3
        margin 2.6vw 0
        font-size 4.7vw
      .des1
        color #666
        font-size 3.5vw
      .des2
        margin 2.6vw 0
        color #966 
        font-size 3.6vw
        font-weight 600
      img
        position absolute
        top 78vw
        left 45vw
        width 45vw
</style>
