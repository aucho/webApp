<template>
<div class="page">
  <div class="abs">
    <h1>app的名字</h1>
    <form action="/checkMailVerify" method="POST" v-if="mailLogin">
      <section class="mailInput">
        <input type="text" placeholder="邮箱地址">
        <button class="getVerifyCode" @click.prevent="getVerifyCode" v-if="!timer">获取验证码</button>
        <span class="getVerifyCode" v-else>{{timer}}s</span>
      </section>
      <section><input type="password" placeholder="动态口令"></section>
      <button type="submit" class="loginButton">登录</button>
    </form>
    <form action="/checkPasswd" method="post" v-else>
      <section><input type="text" placeholder="账号" name="account"></section> 
      <section><input type="text" placeholder="密码" name="password"></section> 
      <button type="submit" class="loginButton">登录</button>
    </form>
    <section class="swicher">
      <span @click="useMail" :class="{ underline: mailLogin }">邮箱登录</span>
      <span class="sperater" ></span>
      <span @click="usePasswd" :class="{ underline: !mailLogin }">密码登录</span>
    </section>
    <router-link to="/register">
      <section class="toRegist"> 还没有账号？立即注册</section>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      mailLogin: true,
      timer: 0,
      interval:0,
    }
  },
  methods:{
    useMail: function(){
      this.mailLogin = true
    },
    usePasswd: function(){
      this.mailLogin = false
    },
    getVerifyCode: function(){
      this.timer = 30
      this.interval = setInterval(()=>{
        this.timer--
        if (!this.timer) clearInterval(this.interval)
      },1000)
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
      height 7vh 
      margin 4vh 0
      font-size 2.9rem
      color $blue
    .swicher
      padding 4vh 0 2vh
      color $blue
      font-size 1.1rem
      .sperater
        margin 0 2vw
      .underline
        border-bottom 0.1rem solid $blue
    form
      margin  4vh auto
      .mailInput
        display flex
        flex-direction row
        align-items baseline
        .getVerifyCode
          position absolute
          background-color inherit
          right 8%
          top 20vh
          border none
          z-index 2
          color #666
        .getVerifyCode:active
          border none
      input
        width 44vw
        height 6vh
        padding 1vh 24vw 3vw 3vw
        margin 2vh 3vw 
        font-size 1.4rem
        // font-size 6vw
        color #444
        border none 
        border-bottom 0.2px solid #666
    .loginButton
      width 30vw
      height 10vw
      font-size 1.2rem
  .toRegist
    margin 1vh 0 0 0 
    font-size 2vw
</style>