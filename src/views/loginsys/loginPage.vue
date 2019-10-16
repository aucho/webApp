<template>
<div class="page">
  <div class="abs">
    <h1>app的名字</h1>
    <!-- 邮箱登录 -->
    <form @submit.prevent="mailLogin" v-if="isMailLogin">
      <section class="mailInput">
        <input type="text" placeholder="邮箱地址" v-model="mailAddress">
        <button class="getVerifyCode" @click.prevent="getVerifyCode" v-if="!timer">获取验证码</button>
        <span class="getVerifyCode" v-else>{{timer}}s</span>
      </section>
      <section><input type="password" placeholder="动态口令" v-model="verifyCode"></section>
      <button type="submit" class="loginButton">登录</button>
    </form>
    <!-- 账号密码登录 -->
    <form @submit.prevent="passwdLogin"  v-else>
      <section><input type="text" placeholder="账号/邮箱" v-model="usrName" name="account"></section> 
      <section><input type="password" placeholder="密码" v-model="usrPasswd" name="password"></section> 
      <button type="submit" class="loginButton">登录</button>
    </form>
    <section class="swicher">
      <span @click="useMail" :class="{ underline: isMailLogin }">邮箱登录</span>
      <span class="sperater" ></span>
      <span @click="usePasswd" :class="{ underline: !isMailLogin }">密码登录</span>
    </section>
    <section class="toRegist">
      <router-link to="/register"> 
        还没有账号？立即注册
      </router-link>
    </section>
    
  </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      isMailLogin: true,
      timer: 0,
      interval:0,
      usrPasswd:null,
      usrName:null,
      mailAddress:null,
      verifyCode:null,

    }
  },
  methods:{
    useMail: function(){
      this.isMailLogin = true
    },
    usePasswd: function(){
      this.isMailLogin = false
    },
    getVerifyCode: function(){
      let mailRE = /^[0-9a-zA-Z_]+@([0-9a-zA-Z_]+)\.([0-9a-zA-Z_]+)$/
      if (this.mailAddress && mailRE.test(this.mailAddress))
      {
        this.axios.post('/api/sendMail',{
          mailAddress:this.mailAddress,
          isRegister:false
        })
        // 传回的res是错误警告 比如邮箱不存在之类的
        .then( res=>{
          Toast(res.data)
          if(res.data==='邮件已发送'){
            this.timer = 30
            this.interval = setInterval(()=>{
              this.timer--
              if (!this.timer) clearInterval(this.interval)
            },1000)            
          }
        })
        .catch(err=>{
          console.log(err)
        })     
      }
    },
    mailLogin:function(){
      let mailInfo = {
        mailAddress:this.mailAddress,
        verifyCode:this.verifyCode,
      }
      this.axios.post('/api/mailLogin',mailInfo)
      .then(res=>{
        console.log(res)
        if (res.data instanceof Object && res.data.id)
        {
          this.$store.commit('login',res.data)
          //跳转
          this.$router.push({
            path:'/home'
          })
        }
        else Toast(res.data)
      })
      .catch(()=>{
        Toast('网络错误')
      })
    },
    passwdLogin:function(){
      let loginInfo = {
        usrName:this.usrName,
        usrPasswd:this.usrPasswd
      }
      this.axios.post('/api/passwdLogin',loginInfo)
      .then(res=>{
        if (res.data instanceof Object && res.data.id)
        {
          this.$store.commit('login',res.data)
          //跳转
          this.$router.push({
            path:'/home'
          })
        }
        else Toast(res.data)
      })
      .catch((err)=>{
        console.log(err)
        Toast('网络错误')
      })
    }

  }
}
</script>

<style lang="stylus" scoped>
$blue = #08f
.page
  padding 6vh 0 0 0
  text-align center
  display flex
  flex-direction column
  align-items center
  .abs
    position absolute
    h1 
      height 12vw 
      margin 7vw 0
      font-size 12vw
      color $blue
    .swicher
      padding 7vh 0 3.5vh
      color $blue
      font-size 4.4vw
      .sperater
        margin 0 2vw
      .underline
        border-bottom 2px solid $blue
    form
      margin  7vw auto
      .mailInput
        display flex
        flex-direction row
        align-items baseline
        .getVerifyCode
          position absolute
          background-color inherit
          right 8%
          top 35vw
          border none
          z-index 2
          color #666
        .getVerifyCode:active
          border none
      input
        width 44vw
        height 10.5vw
        padding 1.75vw 24vw 3vw 3vw
        margin 3.5vw 3vw 
        font-size 5.6vw
        // font-size 6vw
        color #444
        border none 
        border-bottom 0.2px solid #666
    .loginButton
      width 30vw
      height 10vw
      font-size 4.8vw
  .toRegist
    margin 1.75vw auto
    font-size 2vw
</style>