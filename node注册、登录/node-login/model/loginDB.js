const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userName: {
        type: String,
        // unique: true
    },
    passWord: {
        type: String
    }
});

const loginDB = mongoose.model('loginDB', schema);

module.exports = loginDB