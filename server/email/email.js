const nodemailer = require('nodemailer')

async function send( receiver, html){
  let transporter = nodemailer.createTransport({
    service:'163',
    port:'465',
    secure:true,
    // 用户信息 密码为授权码
    auth:{
      user: 'auchoyl@163.com',
      pass:'491685273yl',
    }
  })

  // let info = 
  await transporter.sendMail({
    from:'auchoyl@163.com',
    to: receiver,
    subject:'来自 aucho.xyz 的邮件', //主题
    // text:'hello0123',          //文本正文
    html:html,   //html正文
  },
)
  // console.log('message: ' + info.messageId)
  // console.log('response: ' + info.response)
}
// sendMail().catch( console.error )

module.exports = {
  send,
}

