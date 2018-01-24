//验证图片验证码
module.exports = function (req , res , next){
    var imgCode = req.body.imgCode || req.query.imgCode;
    if(!imgCode || req.session.imgCode != imgCode){
        useLog.log(req.cookies);
        useLog.log('img code error');
        useLog.log(req.session.imgCode + '  ' +  imgCode);
        delete req.session.imgCode;
        return res.sendErrorMessage('IMG_CODE_FAIL','');
    }else{
        delete req.session.imgCode;
        next();
    }
};