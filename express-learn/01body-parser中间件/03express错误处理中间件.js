const express = require('express');
const app = new express(); // 实例

app.get('/', (req, res) => {
    res.send('你好node');
});

// 匹配不到所有路由 404
app.use((req, res) => {
    res.status(404).send('这是404表示没有匹配到路由');
})

app.listen(3000, '127.0.0.1', () => {
    console.log(`http://127.0.0.1:3000`);
});