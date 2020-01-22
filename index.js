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
  text: JSON.parse(process.env['INPUT_TEXT']),
  html: process.env['INPUT_HTML']
}
const transport = nodemailer.createTransport(options)
transport.sendMail(data, (err, info) => {
  if(err) console.error('err', err)
})
