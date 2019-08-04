const express = require('express');
const app = new express(); // 实例

// 中间件表示匹配任何路由 app
// next() 继续向下匹配
// 权限匹配  eg： 没有登录跳转到登录页面
// app.use((req, res, next) => {
//     console.log(new Date());
//     next()
// });

// 自定义中间件
const date = (req, res, next) => {
    console.log(new Date());
    next()
}

app.get('/', date, (req, res) => {
    res.send('你好node');
});

app.get('/news', (req, res) => {
    res.send('新闻路由');
});

app.listen(3000, '127.0.0.1', () => {
    console.log(`http://127.0.0.1:3000`);
});