module.exports = function(type){
    return function (req , res , next) {
        if(req.session.userInfo.type == type){
            return next();
        }
        return res.sendErrorMessage('HTTP_CODE_408','');
    }
};