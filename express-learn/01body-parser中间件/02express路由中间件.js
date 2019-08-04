const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('express路由中间件');
});

app.get('/news', (req, res, next) => {
    res.send('新闻路由');
    next(); // 路由继续向下匹配
});

app.get('/news', (req, res) => {
    console.log('这是中间件路由');

});

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});