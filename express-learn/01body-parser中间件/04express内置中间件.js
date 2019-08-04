const express = require('express');
const app = new express(); // 实例

// 内置中间件， 托管静态页面
// css/style.css 查找静态资源文件
app.use(express.static('public'));

// 虚拟目录
// static/css/styleMedia.css  只加路径其它不变
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.send('你好node');
});

app.listen(3000, '127.0.0.1', () => {
    console.log(`http://127.0.0.1:3000`);
});