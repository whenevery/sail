var express = require('express');
var router = express.Router();
router.get('/get',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:req.query.url,
        done:function(d){
            res.useSend(d);
        }
    })
});
router.get('/yue',useValidate.hasLogin, function(req, res, next) {
    res.render('yue');
});
exports.router = router;
exports.__path = '/test';