module.exports = function(req , res , next){
    res.sendErrorMessage = function(errorCode , message){
        errorCode = errorCode || 'FAIL';
        var code = useCodeEnum[errorCode][0];
        if(code < 1000 && code > 100){
            res.status(code);
        }
        var sendData = {
            code:code,
            message:useCodeEnum[errorCode][1]
        };
        if(message){
            if(typeof message === 'string'){
                sendData.message = message;
            }else{
                useCommon.extendMore(sendData , message);
            }
        }
        if(req.__xhr){
            res.useSend(sendData);
        }else{
            res.sendErrorHtml(sendData.message);
        }
    };
    res.statusErrorCode = function(errorCode){
        res.status(useCodeEnum[errorCode][0]).end();
    };
    res.sendErrorHtml = function(message){
        res.useRender('error' , {message:message || '系统繁忙'});
    };
    res.sendSuccess = function(data , message){
        res.useSend({
            code:useCodeEnum.SUCCESS[0],
            message:message || '操作成功',
            data:data
        });
    };
    res.useRender = function(path , data){
        data = data || {};
        data.resJson = data.resJson || {};
        data.resJson.apiImgUrl = useConfig.get('apiImgUrl');
        data.resJson.qrcodeApi = useConfig.get('qrcodeApi');
        data.resJson.hostname = useConfig.get('hostname');
        data.resJson.usePageSize = usePageSize;
        data.__menuCode = req.__menuCode || '';
        data.__permissionCode = req.__permissionCode || '';
        data.sessionJson = req.session;
        data.message = data.message || '系统繁忙 请稍后再试';
        data.__CSRF = req.session.__CSRF || '';
        data.query = req.query;
        data.env = process.env.NODE_ENV || '';
        data.seatUrl = useConfig.get('seatUrl');
        data.merchant_channel = req.session.merchantUserInfo && req.session.merchantUserInfo.supplierId || '';
        res.setHeader('X-Frame-Options','SAMEORIGIN');
        res.render('page/' + path , data);
    };
    res.useSend = function(body){
        body.message = body.message || (body.code == 0?'操作成功':'操作失败');
        res.send(body.clearNull());
    };
    res.useRedirect = function(path){
        res.redirect(path);
    };
    next();
};