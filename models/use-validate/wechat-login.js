module.exports = function(req , res , next){
    var redirectUrl;
    if(req.session.unionid){
        return next();
    }
    req.session.callback = req.baseUrl + req.url;
    redirectUrl = '/wechat/login';
    if(req.xhr){
        return res.sendErrorMessage('HTTP_CODE_401',{
            redirectUrl:redirectUrl
        });
    }else{
        res.useRedirect(redirectUrl);
    }
};