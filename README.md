# Send-Nodemailer

Send Email By Nodemailer.

使用`Nodemailer`发送邮件。

## 基本信息

**作者** ： 小牧COOL

**博客** ： [www.xiaomucool.com][4]

**QQ群** ： [215259343][1]

**官网** ： [www.bingblue.com][2]

## Usage
```yml
- name: Send Mail 发送邮件
  uses: bingblue/send-nodemailer@master
  with:
    # 账号
    user: '${{ secrets.MAIL_USER }}'
    # 密码
    pass: '${{ secrets.MAIL_PASS }}'
    # host，在邮箱的设置里可以找到
    host: 'smtp.exmail.qq.com'
    # 端口
    port: 465
    # 是否开启SSL
    secure: true
    # 发送者
    from: 'Your Name <youremail@gmail.com>'
    # 收件人
    to: someone@gmail.com,sometwo@outlook.com
    # 主题
    subject: 'this is email subject'
    # use html file，使用HTML文件
    html: file://./path/result.html
    # use html，使用HTML代码片段
    html: '<p>this is content</p>'
```

## License

The scripts and documentation in this project are released under the [MIT License][3]

Powered by : **小牧COOL**

[1]:https://jq.qq.com/?_wv=1027&k=5tyQDAd
[2]:https://www.bingblue.com
[3]:https://github.com/bingblue/send-nodemailer/blob/master/LICENSE
[4]:https://www.xiaomucool.com
