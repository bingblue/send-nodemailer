# Send-Nodemailer

Send Email By Nodemailer.

使用`Nodemailer`发送邮件。

## Base Info/基本信息

**Author/作者** ： 小牧COOL

**Blog/博客** ： [xiaomucool.com][4]

**QQ group/QQ群** ： [215259343][1]

**Website/官网** ： [www.bingblue.com][2]

## Usage/用法
```yml
- name: Send Mail 发送邮件
  uses: bingblue/send-nodemailer@master
  with:
    # 账号
    user: '${{ secrets.MAIL_USER }}'
    # 密码
    pass: '${{ secrets.MAIL_PASS }}'
    # Host，在邮箱的设置里可以找到
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
    # Use html file, prefix [file://]，使用HTML文件，已[file://]开头
    html: file://./path/result.html
    # Or use html script，或者使用HTML代码片段
    # html: '<p>this is content</p>'
```

## More/更多

Usage docs for Nodemailer are [here][5].

更多`Nodemailer`用法请看[官方文档][5]。

## License

The scripts and documentation in this project are released under the [MIT License][3]

Powered by : **小牧COOL**

[1]:https://jq.qq.com/?_wv=1027&k=5tyQDAd
[2]:https://www.bingblue.com
[3]:https://github.com/bingblue/send-nodemailer/blob/master/LICENSE
[4]:https://xiaomucool.com
[5]:https://nodemailer.com/usage/
