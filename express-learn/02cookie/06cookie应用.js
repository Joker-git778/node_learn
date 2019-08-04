const express = require('express');
const cookieParser = require('cookie-parser'); // 引入

const app = express();
app.use(cookieParser('signed'));

app.get('/', (req, res) => {
    res.send(`浏览过的城市${req.cookies.citys}`);
});

app.get('/lvyou', (req, res) => { // 写入城市

    let city = req.query.city; // 当前城市
    let citys = req.cookies.citys; // 所有城市的数组
    if (!citys) citys = []; // 没有浏览过 没有citys 把citys改为数组
    citys.push(city); // 无论有没有都把city传进去
    res.cookie('citys', citys, { maxAge: 60 * 1000 * 10 }); // 存储citys数组
    res.send(`你浏览的城市是${city}`);
});


app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});