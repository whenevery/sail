var express = require('express');
var router = express.Router();
var md5 = require('md5');
router.get('/log', function(req, res, next) {
    useLog.log('window error');
    useLog.log(req.query);
    res.status(204).end();
});
router.get('/view', useValidate.hasLogin, function(req, res, next) {
    res.useRender(req.query.view);
});
exports.router = router;

exports.__path = '/common';