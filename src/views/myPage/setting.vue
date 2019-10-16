<template>
  <div>
    <div class="backButton">
      <router-link to="/my">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-left"></use>
      </svg> 
      </router-link>
    </div>
    <div class="title">设置</div>
    <router-link to="/changePasswd">
      <list-item title="修改密码"></list-item>
    </router-link>
    
    <div @click="undoLogin()"><list-item title="退出登录"></list-item></div> 
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import listItem from '@/components/listItem'
export default {
  components:{
    listItem,
  },
  methods:{
    undoLogin(){
      MessageBox.confirm('是否退出登录？')
      .then(
        () =>{ 
          this.$store.commit('undoLogin')
          this.$router.push({
            path:'/login'
          })
        },
        () =>{ console.log('') }
      )
      
      // 
    }
  }
}
</script>

<style lang="stylus" scoped>
div
  color #333
.title
  width 100vw
  text-align center 
  font-size 4vw
  margin 5vw 0
.backButton
  z-index 1
  position absolute
  top 0
  padding 3vw
  .icon
    color #333
</style>