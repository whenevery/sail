var crypto = require('crypto');
var uuid = require('uuid');
var config = {
    SECRET:'sessionsecret',
    session_key:'lottey',
    maxAge:30 * 60 ,//cookie缓存时间
    expires:30 * 60 * 1000 ,//redis缓存时间
    path:"/",
    httpOnly:true
};
var sign = function (val, secret) {
    return val + '.' + crypto
            .createHmac('sha1', secret || config.SECRET)
            .update(val + '')
            .digest('base64')
            .replace(/[\/\+=]/g, '');
};
var serialize = function (name, val, opt) {
    var pairs = [name + '=' + encodeURIComponent(val)];
    opt = opt || {};
    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
    if (opt.domain) pairs.push('Domain=' + opt.domain);
    if (opt.path) pairs.push('Path=' + opt.path);
    if (opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');
    return pairs.join('; ');
};
var writeHead = function (req , res) {
    var cookies = res.getHeader('Set-Cookie');
    cookies = cookies || [];
    var session = serialize(config.session_key, req.session.sessionId , config);
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
    res.setHeader('Set-Cookie', cookies);
    res.setHeader('expires', 0);
    res.setHeader('max-age', 0);
    res.setHeader('cache-control', 'no-store,no-cache');
    res.setHeader('pragma', 'no-cache');
    res.setHeader('X-Frame-Options','SAMEORIGIN');
};
var sessionData = {};
function session(sessionId){
    this.sessionId = sessionId;
    this.__CSRF = uuid.v1();
    this.cookie = {
        expires:config.expires + Date.now()
    };
}
setInterval(function(){
    var nowTime = Date.now();
    for(var key in sessionData){
        var row = sessionData[key];
        if(!row.cookie || row.cookie.expires < nowTime){
            delete sessionData[row.sessionId];
        }
    }
}, 60 * 1000);
Object.defineProperties(session.prototype , {
    setNewTime:{
        enumerable: false,
        value:function(time){
            this.cookie.expires = (time || config.expires) + Date.now();
        }
    },
    del:{
        enumerable: false,
        value:function(time){
            delete sessionData[this.sessionId];
        }
    },
    getData:{
        enumerable: false,
        value:function(time){
            var rt = {};
            for(var key in this){
                if(key !== 'cookie' && key !== 'timer'){
                    rt[key] = this[key];
                }
            }
            return rt;
        }
    }
});
exports = module.exports = function (options) {
    options = options || {};
    for(var i in options){
        if(options[i])config[i] = options[i];
    }
    return function (req, res, next) {
        var sessionId = req.query.sessionId || req.body.sessionId || req.headers.sessionid || useCommon.getCookieData(req.headers.cookie)[config.session_key];
        if(!sessionId){
            sessionId = sign(uuid.v1());
        }
        var data = sessionData[sessionId];
        if(data){
            req.session = data;
            data.setNewTime();
            writeHead(req , res);
            return next();
        }else{
            sessionData[sessionId] = req.session = new session(sessionId);
            writeHead(req , res);
            return next();
        }
    };
};
