module.exports = function(err , req , res , next){
    useLog.log('error');
    useLog.log(req.url);
    useLog.log(err.stack || err);
    res.sendErrorMessage('FAIL' , err.stack || err);
};

