// 连接数据库 负责数据处理 
// 要处理的东西不多 就不分开了
const mysql = require('mysql')
const sendMails = require('../email/sendMails')

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password:'',
  database:'app',
  // 打开同时执行多条查询语句功能 查询结果为数组 数组元素按顺序为各条语句查询的结果
  multipleStatements:true
})
connection.connect()

// 封装查询语句
function query(sql){
  return new Promise(
    (resolve, reject)=>{
      connection.query(sql,(err,res)=>{ 
        if (!err) resolve(res)
        reject(err)    
       })
    }
  )
}

// 临时储存用户邮箱和验证码 现在是10分钟失效
var setEmailVerCode = function(mailAddress,isRegister,callback){
  // 邮箱是否被注册
  let checkMail = `SELECT * from usrinfo WHERE mailAddress='${mailAddress}'`
  let vc = ''
  query(checkMail)
  .then(
    res=>{
      // 注册时
      if (isRegister){
        if (res[0]){
          callback('该邮箱已注册')
          return
        }
        // 发送邮件
        return sendMails.registMail(mailAddress)
      }
      // 登录时
      if(res[0]){
        return sendMails.loginMail(mailAddress)
      }
      callback('该邮箱未注册')
      return
    }
  )
  .catch(
    err=>{
      if (err) console.log(err)
    })
  // 发邮件
  .then((verifyCode)=>{
    vc =verifyCode
    console.log(verifyCode)
    setTimeout(()=>{
      connection.query(`DELETE FROM verifyMail WHERE tempVerifyCode=${verifyCode}`,err=>{
        console.log(err)
      })
    },600000)
    // 检测邮箱是否在临时表里 如果有的话 直接更改验证码
    return query(`UPDATE verifyMail SET tempVerifyCode='${vc}' WHERE mailAddress='${mailAddress}'`)
  })

  .then(res=>{
      // 如果有所改动 说明邮箱已经在表里 直接返回
      if (res.affectedRows) return callback(null)
      // 否则把邮箱和验证码临时存到verifyMail表里
      return query(`INSERT INTO verifyMail VALUES ('${mailAddress}',${vc})`)
    })
  .catch((err)=>{
    if (err)
      console.log(err)
    callback('服务器错误:稍后再试')
  })

  .then(()=>{
    callback(null)
  })
  .catch(err =>{
    if (err)
      console.log(err)
    callback('服务器错误:稍后再试')
  })
}

//注册时 检测用户信息 如没有问题 则保存之 不然报错
var setNewUser = function(userInfo, callback){
  // 判断验证码是否正确
  query(`SELECT * FROM usrinfo where usrName='${userInfo.usrName}'`)
    .then( 
      res=>{
        console.log(res)
        if(res[0]){
          callback('用户名已被注册')
          return
        }
        return query(`SELECT tempVerifyCode FROM verifyMail WHERE mailAddress='${userInfo.mailAddress}'`)
      },
      ()=>{
            callback('注册失败:用户名检查错误') 
            return
        }
    )
    .then(
      res =>{
        if (!res) return 
        if (res[0].tempVerifyCode !== userInfo.verifyCode){
          callback('验证码错误')
          return
        }  
        return query(`INSERT INTO usrinfo VALUES (${null},'${userInfo.usrName}','${userInfo.usrPasswd}','${userInfo.mailAddress}',${null})`)
      }
    )
    .catch(
      err =>{
        if (!err) return
        console.log(err)
        callback('验证失败,请稍后重试')
      }
    )
    // 保存用户信息
    .then(
      () =>{
        callback(null,'succeed')
      }
    )
    .catch(
      err=>{
        if (!err) return
        // console.log(err)
        callback('用户信息存储失败')
      }
    )
}


// 登录 检测邮箱是否注册 and 检测邮箱和验证码是否匹配
// 检查邮箱是否注册是为了防止 注册时发送的邮件直接被用来登录
var checkMailLogin = function(mailInfo, callback){
  let userInfo = null
  query(`SELECT * FROM usrinfo WHERE mailAddress='${mailInfo.mailAddress}'`)
  .then(
    res=>{
      if(res[0]){
        userInfo = {
          id: res[0].id,
          usrName:res[0].usrName,
          mailAddress:res[0].mailAddress,
          address:res[0].address
        }
        return query(`SELECT * FROM verifymail WHERE mailAddress='${mailInfo.mailAddress}'`)
      }
      callback('邮箱未注册')
    },
    err=>{ 
      if (err) 
      callback('验证失败，请稍候或使用账号密码登录')
    }
  )
  .then(
    res=>{
      if (!res) return
      // 验证成功 登录
      if (res[0].tempVerifyCode===mailInfo.verifyCode)
        callback(null,userInfo)
        
      callback('验证失败:验证码错误')
    },
    ()=>{
      callback('验证失败')
    }
  )
}
// 用户名密码登录 检查 用户名(或邮箱) 和密码是否匹配
var checkPasswdLogin = function(loginInfo,callback){
  let re = /^[0-9a-zA-Z_]+@([0-9a-zA-Z_]+)\.([0-9a-zA-Z_]+)$/
  let mailOrName = re.test(loginInfo.usrName) ? 'mailAddress':'usrName'
  query(`SELECT * FROM usrinfo WHERE ${mailOrName}='${loginInfo.usrName}'` )
  .then(
    res=>{
      if (!res[0]){
        callback('账号或密码错误')
        return
      } 
      if (res[0].usrPasswd===loginInfo.usrPasswd){
        let userInfo = {
          id: res[0].id,
          usrName:res[0].usrName,
          mailAddress:res[0].mailAddress,
          address:res[0].address
        }
        callback(null,userInfo)
        return
      }
      else callback('账号或密码错误')
    }
  )
  .catch(
    (err)=>{
      console.log(err)
      callback('登录失败:用户名检查错误')
    }
  )
}


// 获取所有商铺信息
var getShops = function(callback){
  connection.query("SELECT * FROM `shopInfo`",(err, results)=>{
    if (err) callback(err)
    else callback(null, results)
  })
}

// 查询对应id 的店铺和店铺商品信息
var getShopInfo = function(id, callback){
  if(!id) {
    callback('页面不存在')
    return
  }
  connection.query('SELECT * FROM `shopInfo` WHERE id ='+ id + ';SELECT * from goodsInfo WHERE `shopId` ='+id ,(err, results)=>{
    if (err){
      callback('页面加载出错')
      return
    } 
    // 整理商品数据
    console.log(results)
    if (!results[0][0]) return callback('页面不存在')
    results[1] = arrangeGoodsInfo(results[1])
    callback(null, results)
  })
}

// 将订单数据存入购物车
var  setOrder = function(order, callback){
  let orderInfo = JSON.stringify(order)
  let userId = order.userInfo.id
  let shopId = order.shopInfo.id
  query(`INSERT INTO ordersInfo VALUES (${null},'${orderInfo}','${userId}','${shopId}')`)
  .then(
    res =>{
      if (res){
        callback(null)
        return query(`UPDATE shopInfo SET sellvolume=sellvolume+1 WHERE shopId=${shopId}`)  
      }
    }
  ).catch(
    err=>{
      if (err)
      console.log(err)
        callback('提交订单失败')
    }
  )
}

// 获取用户的订单
var getOrders = function(userId, callback){
  query(`SELECT id,orderInfo from ordersinfo WHERE userId=${userId}`)
  .then(
    res =>{
      let orders = []
      for (let item of res){
        item.orderInfo.orderId = item.id
        orders.push(JSON.parse(item.orderInfo)) 
      }
      callback(null,orders)
    }
  )
  .catch(
    (err) =>{
      console.log(err)
      callback('获取订单失败')
    }
  )
}
// 修改密码
var changePasswd = function(reqInfo, callback){
  query(`SELECT usrPasswd FROM usrInfo WHERE id=${reqInfo.userId}`)
  .then(
    res=>{
      if (res[0].usrPasswd !== reqInfo.oldPasswd)
      {
        callback('密码错误')
        return
      }
      return query(`UPDATE usrInfo SET usrPasswd=${reqInfo.newPasswd} WHERE id=${reqInfo.userId}`)
    },
    err =>{ 
      if (err)
        console.log(err) 
      callback('服务器错误')
    }
  )
  .then(
    res =>{ 
      if (res)
       if(res.affectedRows)
        callback(null,'ok')
    }
  )
}

module.exports={
  setEmailVerCode,
  checkMailLogin,
  checkPasswdLogin,
  getShops,
  getShopInfo,
  setOrder,
  setNewUser,
  getOrders,
  changePasswd
}


//////////////////数据处理///////////////
function arrangeGoodsInfo(goodsItems){
  var goodsCategory = []
      var obj = {}
      // 获取所有分类名注入到 goodsCategory
      for(let goods of goodsItems){
        if (!obj[goods.categoryName])
        {
          obj[goods.categoryName]=1
          goodsCategory.push({
            name:goods.categoryName,
            goods:[]
          })
        }
      }
      // 将所有商品注入到 各自goodsCategory的分类中
      goodsCategory.forEach((category)=>{
        for(let goods of goodsItems){
          if (goods.categoryName === category.name){
            category.goods.push(JSON.parse(JSON.stringify(goods)))        
          }
        }
      })
      return goodsCategory
}
