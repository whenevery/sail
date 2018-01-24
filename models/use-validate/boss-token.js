var md5 = require('md5');
module.exports = function(req , res , next){
    var timestamp = req.headers.bosstimestamp;
    if(md5('qying88' + timestamp) == req.headers.bosstoken){
        return next();
    }
    return res.sendErrorMessage('HTTP_CODE_407','');
};