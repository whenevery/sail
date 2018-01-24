module.exports = function(req , res , next){
    var redirectUrl;
    if(req.session.userInfo){
        if(req.session.userInfo.status === 0){
            redirectUrl = '/login/update';
            if(req.xhr){
                return res.sendErrorMessage('HTTP_CODE_402',{
                    redirectUrl:redirectUrl
                });
            }else{
                return res.useRedirect(redirectUrl);
            }
        }
        return next();
    }
    req.session.callback = req.baseUrl + req.url;
    redirectUrl = '/login';
    if(req.xhr){
        return res.sendErrorMessage('HTTP_CODE_401',{
            redirectUrl:redirectUrl
        });
    }else{
        res.useRedirect(redirectUrl);
    }
};