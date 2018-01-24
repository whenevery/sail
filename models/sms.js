var md5 = require('md5');
var alidayu = require('alidayu-node');
function sms(){}
sms.send = function(options){
    useLog.log(options);
    var app = new alidayu(useConfig.get('sms').app_key, useConfig.get('sms').app_secret);
    app.smsSend({
        sms_free_sign_name: useConfig.get('sms').sms_free_sign_name, //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
        sms_param: JSON.stringify({"code": options.code}),//短信变量，对应短信模板里面的变量
        rec_num: options.phone, //接收短信的手机号
        sms_template_code: useConfig.get('sms').sms_template_code[options.type] //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
    } , function(err , data){
        if(options.done)options.done(err , data);
    });
};
sms.sign = function(data){
    var keys = Object.keys(data);
    keys.sort(function(a , b){
        var ai,bi;
        for(var i=0;;i++){
            if(ai=a.charAt(i)){
                if(bi=b.charAt(i)){
                    if(ai == bi)continue;
                    return ai.charCodeAt() - bi.charCodeAt();
                }else{
                    return 1;
                }
            }else{
                return -1;
            }
        }
    });
    var str = '';
    keys.forEach(function(o , i){
        if(data[o]){
            str += o  + (data[o]);
        }
    });
    return str;
};
module.exports = sms;