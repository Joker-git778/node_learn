var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session'); // 保存用户信息

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // ejs模板引擎

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 静态资源文件

require('./plugins/db')(app);

app.use(session({
    secret: 'keybord cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    },
    rolling: true
}));

// 自定义中间件判断登录状态
app.use((req, res, next) => {
    const upload = req.url.substring(0, 6);


    if (req.url === '/' || req.url === '/doLogin') {
        next();
    } else {
        if (req.session.userinfo && req.session.userinfo.userName != '') {
            //ejs 设置全局变量
            app.locals['userinfo'] = req.session.userinfo.userName;
            next();
        } else {
            res.redirect('/');
        }
    }
});

app.use('/', require('./routes')); // 引入路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;