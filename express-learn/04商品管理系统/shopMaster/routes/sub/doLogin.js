const express = require('express');
const router = express.Router();
const session = require('express-session'); // 保存用户信息
const fs = require('fs');

const bcrypt = require('bcrypt-nodejs'); // 加密

const loginDB = require('../../model/loginDB');

// 登录界面
router.get('/', (req, res) => {
    // res.send('登录');
    res.render('login');
});

//登录
router.post('/doLogin', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.body.userName === '' || req.body.passWord === '') { // 判断是否为空
        return res.redirect('/');
    };
    const user = await loginDB.findOne({ // 根据用户名查询到用户
        userName: req.body.userName
    });
    if (!user) { // 读取不到  注册
        // 密码加密
        const passWord = bcrypt.hashSync(req.body.passWord);
        loginDB.create({
            userName: req.body.userName,
            passWord
        });
    } else { // 登录
        const passWord = bcrypt.compareSync(req.body.passWord, user.passWord); // 密码比较
        if (!passWord) {
            return res.send(`<script>alert('密码错误');window.location.href='/';</script>`);
        }
    };
    req.session.userinfo = req.body; // session保存用户信息
    res.redirect('/product');
});

//注销
router.get('/loginOut', (req, res) => {
    //销毁session
    req.session.destroy((err) => {
        if (err) {
            throw err;
        } else {
            res.redirect('/');
        }
    })
});

module.exports = router;