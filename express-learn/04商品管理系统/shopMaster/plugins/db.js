module.exports = app => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/shopMaster', {
        useNewUrlParser: true,
        useCreateIndex: true
    });

    // 监听各种状态
    let db = mongoose.connection;
    db.on('error', () => {
        console.log('连接失败')
    });

    db.once('open', function() {
        console.log('连接成功')
    });

    // db.once('close', function() {
    //     console.log('数据库断开成功')
    // });
}