<template>
  <div>
    <div class="backButton">
      <router-link to="/my">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-left"></use>
      </svg> 
      </router-link>
    </div>
    <div class="title">修改密码</div>
    <section><input type="password" placeholder="旧密码" v-model="oldPasswd"></section>
    <section><input type="password" placeholder="新密码" v-model="newPasswd"></section>
    <section><button @click="changePassword">提交</button></section>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  data(){
    return{
      oldPasswd:null,
      newPasswd:null
    }
  },
  methods:{
    changePassword(){
      var RE = /^[0-9a-zA-Z_]{6,16}$/
      if (this.oldPasswd===this.newPasswd)
        Toast('密码未改变')
      else if(RE.test(this.oldPasswd) && RE.test(this.newPasswd)){
        this.axios.post('/api/changePasswd',{
          oldPasswd:this.oldPasswd,
          newPasswd:this.newPasswd,
          userId:this.$store.state.userInfo.id
        })
        .then(
          res=>{
            if(res.data === 'ok'){
              Toast('密码修改成功，请重新登录')
              setTimeout(()=>{
                this.$store.commit('undoLogin')
                this.$router.push({
                  path:'/login'
                })
              },1000)
            }
            else
              Toast(res.data)
          }
        )      
      }
      else Toast('密码仅支持6-16位数字,英文字母或下划线')
 
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  width 100vw
  text-align center
  font-size 4vw
  margin 5vw 0 10vw
.backButton
  z-index 1
  position absolute
  top 0
  padding 3vw
  .icon
    color #333
section
  padding 5vw 10vw 
  display flex
  flex-direction column
  align-items center
  input
    width 60vw
    line-height 10vw
    font-size 4vw
    border none
    border-bottom 1px solid #666
  button
    font-size 4vw
    width 22vw
    height 9vw
</style>