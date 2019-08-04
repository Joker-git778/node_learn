module.exports = app => { // 小技巧 index.js引入可以直接用 固定写法 必须是函数
    const express = require('express');
    const router = express.Router(); // 子路由
    const Category = require('../../models/Category')
    router.post('/categories', async(req, res) => { // 添加列表
        const model = await Category.create(req.body);
        res.send(model);
    });

    router.put('/categories/:id', async(req, res) => { // 修改列表名
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model);
    });

    router.delete('/categories/:id', async(req, res) => { // 删除列表
        await Category.findByIdAndDelete(req.params.id, req.body) // 不需要返回值
        res.send({
            success: true
        });
    });

    router.get('/categories', async(req, res) => { // 修改列表数据
        const items = await Category.find().limit(10)
        res.send(items);
    });

    router.get('/categories/:id', async(req, res) => { // 列表数据
        const model = await Category.findById(req.params.id);
        // 包含映射到指定的路线“参数”属性的对象。
        // 例如，如果你有route/user/：name，那么“name”属性可作为req.params.name。
        // 该对象默认为{}。
        // 连接  https://www.cnblogs.com/jkingdom/p/8065202.html
        res.send(model);
    });

    app.use('/admin/api', router)
}