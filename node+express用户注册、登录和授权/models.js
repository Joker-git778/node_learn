const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express-auth', { // 关联数据库
    useCreateIndex: true,
    useNewUrlParser: true
})

const UserSchema = new mongoose.Schema({ //分割结构
    username: {
        type: String,
        unique: true //字段是否唯一  用户名唯一
    },
    password: {
        type: String,
        set(val) {
            return require('bcrypt').hashSync(val, 10) //使用同步的方法进行散列(加密)
        }
    },
})

const User = mongoose.model('User', UserSchema) // 定义一个模型

// User.db.dropCollection('users') //删除结合

module.exports = { User }