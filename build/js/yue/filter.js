(function(){
    var filter = {

    };
    Yue.filter = function(type , func){
        filter[type] = func;
    };
    Yue.filter.handler = function(value , key){
        if(Array.isArray(key))return handlerKeys(value , key);
        key  = key.trim();
        if(filter[key])return filter[key](value);
        return value;
    };
    function handlerKeys(value , keys){
        var key = keys.shift();
        while (key){
            value = Yue.filter.handler(value , key);
            key = keys.shift();
        }
        return value;
    }
    Yue.filter.check = function(val){
        if(/\s\|\s/.test(val)){
            return val.split(/\s\|\s/).every(function(a , i){
                if(i){
                    if(filter[a.trim()])return true;
                }else{
                    if(a.trim())return true;
                }
                return false;
            })
        }
        return false;
    };
})();