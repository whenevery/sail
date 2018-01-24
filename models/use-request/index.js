var request =require('request');
module.exports = {
    send:function(req, res , options ){
        var sendData = useCommon.extend({} , options.data);
        var method = options.method || 'GET';
        var headers = options.headers || {};
        if(sendData){
            sendData.remoteAddress = req.remoteAddress;
            sendData = sendData.clearEmpty();
        }
        var __ = {
            url:options.url,
            method:method.toUpperCase(),
            headers:headers
        };
        headers.tokenInfo = options.tokenInfo || req.session.merchantUserInfo&&[req.session.merchantUserInfo.tokenModel.userId , req.session.merchantUserInfo.tokenModel.token].join('_') || '';
        if(method.toUpperCase() === 'POST' && !options.notBody){
                __.body = JSON.stringify(sendData);
                __.headers["content-type"] =  "application/json";
        }else{
            var urlStr = useCommon.serialize(sendData);
            if(urlStr)__.url +=(__.url.indexOf('?')==-1?'?':'&') + urlStr;
        }
        console.log('request start : ');
        console.log(__);
        request(__ , function(err , response , body){
            try{
                body = JSON.parse(body);
            }catch(e){
            }
            if(typeof body === 'string'){
                body = {
                    data:body,
                    message:'系统繁忙'
                }
            }
            if(body && body.result && !body.data){
                body.data = body.result;
                delete body.result;
            }
            console.log(body);
            if(body){
                body.baseCode = body.code;
                if(body.code === '10002'){
                    req.session.userInfo = null;
                    req.session.merchantUserInfo = null;
                    return res.status(401).end();
                }
                if(body.code === '10000')body.code = 0;
            }
            options.done(body || {code:1,msg:'系统异常'});
        });
    },
    request : request
};