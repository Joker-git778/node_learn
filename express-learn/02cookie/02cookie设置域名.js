// domain域名

// baidu.com 域名
// news.baidu.com 二级域名
// 需求：1. 在跳转到二级域名的情况下还可以获取到 cookie
//       2. 设置在访问特定的域名下才可以获取cookie 

// C: \Windows\ System32\ drivers\ etc\ hosts 
// 新增 端口号  对应网址
// eg: 127.0.0.1  www.aaa.com
//     127.0.0.1  news.aaa.com

const express = require('express');
const cookieParser = require('cookie-parser'); // 引入

const app = express();
app.use(cookieParser()); // 挂载

app.get('/', (req, res) => {
    res.send('nodejs');
});

app.get('/get', (req, res) => {
    // 获取cookie
    // req.cookies.name
    console.log(req.cookies.username);
    res.send('获取cookie成功');
});

// 设置cookie
app.get('/set', (req, res) => {
    // 参数1：名字
    // 参数2：cookie的值
    // 参数3：配置信息  maxAge 最大失效时间  diomain  设置多个二级域名访问
    res.cookie('username', 'cookie的值', { maxAge: 60000, diomain: '.aaa.com' });
    res.send('cookie设置成功');
});

app.listen(3000, '127.0.0.1', () => {
    console.log(`http://localhost:3000`);
});