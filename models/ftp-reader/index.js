var fs = require('fs');
var Jsftp = require("jsftp");
var path = require('path');
var config = require('own-config');

function makeOneDir(i,paths,ftp,call){
    try{
        var _path = paths[i];
        if(_path && _path != '/ftp'){
            ftp.raw.mkd(_path,function(e){
                if(e)useLog.error('make dir error:',e);
                if(i == paths.length - 1){
                    if(call)call();
                }else{
                    makeOneDir(++i,paths,ftp,call);
                }
            });
        }else{
            if(i == paths.length - 1){
                if(call)call();
            }else{
                makeOneDir(++i,paths,ftp,call);
            }
        }
    }catch(e){
        useLog.error('makeDir is error');
        useLog.error(e);
        call(e);
    }
}

//生成地址包含的各级目录 的数组
var makeDir = function(paths,ftp,call){
    paths = paths.split(/\/|\\/);
    var length = paths.length;
    var newPaths = [];
    for(var i=0;i<length - 1;i++){
        var __path = paths[i];
        if(i){
            newPaths[i] = newPaths[i-1] + '/' +__path;
        }else{
            newPaths[0] = __path;
        }
    }
    makeOneDir(0,newPaths,ftp,call);
};
function upload(file , options){
    if(!file || !file.size){
        if(options.done)options.done({message:'没有文件'});
        return;
    }
    var ftp = new Jsftp(config.get("ftpOptions"));
    var ftpPath = path.join(config.get('ftp_server_upload') || '' , options.path || '',makeFileName(file.path , options.filename));
    ftpPath = ftpPath.replace(/\\/g,'/');
    console.log('ftp upload is start : '+ ftpPath);
    makeDir(ftpPath,ftp,function(e){
        if(!e){
            console.log('read start');
            fs.readFile(file.path, function (err, data) {
                if(!err){
                    console.log('put start');
                    ftp.put(data , ftpPath , function (putError) {
                        console.log('ftp upload is :' + !putError + ',ftpPath:'+filepath );
                        options.done({code:!putError,ftpPath:ftpPath});
                    });
                }else{
                    options.done({e:err});
                }
            });
        }else{
            useLog.error('ftp upload error:' + e);
            options.done({e:e});
        }
    });
}
function download(res , options){
    var ftp = new Jsftp(config.get("ftpOptions"));
    var ftpPath = path.join(config.get('ftp_server_upload') || '' , options.path);
    //现在会生成一些垃圾文件 版本更新会清除 延后用代码清除
    var _filename = Date.now() + path.extname(ftpPath);
    var filename = path.join(config.get('ftp_server_upload') || ''  ,  _filename);
    ftpPath = ftpPath.replace(/\\/g,'/');
    console.log(filename);
    var WriteStream = fs.createWriteStream(filename , {flags:'a'});
    console.log('ftp download is start ',ftpPath);
    try{
        ftp.get(ftpPath,function(err,socket){
            if(socket){
                var count = 0;
                var isEnd = false,writeEnd = false;
                console.log('ftp socket start');
                socket.on('data',function(d){
                    count ++;
                    if(writeEnd)return;
                    console.log('WriteStream write start');
                    try{
                        if(WriteStream.write(d,function(){
                                console.log('WriteStream write end one');
                                //socket.resume();
                                count--;
                                if(!count && isEnd){
                                    socketEnd();
                                }
                            }) == false){
                            //socket.pause();
                        }
                    }catch(e){
                        useLog.error('ftp download error :'+e);
                        socketEnd();
                    }
                });
                function socketEnd(){
                    writeEnd = true;
                    WriteStream.end();
                    console.log('WriteStream write end all');
                    fs.readFile(filename,function(err,data){
                        if(data){
                            res.setHeader('Content-Type', 'application/octet-stream');
                            res.setHeader("Content-Disposition", "attachment; filename=" + _filename);
                            res.end(data);
                        }else{
                            useLog.error('读取文件失败');
                            res.useSend('读取文件失败');
                        }
                    });
                }
                socket.on('close',function(d){
                    console.log('WriteStream socket close');
                    isEnd = true;
                    if(!count){
                        socketEnd();
                    }
                });
                WriteStream.on('drain',function(){
                    console.log('WriteStream drain');
                    socket.resume();
                });
                socket.resume();
            }
            else{
                useLog.error('没有连接到FTP 或者没有找到文件: ' + ftpPath);
                res.useSend('没有连接到FTP 或者没有找到文件');
            }
        });
    }catch(e){
        useLog.error('ftp下载路径异常: ' + ftpPath);
        res.useSend('ftp下载路径异常');
    }
}
function rename(options){
    var ftp = new Jsftp(config.get("ftpOptions"));
    var startUrl = path.join(config.get('ftp_server_upload') || '' , options.startUrl).replace(/\\/g,'/');
    var endUrl = path.join(config.get('ftp_server_upload') || '' , options.endUrl).replace(/\\/g,'/');
    console.log('start ftp rename.' + startUrl + ' ' + endUrl);
    makeDir(endUrl,ftp,function(){
        ftp.rename(startUrl,endUrl, function (err,data) {
            res.useSend({code:!err - 0,filename:endUrl});
        })
    });
}
function delFile(options){
    var ftp = new Jsftp(config.get("ftpOptions"));
    var filename = path.join(config.get('ftp_server_upload') || '' , options.path).replace(/\\/g,'/');
    console.log('ftp delete is start.' + filename);
    ftp.raw.dele(filename,function (err, data) {
        res.useSend({code:!err - 0,err:err});
    });
}
function makeFileName(_path , filename){
    if(filename){
        if(path.extname(filename) != path.extname(_path))filename+=path.extname(_path);
        return filename;
    }
    return path.basename(_path);
}
module.exports = {
    upload:upload,
    download:download,
    delFile:delFile,
    rename:rename
};