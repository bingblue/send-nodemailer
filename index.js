#!/usr/bin/env node

const nodemailer = require('nodemailer')

/** 配置 */
const options = {
  host: 'smtp.exmail.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: 'system@bingblue.com',
    pass: 'gL6rg2fJecTHHZm3'
  }
}
const data = {
  from:'[滨清科技] <system@bingblue.com>',
  to:'895355044@qq.com',
  subject:'主题',
  text:'我试试主题',
  // html:'',
  // attachments:[
  // {
  //     filename:'',
  //     path:'',
  //   }
  // ]
}
console.log('process.env==>', process.env)
console.log('process.ENV===》', process.ENV)
console.log('ENV===》', process.env['INPUT_MYINPUT'])
// const transport = nodemailer.createTransport(options)
// transport.sendMail(data, (err, info) => {
//   if(err) console.error('err', err)
// })
