//admin 1234yqs_admin
module.exports = {
    h5Api:'http://47.100.20.78:3002',
    seatUrl:'http://47.100.20.78:3001',
    wechatLoginUrl:'http://47.100.20.78:3002/wechat/entrance/test?port=3003&host=47.100.20.78',
    wechatJssdkUrl:'http://47.100.20.78:3002/wechat/jssdk/test',
    "log4js":{
        "customBaseDir" :"../logs/merchant-pc/",
        "customDefaultAtt" :{
            "type": "dateFile",
            "absolute": true,
            "alwaysIncludePattern": true
        },
        "appenders": [
            {"type": "console", "category": "console"},
            {"pattern": "debug/yyyyMMdd.log", "category": "logDebug"},
            {"pattern": "info/yyyyMMdd.log", "category": "logInfo"},
            {"pattern": "warn/yyyyMMdd.log", "category": "logWarn"},
            {"pattern": "err/yyyyMMdd.log", "category": "logErr"}
        ],
        "replaceConsole": true,
        "allConsole":true,
        "levels":{ "logDebug": "DEBUG", "logInfo": "DEBUG", "logWarn": "DEBUG", "logErr": "DEBUG"}
    }
};

