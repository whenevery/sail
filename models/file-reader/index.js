var fs = require('fs');
var path = require('path');
var config = require('../use-config');
function getFileList(_path , done){
    var rt = [];
    var count = 0;
    function checkPath(_path){
        count++;
        fs.readdir(_path,function(err, files){
            count--;
            if(err){
                useLog.warn('读取文件列表异常：');
                useLog.warn(err);
            }else{
                files.forEach(function(item) {
                    var tmpPath = path.join(_path , '' + item)  ;
                    count++;
                    fs.stat(tmpPath, function(err1, stats) {
                        count--;
                        if (err1) {
                            useLog.warn('获取地址信息异常：');
                            useLog.warn(err1);
                        } else {
                            if (stats.isDirectory()) {
                                checkPath(tmpPath);
                            } else {
                                rt.push(tmpPath);
                            }
                        }
                        if(!count){
                            if(done)done(rt);
                        }
                    })

                });
            }
            if(!count){
                if(done)done(rt);
            }
        });
    }
    checkPath(_path+'');
}
function getAllFileList(list , done){
    var count = 0;
    var rt = [];
    list.forEach(function(a){
        count++;
        getFileList(a , function(o){
            rt = rt.concat(o);
            count -- ;
            if(!count){
                if(done)done(rt);
            }
        });
    });
}
function makeOneDir(i,paths,call){
    if(paths[i] && paths[i]!='/'){
        if(fs.existsSync(paths[i])){
            if(i === paths.length - 1){
                if(call){
                    call({code:1});
                }
            }
            else makeOneDir(++i,paths,call);
        }
        else {
            fs.mkdir(paths[i],function(e){
                if(e){
                    useLog.warn(e);
                }
                if(i === paths.length - 1){
                    if(call){
                        call({code:1});
                    }
                }else{
                    makeOneDir(++i,paths,call);
                }
            });
        }
    }else{
        makeOneDir(++i,paths,call);
    }
}
function makeDir(paths,call){
    paths = paths.split(/\/|\\/);
    var length = paths.length;
    var newPaths = [];
    for(var i=0;i<length - 1;i++){
        var __path = paths[i];
        if(i){
            newPaths[i] = newPaths[i-1] + '/' +__path;
        }else{
            newPaths[0] = paths[0];
        }
    }
    makeOneDir(0,newPaths,call);
}
function upload(file , options){
    if(!Array.isArray(file))file = [file];
    var count = 0;
    var rt = [];
    var _done = function(file){
        count --;
        rt.push(file);
        if(!count)options.done({code:1,data:rt,message:'操作成功'});
    };
    var filenames = options.filename;
    if(!Array.isArray(filenames))filenames = [filenames];
    file.forEach(function(o , i){
        var filename = filenames[i] || (filenames[0] + i);
        count ++;
        if(!path.extname(filename)){
            filename +=  options.extname || path.extname(options.path)
        }
        rename(o,{
            path:options.path,
            filename:filename,
            done:_done
        });
    });
}
//生成文件名称
function makeFileName(_path , filename , extname){
    if(filename){
        if(!path.extname(filename))filename += extname || path.extname(_path);
        return filename;
    }
    return path.basename(_path);
}
function checkFile(file){
    if(!file || !file.size){
        throw 'file is null';
    }
    if(file.size > 10 * 1024 * 1024){
        delFile(file.path , null , 1);
        throw 'file is too long';
    }
}
var file_server_upload;
module.exports = {
    getFileList:getFileList,
    getAllFileList:getAllFileList,
    upload:upload,
    makeDir:makeDir,
    init:function(){
        file_server_upload = path.join(__ROOT__ , (config.get('file_server_upload') || ''));
    }
};