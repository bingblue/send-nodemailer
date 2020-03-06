#!/usr/bin/env node

const nodemailer = require('nodemailer')

/** nodemailer配置 */
const options = {
  host: process.env['INPUT_HOST'],
  port: process.env['INPUT_PORT'],
  secure: process.env['INPUT_SECURE'],
  auth: {
    user: process.env['INPUT_USER'],
    pass: process.env['INPUT_PASS']
  }
}
/** 发送邮件信息 */
const data = {
  from: process.env['INPUT_FROM'],
  to: process.env['INPUT_TO'],
  subject: process.env['INPUT_SUBJECT'],
  text: process.env['INPUT_TEXT'],
  html: process.env['INPUT_HTML']
}
/** 可以传文件路径 */
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
/** 如果是传github环境变量，用默认邮件样式 */
let github = process.env['INPUT_GITHUB']
if (github) {
  github = JSON.parse(github)
  github.isSuccess = process.env['INPUT_SUCCESS']
  data.html = getHtml(github)
}
/** 创建nodemailer transport，并发送邮件 */
const transport = nodemailer.createTransport(options)
transport.sendMail(data, (err, info) => {
  if(err) console.error('err', err)
})
/** 获取默认邮件样式 */
function getHtml (github) {
  const isSuccess = github.isSuccess === 'Success'
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
            <li>构建分支：${github.ref}</li>
            <li>构建编号：${github.run_number} - ${github.run_id}</li>
            <li>构建事件：on:${github.event_name}(${github.sha.substring(0, 7)})</li>
            <li>操作人：<a style="color:#fff;" href="${github.event.sender.html_url}">
              ${github.event.sender.login}
            </a></li>
            <li>开始日期：${getDate(github)}</li>
            <li>持续时间：${getDuration(github)}</li>
            <li>项目地址：<a style="color:#fff;" href="${github.event.repository.url}">
              ${github.repository}
            </a></li>
            <li>构建地址：<a style="color:#fff;" href="${github.event.repository.url}/actions/runs/${github.run_id}">
              ${github.repository}/actions
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
/** 获取持续时间 */
function getDuration (github) {
  const earlyDate = new Date(github.event.repository.pushed_at*1000).getTime()
  const lateDate = new Date().getTime()
  const diff = lateDate - earlyDate
  let second = parseInt(diff / 1000)
  let minute
  if (second > 60) {
    minute = parseInt(second / 60)
    second = second % 60
    return `${minute}分${second}秒`
  }
  return `${second}秒`
}

/** 获取开始日期 */
function getDate (github) {
  const pushedDate = new Date(github.event.repository.pushed_at*1000 + 1000*60*60*8)
  const yyyy = pushedDate.getFullYear()         // 年
  const M = pushedDate.getMonth() + 1           // 月
  const MM = M < 10 ? '0' + M : M               // 月 - 补0
  const d = pushedDate.getDate()                // 日
  const dd = d < 10 ? '0' + d : d               // 日 - 补0
  const H = pushedDate.getHours()               // 时
  const HH = H < 10 ? '0' + H : H               // 时 - 补0
  const m = pushedDate.getMinutes()             // 分
  const mm = m < 10 ? '0' + m : m               // 分 - 补0
  const s = pushedDate.getSeconds()             // 秒
  const ss = s < 10 ? '0' + s : s               // 秒 - 补0
  return `${yyyy}年${MM}月${dd}日 ${HH}:${mm}:${ss}`
}
