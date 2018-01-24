var express = require('express');
var router = express.Router();
router.get('/view', function(req, res, next) {
    res.render(req.query.view);
});
router.get('/html', function(req, res, next) {
    req.pipe(useRequest.request(req.query.html)).pipe(res);
});
exports.router = router;
exports.__path = '/yue';