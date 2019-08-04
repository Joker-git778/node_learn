var express = require('express');
var router = express.Router();

const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//读取本地数据
router.get('/category', (req, res) => {
    fs.readFile('./data/catgory.json', (err, data) => {
        if (err) {
            return console.error(err);
        }
        res.status(200).send(data);
    })
});

module.exports = router;