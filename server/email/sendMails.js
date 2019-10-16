const em = require('./email')

function registMail( mailAddress){
  return new Promise((resolve, reject)=>{
    // 简易生成动态口令
      let DynamicMailCode = (Math.random().toFixed(6)*900000+100000).toFixed(0).padStart(6,'0')
      let html = `
      <h3>【邮箱确认】</h3>
      <p>验证码为 <b>${DynamicMailCode} </b></p>
      <p>请于10分钟内完成验证</p>
      <p style="font-size: 8px; color:#aaa; text-decoration: line-through">话费太贵，只能用邮箱</p>
      `
      em.send(mailAddress, html)
      //回调函数传参为 动态口令
      resolve(DynamicMailCode)
      reject()
  } ) 
}

function loginMail( mailAddress){
  return new Promise((resolve, reject)=>{
    // 简易生成动态口令
      let DynamicMailCode = (Math.random().toFixed(6)*900000+100000).toFixed(0).padStart(6,'0')
      let html = `
      <h3>【登录验证】</h3>
      <p>验证码为 <b>${DynamicMailCode} </b></p>
      <p>请于10分钟内完成验证</p>
      <p style="font-size: 8px; color:#aaa; text-decoration: line-through">话费太贵，只能用邮箱</p>
      `
      em.send(mailAddress, html)
      //回调函数传参为 动态口令
      resolve(DynamicMailCode)
      reject()
  } ) 
}

module.exports = {
  registMail,
  loginMail,
}