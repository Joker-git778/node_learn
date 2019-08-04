# cookie-parser中间件

1. npm install cookie-parser --save 安装

2. 引入 var express = require('express')
    var cookieParser = require('cookie-parser')
    
    var app = express()
    app.use(cookieParser())
