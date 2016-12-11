var express = require('express');
var router = express.Router();
const crypto = require('crypto');

/* GET home page. */
router.get('/wechat/hello', function(req, res, next) {
  res.render('index', { title: 'Hello Wechat from Aliyun Ecs --> Express' });
});

const token = 'littlecarson';
router.get('/wechat/verify', function(req, res, next) {
    const { signature, timestamp, nonce, echostr } = req.query;
    if ( !signature || !timestamp || !nonce || !echostr ) {
        return res.send('invalid request!');
    }

    // 将 token, timestamp, nonce 三个参数进行字典排序
    const params = [token, timestamp, nonce];
    params.sort();

    // 将三个参数字符串拼接成一个字符串进行 sha1 加密
    const hash = crypto .createHash('sha1');
    const sign = hash.update(params.join('')).digest('hex');

    // 开发者获得加密后的字符串可与 signature 对比,标识请求来源于微信
    if (signature === sign) {
        res.send(echostr);
    } else {
        res.send('invalid sign');
    }

});



module.exports = router;
