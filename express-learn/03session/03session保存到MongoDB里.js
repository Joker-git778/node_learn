/**
 * 1. 需要安装 express-session  和  connect-mongo 模块
 * 2. 引入模块

    const express = require('express');
    const session = require('express-session');
    const MongoStore = require('connect-mongo')(session);

    3. 配置中间件
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,

        store: new MongoStore({
            url: 'mongodb://127.0.0.1:27017/student', //数据库地址
            touchAfter: 24 * 3600 // 可以不设置
        })
    }));

// 4. 使用
 */

// req.session.destory(err => { // 销毁session

// });

// req.session.username = "张三" // 设置session

// req.session.username //获取session

// req.session.cookie.maxAge = 0; // 重新设置cookie的过期时间

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express()
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat', // 一个string类型的字符串 作为生成session的签名
    name: 'connect.sid', // 返回客户端的key的名称 默认没有，可以省略 默认值：connect.sid
    resave: false, // 强制保存session，默认是true，建议设置为false
    saveUninitialized: true, // 强制将未初始化的session存储  默认是true 建议设置成true
    cookie: {
        maxAge: 1000 * 30 * 60
    },

    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/student', //数据库地址
        touchAfter: 24 * 3600 // 可以不设置  在指定的时间内数据不会改变 除非会话数据上更改了某些内容
    })

    /**
     * cookie  true
     * 和cookie一样 也可以添加内容 maxAge: 10000 过期时间 浏览器关闭会销毁 时间到了也会销毁
     */

    //rolling: true // 在每次请求时强制重新设置cookie，重置cookie过期时间 只要用户浏览页面，10000没有操作的话在过期


    // secure: true 只有在https 情况下可以访问
}));

app.get('/', (req, res) => { // 获取session
    if (req.session.userinfo) {
        res.send(`你好${req.session.userinfo}欢迎回来`);
    } else {
        res.send('未登录');
    }

});

app.get('/login', (req, res) => {
    req.session.userinfo = '张三'; // 设置session
    res.send('登陆成功');
});

app.get('/loginOut', (req, res) => { // 注销操作
    // 1. 设置过期时间为0
    // req.session.cookie.maxAge = 0;

    // 2.销毁方法
    req.session.destroy(err => {
        console.log(err);

    })
    res.send('退出登陆成功');
});


app.listen(3000, () => {
    console.log(`Server started on port`);
});