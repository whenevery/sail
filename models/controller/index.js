var fileReader = require('../file-reader');
var path = require('path');
var config = require('../use-config');
module.exports = function(app , call){
    //需要渠道的路由
    fileReader.getAllFileList(useCommon.unique(config.get('controller') || []).concat(['controller']).map(function(a){return __ROOT__ + useCommon.unShift(a);})  ,function(o){
        o.forEach(function(path){
            var router = require('' + path);
            var func = router.router || router;
            if(typeof func == 'function')app.use(router.__path || '/',func);
        });
        if(call)call();
    });

};