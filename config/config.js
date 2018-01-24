module.exports = {
    port:3333,
    hostname:'192.168.1.119',
    h5Api:'http://127.0.0.1:3002',
    apiUrl:'http://192.168.1.122:8012',
    // apiUrl:'http://192.168.1.117:8012',
    seatUrl:'http://192.168.1.119:3001',
    wechatLoginUrl:'http://47.100.20.78:3002/wechat/entrance/test?port=3003&host=192.168.1.119',
    wechatJssdkUrl:'http://47.100.20.78:3002/wechat/jssdk/test',
    "log4js":{
        "customBaseDir" :"/logs/",
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

