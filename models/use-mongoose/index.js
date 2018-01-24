var mongooseDb = require('./mongoose-db.js');
var mongooseData = require('./data.js');
var __mongoose = {},__mongooseDB = {};
var mongooseConnection = {};
module.exports = function(dbname){
  var __ = {
    start:function(dbname , call){
      var dbConfig = useConfig.get('dbOptions');
      if(typeof dbname == 'function'){
        call = dbname;
        dbname = '';
      }
      dbname = dbname || dbConfig.dbname || 'lottery';
      if(mongooseConnection[dbname])return this.mongoose = mongooseConnection[dbname];
      var mongoose = require('mongoose');
      var uri = 'mongodb://' + (dbConfig.host || 'localhost') + useCommon.unShift(dbConfig.port,':');
      mongoose.connect(uri + useCommon.unShift(dbname), function(err,data) {
        console.log('mongodb connect');
        if(call)call(err);
      });
      mongoose.connection.on('error', function (err) {
        if (err)useLog.log('[mongodb连接异常] - ' + err);
      });
      this.mongoose = mongooseConnection[dbname] = mongoose;
    },
    create:function(tablename , options){
      if(!tablename){
        useLog.log("tablename is null");
        return null;
      }
      if(!mongooseData[tablename] && !options){
        useLog.log("Schema data is null --" + tablename);
        return null;
      }
      if(__mongooseDB[tablename])return __mongooseDB[tablename];
      var db = __mongoose[tablename] = __mongoose[tablename] || this.mongoose.model(tablename , new this.mongoose.Schema(mongooseData[tablename] || options));
      db.name = tablename;
      return __mongooseDB[tablename] = new mongooseDb(db);
    },
    createData:function(tablename , data , options){
        var rt = {};
      if(!tablename){
        useLog.log("tablename is null");
        return rt;
      }
      if(!mongooseData[tablename] && !options){
        useLog.log("Schema data is null");
        return rt;
      }
      options = options || mongooseData[tablename];
      for(var key in options){
        if(data[key]!=null)rt[key] = data[key];
      }
      return rt;
    },
    createQuery:function(tablename , data , options){
        var rt = {};
      if(!tablename){
        useLog.log("tablename is null");
        return rt;
      }
      if(!mongooseData[tablename] && !options){
        useLog.log("Schema data is null");
        return rt;
      }
      options = options || mongooseData[tablename];
      for(var key in options){
        if(data[key]!=null && data[key] !== '')rt[key] = data[key];
      }
      return rt;
    }
  };
  __.start(dbname);
  return __;
};
