<template>
  <div>
    <div class="userInfo">
      <div class="row1">
        <h2>{{userInfo.usrName}}</h2>
        <div>{{userInfo.mailAddress}}</div>
        <div class="signIn" @click="toast('还没写')" >
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-orderedlist"></use>
          </svg>
          签到领红包</div>
      </div>
      <div class="avatar">
        <img src="@/assets/panda5.png" alt="头像">
      </div>
    </div>
    <div @click="toast('没写，设置里可以退出登录，改密码')">
      <list-item svg="#icon-heart" title="我的收藏"></list-item>
      <list-item svg="#icon-customerservice" title="我的客服"></list-item>
      <list-item svg="#icon-share" title="推荐分享"></list-item>
    </div>
    <router-link to="/setting">
      <list-item svg="#icon-minus-circle" title="设置"></list-item>
    </router-link>

  </div>
</template>

<script>
import listItem from '@/components/listItem'
import { Toast } from 'mint-ui'
export default {
  data(){
    return{
      userInfo: this.$store.state.userInfo
    }
  },
  methods:{
    toast(value){
      Toast(value)
    }
  },
  components:{
    listItem
  }
}
</script>

<style lang="stylus" scoped>

div
  font-size 4vw
  color #333
  div.userInfo
    display flex
    flex-direction row
    justify-content space-between
    .row1
      padding 8vw
      align-items left 
      h2
        font-size 6vw
        margin 2vw 0 
      div
        color #666
      .signIn
        width auto
        line-height 4vw
        border 1px solid #ddd
        border-radius 3vw
        padding 1vw  
        margin 5vw 0 2vw
        font-size 3.5vw
        .icon 
          height 3.7vw
          color #d59
    .avatar
      border-radius 50%
      margin 8vw
      width 20vw
      height 20vw
      background-color #669
      overflow hidden
      img
        width 20vw
        height 20vw

</style>
