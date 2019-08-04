const mongoose = require('mongoose'); // 模型文件

const schema = new mongoose.Schema({
    name: { type: String }
})

const Category = mongoose.model('Category', schema)

module.exports = Category