var helper = {};

var log4js = require('log4js');
var fs = require("fs");
var path = require("path");

// 加载配置文件
var objConfig = useConfig.get('log4js');
objConfig.customBaseDir = path.join(__ROOT__ , objConfig.customBaseDir);
var isConsole = objConfig.allConsole;
function isAbsoluteDir(path){
    if(path == null)
        return false;
    var len = path.length;

    var isWindows = process.platform === 'win32';
    if(isWindows){
        if(len <= 1)
            return false;
        return path[1] == ":";
    }else{
        if(len <= 0)
            return false;
        return path[0] == "/";
    }
}
function checkAndCreateDir(dir){
    var dirPaths = dir.split(/\/|\\/);
    var pathArrs = [];
    for(var i=1,len=dirPaths.length;i<=len;i++){
        pathArrs.push(dirPaths.slice(0 , i).join('/'));
    }
    checkAllPath(pathArrs);
}
function checkAllPath(pathArrs , index){
    if(pathArrs.length == index)return ;
    index = index || 0;
    checkAndCreateDirList(pathArrs[index] , function(){
        checkAllPath(pathArrs , ++index);
    });
}
function checkAndCreateDirList(dir,done){
    if(dir && !fs.existsSync(dir)){
        fs.mkdirSync(dir,done);
    }else{
        done();
    }
}

// 检查配置文件所需的目录是否存在，不存在时创建
if(objConfig.appenders){
    var baseDir = objConfig["customBaseDir"];
    var defaultAtt = objConfig["customDefaultAtt"];

    for(var i= 0, j=objConfig.appenders.length; i<j; i++){
        var item = objConfig.appenders[i];
        if(item["type"] == "console")
            continue;

        if(defaultAtt != null){
            for(var att in defaultAtt){
                if(item[att] == null)
                    item[att] = defaultAtt[att];
            }
        }
        if(baseDir != null){
            if(item["filename"] == null)
                item["filename"] = baseDir;
            else
                item["filename"] = path.join(baseDir , item["filename"]);
        }
        var fileName = item["filename"];
        if(fileName == null)
            continue;
        var pattern = item["pattern"];
        if(pattern != null){
            fileName = path.join(fileName , pattern);
        }
        var category = item["category"];
        if(!isAbsoluteDir(fileName))//path.isAbsolute(fileName))
            throw new Error("配置节" + category + "的路径不是绝对路径:" + fileName);
        var dir = path.dirname(fileName);
        checkAndCreateDir(dir);
    }
}

// 目录创建完毕，才加载配置，不然会出异常
log4js.configure(objConfig);

var logDebug = log4js.getLogger('logDebug');
var logInfo = log4js.getLogger('logInfo');
var logWarn = log4js.getLogger('logWarn');
var logErr = log4js.getLogger('logErr');

helper.debug = function(msg){
    if(msg == null)
        msg = "";
    logDebug.debug(msg);
    if(isConsole)
        console.log(msg);
};

helper.info = helper.log = function(msg){
    if(msg == null)
        msg = "";
    logInfo.info(msg);
    if(isConsole)
        console.log(msg);
};

helper.warn = function(msg){
    if(msg == null)
        msg = "";
    logWarn.warn(msg);
    if(isConsole)
        console.log(msg);
};

helper.error = function(msg, exp){
    if(msg == null)
        msg = "";
    if(exp != null)
        msg += "\r\n" + exp;
    logErr.error(msg);
    if(isConsole)
        console.error(msg);
};

module.exports = helper;

