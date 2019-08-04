/**
 * body-parser 中间件  第三方  获取post提交的数据
 * npm i body-parser --save
 * const bodyParser = require('body-parser')
 * 
 *  获取表单数据
    app.use(bodyParser.urlencoded({ extended: false }))
    
    获取json数据
    app.use(bodyParser.json())
 */

const express = require('express');
const bodyParser = require('body-parser'); // 引入中间件
const app = express();

// cookie session 获取post提交数据

// 配置bodyParser中间件
// 获取表单数据
app.use(bodyParser.urlencoded({ extended: false }))

// 转化json数据
app.use(bodyParser.json())

app.get('/login', (req, res) => {
    res.render('login');
});

// ejs 引擎  配置
app.set('view engine', 'ejs');

app.post('/doLogin', (req, res) => {
    console.log(req.body.username); // 获取post提交数据

    res.render('login');
});


app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});