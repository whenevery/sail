function mongoose (db){
    this.db = db;
}
function promise(promise , call){
    promise.then(function(a){
        if(call){
            call({
                code:useCodeEnum.SUCCESS[0],
                data:a
            });
        }
    }).catch(function(err){
        useLog.error(err);
        if(call){
            call({
                code:useCodeEnum.DB_ERROR_CODE[0],
                data:err
            } , err);
        }
    });
}
mongoose.prototype = {
    find:function(data,call,option,types){
        useLog.log('db find' , this.db.name);
        if(types){
            var execDb = this.db.find(data,option||{});
            if(types.sort)execDb = execDb.sort(types.sort);
            if(types.skip)execDb = execDb.skip((types.skip - 0)*(types.limit - 0) || 0);
            if(types.limit)execDb = execDb.limit((types.limit - 0) || 20);
            var pom = execDb.exec();
            promise(pom , call);
        }else{
            promise(this.db.find(data,option||{}),call);
        }
    },
    save:function(data,call){
        useLog.log('db save', this.db.name);
        var save = new this.db();
        data = data || {};
        for(var i in data){
            save[i] = data[i];
        }
        promise(save.save(),call);
    },
    findOne:function(data,call){
        useLog.log('db find one', this.db.name);
        promise(this.db.findOne(data),call);
    },
    del:function(data,call){
        useLog.log('db del', this.db.name);
        promise(this.db.remove(data),call);
    },
    update:function(where,data,call){
        useLog.log('db update', this.db.name);
        promise(this.db.update(where,{$set:data}) , call);
    },
    count:function(data,call){
        useLog.log('db count', this.db.name);
        promise(this.db.count(data) , call);
    },
    distinct:function(data,call){
        useLog.log('db distinct', this.db.name);
        promise(this.db.distinct(data) , call);
    },
    group:function(data,$where , call){
        useLog.log('db group', this.db.name);
        promise(this.db.collection.group(
            data,
            $where || {},
            {num:0},
            function(doc,prev){ prev.num++ },
            null,
            null,
            {}),call);
    },
    findAll:function(data,call,types){
        useLog.log('db find all', this.db.name);
        var _this = this;
        var limit = types.limit || 20;
        this.count(data , function(a){
            _this.find(data , function(b){
                call({
                    code:0,
                    data:{
                        content:b.data,
                        totalElements:a.data,
                        totalPages:Math.ceil(a.data / usePageSize)
                    }
                })
            },{},{
                sort:types.sort || {},
                limit:limit,
                skip:limit * (types.skip || 0)
            })
        })
    }
};
module.exports = mongoose;