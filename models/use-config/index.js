var fs = require('fs');
/*
*
* */
module.exports = {
    start:function(app){
        try{
            var env = process.env.NODE_ENV;
            var configData = require(__ROOT__ + '/config/config');
            try{
                var envData = require(__ROOT__ + '/config/config-' + env);
                console.log(envData);
                configData = useCommon.extendMore(configData,envData);
            }catch(e){
            }
            this.configData = configData;
        }catch(e){
            console.log(e);
        }
    },
    get:function (key){
        return this.configData[key] || null;
    },
    getData:function (key){
        return this.configData;
    }
};