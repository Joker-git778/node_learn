const { User } = require('./models'); //引入 


const express = require('express');
const jwt = require('jsonwebtoken');

const SECRET = 'sfghdghgdhgdwhajvc';

const app = express();
app.use(express.json());
//使用中间件允许express接受json数据不然获取不到req.body

app.get('/api/users', async(req, res) => {
    const users = await User.find(); //查询所有用户
    res.send(users);
});

//注册
app.post('/api/register', async(req, res) => {
    // console.log(req.body);

    const user = await User.create({ //创建 添加数据
        username: req.body.username,
        password: req.body.password
    })
    res.send(user);
});

app.post('/api/login', async(req, res) => { //登录
    // console.log(req.body);
    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: '用户名不存在'
        }); //422表示提交数据有问题  或者直接throw err;
    }
    const isPasswordValue = require('bcrypt').compareSync( // 比较方法（同步） 
        req.body.password, //密码的明文
        user.password // 密文的密码
    )
    if (!isPasswordValue) {
        return res.status(422).send({
            message: '密码错误'
        }); //422表示提交数据有问题  或者直接throw err;
    }
    // 生成token jsonwebtoken包
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({
        id: String(user._id),
        /*！注意： 只传唯一性质的 */
    }, SECRET);
    /**
     * 参数：
     *  1.token
     *  2.秘钥 唯一的 写在全局 此处简写 写在特殊文件里
     */

    res.send({
        user,
        token // 前端存储
    });
});

//自定义中间件
const auth = async(req, res, next) => {
    const raw = String(req.headers.authorization).split(' ').pop();
    const { id } = jwt.verify(raw, SECRET); // 解密  
    req.user = await User.findById(id); // 可以增加判断操作 获取不到...就不执行next 报错
    next(); //执行后续操作
}

app.get('/api/profile', auth, async(req, res) => { // 参数也可以添加next 表明执行后续操作 可以在{}后继续添加方法
    //console.log(String(req.headers.authorization).split(' ').pop()); //获取请求头

    // 中间件原来位置
    // const raw = String(req.headers.authorization).split(' ').pop();
    // const { id } = jwt.verify(raw, SECRET); // 解密  
    // const user = await User.findById(id);
    // res.send(user);

    res.send(req.user);
});

// app.get('/api/orders', auth, (req, res) => {
//     const orders = await Order.find().where({
//         user: req.user
//     });
//     res.send(orders);
// });

app.listen(3001, () => {
    console.log(`http://localhot:3001`);
});