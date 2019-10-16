const router = require('express').Router()

const connect = require('./mysql/connect')

// 接收邮件发送请求
router.post('/api/sendMail',(req,res)=>{
  let mailAddress = req.body.mailAddress
  let isRegister = req.body.isRegister
  connect.setEmailVerCode(mailAddress,isRegister,warning=>{
    if (warning) res.end(warning)
    if (!warning) res.end('邮件已发送')
  })
})

// 接收注册表单
router.post('/api/register',(req,res)=>{
  // console.log(req.body)
  connect.setNewUser(req.body,(warning=>{
    if (warning) res.end(warning)
    res.end('succeed')
  }))
})

// 接收邮箱登录表单
router.post('/api/mailLogin',(req,res)=>{
  connect.checkMailLogin(req.body,(warning,userInfo)=>{
    // console.log(userInfo)
    if (warning) res.end(warning)
    // 登录成功
    else res.end(JSON.stringify(userInfo))
  })
})

// 接收账号密码登录表单
router.post('/api/passwdLogin',(req,res)=>{
  connect.checkPasswdLogin(req.body,(warning,userInfo)=>{
    if (warning) res.end(warning)
    else res.end(JSON.stringify(userInfo))
  })
})

// 主页获取商铺信息
router.get('/api/home',(req,res)=>{
  console.log('enter')
  connect.getShops((err, results)=>{
    if (err) 
      res.end('err')
    res.end(JSON.stringify(results))
  })
})

// 商店页面获取商店和商品信息
router.get('/api/shop',(req,res)=>{
  let id = req.query.id
  connect.getShopInfo(id, (warning,results)=>{
    if (warning) res.end(warning)
    res.end(JSON.stringify(results))
  })
})

// 接收订单信息 存到数据库
router.post('/api/order',(req,res)=>{
  connect.setOrder(req.body, (warning)=>{
    if (warning) res.end(warning)
    res.end('ok')
  })
})

// 获取用户的订单列表信息
router.get('/api/getOrders',(req,res)=>{
  let userId = req.query.userId
  connect.getOrders(userId,(warning,ordersInfo)=>{
    if (warning) res.end(warning)
    else res.end(JSON.stringify(ordersInfo))
  })
})

// 改密码
router.post('/api/changePasswd',(req,res)=>{
  console.log(req.body)
  connect.changePasswd(req.body,(warning,result)=>{
    if(warning) res.end(warning)
    else if (result==='ok') res.end('ok')
    else res.end('服务器粗错了')
  })
})

module.exports = router