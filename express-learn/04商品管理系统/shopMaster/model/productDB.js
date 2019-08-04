const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    fee: {
        type: Number
    },
    pic: {
        type: String
    }
});

const collectionName = 'product'; // 查询数据不会为空

const product = mongoose.model('product', schema, collectionName);

module.exports = product;