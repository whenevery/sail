var domain = require('domain');
module.exports = function(req , res , next){
    var d = domain.create();
    //监听domain的错误事件
    //测试环境下 res无法正常返回信息 send和render都不行
    d.on('error' , function (err) {
        useLog.log('domain error');
        useLog.log(req.url);
        useLog.log(err.stack || err);
        try{
            return res.sendErrorMessage('DOMAIN_ERROR_CODE','');
        }catch(e){

        }
        d.dispose();
    });

    d.add(req);
    d.add(res);
    d.run(next);
};

