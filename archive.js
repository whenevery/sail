var path = require('path');
var fs = require('fs');
var archiver = require('archiver');
var moment = require("moment");
var package = require('./package.json');

// 构建名称
var archiveFilePath = path.join(__dirname, package.name + '-' + package.version + '-' + moment().format("YYYYMMDDHHmmss") + '.zip');
	// 设置打包路径
	var output = fs.createWriteStream(archiveFilePath);
	// 打包成zip
	var zipArchive = archiver.create('zip', {});
	// 监听异常事件
	zipArchive.on('error', function(err){
		throw err;
	});
	zipArchive.pipe(output);

	//设置打包文件
	var zipList=['app.js','package.json', 'config/**', 'controller/**', 'copperation/**', 'models/**', 'node_modules/**',  'public/**', 'views/**'];
	//打包运行库
	for(var key in package.dependencies){
		//zipList.push('node_modules/'+key+'/**');
	}
	zipArchive.bulk([
		{ src: zipList}
	]);
	zipArchive.finalize();
	console.log('打包路径：%s', archiveFilePath);
