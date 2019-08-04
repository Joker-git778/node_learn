// 加密方法
// 让用户看不到cookie的明文信息
// 1. 保存时加密  
// 2. cookie-parser 参数 signed 设置为true

const express = require('express');
const cookieParser = require('cookie-parser'); // 引入

const app = express();
app.use(cookieParser('signed')); // 挂载  参数表示加密的随机字符串

app.get('/', (req, res) => {
    res.send('nodejs');
});

app.get('/get', (req, res) => {
    // 获取cookie
    // req.cookies.name

    // 加密获取方法
    // req.signedCookies

    console.log(req.signedCookies.username);
    res.send('获取cookie成功');
});

// 设置cookie
app.get('/set', (req, res) => {
    // 参数1：名字
    // 参数2：cookie的值
    // 参数3：配置信息  maxAge 最大失效时间 httpOnly 只有后端可以操作cookie  没办法用js
    res.cookie('username', 'cookie111_info', { maxAge: 60000, httpOnly: true, signed: true });
    res.send('cookie设置成功');
});

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});