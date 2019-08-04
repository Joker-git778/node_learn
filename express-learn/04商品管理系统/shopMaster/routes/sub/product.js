const express = require('express');
const multer = require('multer'); // 文件上传
// multiparty
const fs = require("fs");
const path = require("path");
const router = express.Router();

const product = require('../../model/productDB');

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, './public/upload/');
    },
    filename: function(req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + ".gif");
    }
});

// 创建文件夹
// var createFolder = function(folder) {
//     try {
//         // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
//         // 如果文件路径不存在将会抛出错误"no such file or directory"
//         fs.accessSync(folder);
//     } catch (e) {
//         // 文件夹不存在，以同步的方式创建文件目录。
//         fs.mkdirSync(folder);
//     }
// };

// var uploadFolder = './public/upload/';
// createFolder(uploadFolder);

// 创建 multer 对象
var upload = multer({ storage: storage });


router.get('/', async(req, res, next) => {
    // res.send('product');
    const list = await product.find({});
    res.render('products/product', { title: '商品列表', list });
});

router.get('/productAdd', (req, res) => { // 增加商品
    // 显示增加商品页面
    res.render('productAdd', { title: '增加商品' });
    // res.send('增加商品');
});

// 获取表单提交的数据 以及post传过来的图片
router.post('/deProductAdd', upload.single('file'), async(req, res) => {
    var file = req.file;
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);
    // 接收文件成功后返回数据给前端
    const pic = file.path.replace(/\\/g, "/").substring(7); // 转化成路径
    await product.create({
        title: req.body.title,
        price: req.body.price,
        fee: req.body.fee,
        pic
    });
    res.send(`<script>alert('写入成功');window.location.href='/product/productAdd';</script>`);
});

router.get('/productEdit/:_id', async(req, res) => { // 编辑商品
    // res.send('编辑商品');
    // console.log(req.params)
    const editValue = await product.findById(req.params);
    res.render('productEdit', { title: '编辑商品', editValue });
});

router.post('/productEdit', upload.single('file'), (req, res) => {
    const pic = req.file.path.replace(/\\/g, "/").substring(7); // 转化成路径
    const id = req.body._id.replace(/(^\s*)|(\s*$)/g, ""); // 转换id
    product.findById(id, (err, dic) => {
        if (err) return console.log("id" + err);
        const path = `public/${dic.pic}`; // 编辑路径
        fs.unlink(path, (err) => { // 删除操作
            if (err) return console.log(err);
        });
        product.updateOne({ _id: id }, { // 更新操作
            title: req.body.title,
            price: req.body.price,
            fee: req.body.fee,
            pic
        }, (err, raw) => {
            if (err) return console.log(err);
            return res.redirect('/product');
        })
    });
});

router.get(`/productDelete/:_id`, async(req, res) => { // 删除商品
    const id = await product.findById(req.params._id);
    if (id) {
        const path = `public/${id.pic}`; // 编辑路径
        fs.unlink(path, async(err) => {
            if (err) console.log(err);
            const deleteId = await product.deleteOne(req.params);
            if (deleteId) res.redirect('/product');
        })
    }
});

module.exports = router;