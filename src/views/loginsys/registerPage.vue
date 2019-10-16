<template>
<div class="page">
  <div class="abs">
    <h1>app的名字</h1>
    <form @submit.prevent="submit($event)">
      <section class="mailInput">
        <input type="text" placeholder="邮箱地址" name="mailAddress" v-model="mailAddress">
        <button class="getVerifyCode" @click.prevent="getVerifyCode" v-if="!timer">获取验证码</button>
        <span class="getVerifyCode" v-else>{{timer}}s</span>
      </section>
      <section><input type="text" placeholder="动态口令" name="verifyCode" v-model="verifyCode"></section>
      <section><input type="text" placeholder="用户名" maxlength="10" name="username" v-model="username"></section> 
      <section><input type="password" placeholder="密码" maxlength="16" name="password" v-model="password"></section>
      <section><input type="password" placeholder="确认密码" maxlength="16"  v-model="confirmPassword"></section> 
      <section class="alertMsg"> {{alertMsg}} </section>
      <button class="regButton" v-if="allowSubmit">注册</button>
      <button class="regButton gray" @click.prevent v-else>注册</button>
    </form>
    <section class="toLogin">
      <router-link to="/login">
        已有账号？立即登录
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
      mailLogin: true,
      timer: 0,
      interval:0,
      mailAddress:'',
      verifyCode: '',
      username:'',
      password:'',
      confirmPassword:''
    }
  },
  methods:{
    getVerifyCode: function(){
      let mailRE = /^[0-9a-zA-Z_]+@([0-9a-zA-Z_]+)\.([0-9a-zA-Z_]+)$/
      if (this.mailAddress && mailRE.test(this.mailAddress))
      {
        this.axios.post('/api/sendMail',{
          mailAddress:this.mailAddress,
          isRegister:true
        })
        // 传回的res是错误警告 比如邮箱已存在之类的
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
    submit: function(/*event*/){
      let data = {
        usrName: this.username,
        usrPasswd: this.password,
        mailAddress: this.mailAddress,
        verifyCode: this.verifyCode
      }
      // var formData = new FormData(event.target)
      this.axios.post('/api/register',data)
      .then( res =>{  
          if (!res) return
          if (res.data==='succeed')
          {
            Toast('注册成功')
            // 跳转
            setTimeout(()=>{
              this.$router.push({
              path:'/login'
            })
            },1000)
          }
        })
      .catch(err=>{ console.log(err) })
    }
  },
  computed:{
    alertMsg(){
        // 邮箱正则表达式
        let mailRE = /^[0-9a-zA-Z_]+@([0-9a-zA-Z_]+)\.([0-9a-zA-Z_]+)$/
        // 动态口令
        let codeRE = /^\d{6}$/
        // 账户
        let userRE = /^[a-zA-Z0-9_\u4E00-\u9FA5]{3,10}$/ 
        // 密码
        var RE = /^[0-9a-zA-Z_]{6,16}$/
        // if (!(this.mailAddress && this.verifyCode && this.username && this.password && this.confirmPassword))
        //   return ''
        if (this.mailAddress && !mailRE.test(this.mailAddress)) return '请检查邮箱地址格式' 
        if (this.verifyCode && !codeRE.test(this.verifyCode)) return '验证码错误'
        if (this.username && this.username.length < 3 ) return '用户名过短'
        if (this.username && !userRE.test(this.username)) return '用户名支持中文、英文字符及下划线'
        if (this.password && this.password.length < 6) return '请输入6-16位密码,'
        if (this.password && !RE.test(this.password)) return '仅支持数字、英文字母大小写以及下划线'
        if (this.confirmPassword && this.password !== this.confirmPassword) return '两次密码输入不一致'
          return ''
      },
    allowSubmit(){
      if (this.mailAddress && 
          this.verifyCode && 
          this.username && 
          this.password && 
          this.confirmPassword &&
          !this.alertMsg) 
          return true
      return false
    }
  },

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
      font-size 2.9rem
      color $blue
    .swicher
      padding 7vw 0 3.5vw
      color $blue
      font-size 4.4vw
      .sperater
        margin 0 2vw
      .underline
        border-bottom 2px solid $blue
    form
      margin 7vw auto
      .mailInput
        display flex
        flex-direction row
        align-items baseline
        .getVerifyCode
          position absolute
          background-color inherit
          right 8%
          top 32.2vw
          border none
          z-index 2
          color #666
        .getVerifyCode:active
          border none
      input
        width 44vw
        height 5.25vw
        padding 1.75vw 24vw 3vw 3vw
        margin 3.5vw 3vw 
        font-size 4.4vw
        // font-size 6vw
        color #444
        border none 
        border-bottom 1px solid #666
    .alertMsg 
      height 7vw
      width 60vw
      text-align left
      padding-left 5vw
      margin-top -1.75vw
      font-size 3.6vw
      color #e26
    .regButton
      width 30vw
      height 10vw
      font-size 4.8vw
    button.gray
      background-color #aaa
    .toLogin
      margin 1.75vw 0 0 0 
      font-size 2vw
      color #666
</style>