var fs = require('fs');
var multer = require('multer');
var Path = require('path');
var fileRender = require('../file-reader');
var uuid = require('uuid');
var rootPath;
module.exports = {
    file:function(options){
        options = options || {};
        return multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    options.path = options.path || req.fileDate || '';
                    var path;
                    if(options.path){
                        if(options.path.indexOf('/') === 0){
                            path = options.path;
                        }else{
                            path = Path.join(rootPath , options.path);
                        }
                        fileRender.makeDir(Path.join(path, 'xx.xx'),function(){
                            cb(null, path);
                        });
                    }else{
                        cb(null, rootPath);
                    }

                },
                filename: function (req, file, cb) {
                    var filename = options.filename || file.originalname;
                    filename = uuid.v1() + (Path.extname(filename) || req.body.extname || Path.extname(file.originalname));
                    cb(null, filename);
                }
            })
        }).single(options.name || 'fileData');
    },
    getShowUrl:function(filename , path){
        return useConfig.get('showImgUrl') + (path || '') + '/' + filename;
    },
    init:function(){
        rootPath = Path.join(__ROOT__ , useConfig.get('uploadPath'));
        fileRender.makeDir(Path.join(rootPath , 'xx.xx'));
    }
};