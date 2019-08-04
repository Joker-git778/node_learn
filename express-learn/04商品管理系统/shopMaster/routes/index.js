const express = require("express");
const router = express.Router();
//相当于后台的路由，所有的后台处理都需要从这里经过

const doLogin = require("./sub/doLogin");
const product = require("./sub/product");

router.use("/", doLogin);
router.use("/product", product);


module.exports = router;