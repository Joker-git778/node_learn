const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs'); //引入bcryptjs  加密

const session = require("express-session");
const svgCaptcha = require('svg-captcha'); // 图片验证码

const loginDB = require('../model/loginDB');

//  注册接口
router.post('/register', async(req, res, next) => {
    const salt = bcrypt.genSaltSync(10); //设置加密等级，如果不设置默认为10，最高为10
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        let userName = req.body.userName;
        let password = req.body.passWord;
        const user = await loginDB.findOne({ userName });
        if (user) {
            return res.status(422).send({
                "msg": "用户名已存在"
            });
        }
        // 密码加密
        var passWord = bcrypt.hashSync(password, salt); //将获取到的密码进行加密，得到密文hash

        const reg = await loginDB.create({ // 存储用户名和加密的密码
            userName,
            passWord
        });

        if (reg) {
            return res.status(200).send({
                "msg": "注册成功"
            });
        } else {
            return res.status(422).send({
                "msg": "注册成功"
            });
        }
    } catch (error) {
        next(error)
    }

});

// 登录接口
router.post('/login', async(req, res) => {
    // console.log(req);

    res.setHeader('Access-Control-Allow-Origin', '*');
    const user = await loginDB.findOne({ // 根据用户名查询到用户
        userName: req.body.userName
    });
    if (!user) { // 读取不到
        return res.status(422).send({
            "code": 422,
            "msg": "该用户不存在"
        });
    }
    const passWord = bcrypt.compareSync( // 进行密码比较
        req.body.passWord, // 明文密码
        user.passWord // 读取的密文密码
    );
    if (!passWord) { // 密码错误
        return res.status(422).send({
            "code": 422,
            "msg": "密码错误"
        });
    };
    res.status(200).send({
        "msg": "登录成功"
    });
});

//注销账号
router.post('/logout', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const user = await loginDB.findOne({ // 根据用户名查询到用户
        userName: req.body.userName
    });
    if (user) {
        const passWord = await bcrypt.compareSync( // 进行密码比较
            req.body.passWord, // 明文密码
            user.passWord // 读取的密文密码
        );
        if (passWord) {
            loginDB.findById(user._id, (err, doc) => {
                doc.remove((err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.status(200).send({
                            "code": 200,
                            "msg": "注销成功"
                        });
                    }
                })
            })
        } else {
            return res.status(200).send({
                "code": 200,
                "msg": "密码错误"
            });
        }
    } else {
        return res.status(200).send({
            "code": 200,
            "msg": "该用户不存在"
        });
    }
});

//图片验证码

/* 创建session中间件 */
router.use(session({
    name: 'testapp', //..这里的name指的是cookie的name，默认cookie的name是：connect.sid
    secret: 'keyword cat', //  加密key 可以随意书写
    cookie: { maxAge: 60000 }, //  两次请求的时间差，即超过这个时间再去访问session会失效
    resave: false,
    saveUninitialized: true
}))

router.get('/getCode', function(req, res, next) {
    var codeConfig = {
        size: 5, //  验证码长度
        ignoreChars: 'O01i', //..验证码字符中排除O01i
        noise: 2, //  干扰线条数量
        height: 44
    }

    var captcha = svgCaptcha.create(codeConfig)
        //console.log('captcha=', captcha)
    let x = captcha.text.toLowerCase()
    req.session['captcha'] = captcha.text.toLowerCase() //  存session用于验证接口获取文字码

    var codeData = {
        img: captcha.data
    }
    res.send(codeData)

})

// 返回用户信息
router.get('/login', async(req, res, next) => {
    console.log(req.session['captcha'])
    await res.send(req.body);
});

module.exports = router;
0