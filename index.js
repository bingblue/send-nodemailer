#!/usr/bin/env node

const nodemailer = require('nodemailer')

/** 配置 */
const options = {
  host: process.env['INPUT_HOST'],
  port: process.env['INPUT_PORT'],
  secure: process.env['INPUT_SECURE'],
  auth: {
    user: process.env['INPUT_USER'],
    pass: process.env['INPUT_PASS']
  }
}
const data = {
  from: process.env['INPUT_FROM'],
  to: process.env['INPUT_TO'],
  subject: process.env['INPUT_SUBJECT'],
  text: process.env['INPUT_TEXT'],
  html: process.env['INPUT_HTML']
}
const prefix = 'file://'
if (data.text.startsWith(prefix)) {
  data.text = {
    path: data.text.replace(prefix, '')
  }
}
if (data.html.startsWith(prefix)) {
  data.html = {
    path: data.html.replace(prefix, '')
  }
}
let github = process.env['INPUT_GITHUB']
if (github) {
  github = JSON.parse(github)
  github.isSuccess = process.env['INPUT_SUCCESS'] || true
  data.html = getHtml(github)
}
const transport = nodemailer.createTransport(options)
transport.sendMail(data, (err, info) => {
  if(err) console.error('err', err)
})

function getHtml (github) {
  const isSuccess = github.isSuccess
  const color = isSuccess ? '77af37' : 'd54c53'
  const h1 = isSuccess ? `
  <h1 style="font-size:40px;color:#${color};text-align:center;margin:50px auto;">
    ✔ 恭喜你，构建成功！
  </h1>` : `
  <h1 style="font-size:40px;color:#${color};text-align:center;margin:50px auto;">
    ✘ 很抱歉，构建失败！
  </h1>`
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
  </head>
  <body>
    <table cellpadding="0" cellspacing="0" style="width:750px;margin:0 auto;">
      <tr>
        <td>
          <a href="https://bingblue.com" target="_blank">
            <img src="http://bingblue.oss-cn-hangzhou.aliyuncs.com/company/img/logo.png" style="width:150px;margin:30px 0 20px;">
          </a>
          <hr style="border-color:#${color}">
        </td>
      </tr>
      <tr>
        <td>
          ${h1}
        </td>
      </tr>
      <tr>
        <td>
          <div style="font-size:25px;color:#${color};font-weight:800;">
            构建信息：
          </div>
          <hr style="border-color:#${color}">
        </td>
      </tr>
      <tr>
        <td>
          <ul style="color:#fff;background:#${color};padding:30px 50px;line-height:30px;margin:30px auto;">
            <li>构建名称：${github.event.repository.name}</li>
            <li>构建结果：${isSuccess ? '成功！' : '失败！'}</li>
            <li>操作人：<a style="color:#fff;text-decoration:none;" href="${github.event.sender.url}">
              ${gitub.event.sender.login}
            </a></li>
            <li>构建编号：${gitub.run_number} - ${gitub.run_id}</li>
            <li>完成时间：${new Date().toLocaleString()}</li>
            <li>${github}</li>
            <li>项目地址：<a style="color:#fff;text-decoration:none;" href="${github.event.repository.url}">
              ${github.repository}
            </a></li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          <hr style="border-color:#${color}">
          <a href="https://bingblue.com" target="_blank">
            <img src="http://bingblue.oss-cn-hangzhou.aliyuncs.com/company/img/logo.png" style="width:150px;margin:5px 0 20px;float: right;">
          </a>
        </td>
      </tr>
    </table>
  </body>
  </html>`
}
