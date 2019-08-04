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
    // 参数3：配置信息  maxAge 失效时间
    res.cookie('username', 'cookie的值', { maxAge: 60000 });
    res.send('cookie设置成功');
});

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});