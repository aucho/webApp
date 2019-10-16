const app = require('express')()

const bodyParser = require('body-parser')

const router = require('./router.js')

// 用于解析post请求
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 设置跨域
app.use((req, res, next) => {
  // 设置是否运行客户端设置 withCredentials
  // 即在不同域名下发出的请求也可以携带 cookie
  res.header("Access-Control-Allow-Credentials",true)
  // 第二个参数表示允许跨域的域名，* 代表所有域名  
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS') // 允许的 http 请求的方法
  // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if (req.method == 'OPTIONS') {
      res.sendStatus(200)
  } else {
      next()
  }
})

// app.use
app.use(router)

app.listen(10086,()=>{
  console.log('link start, listening at port 10086')
})