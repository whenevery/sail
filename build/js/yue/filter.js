(function(){
    var filter = {

    };
    Yue.filter = function(type , func){
        filter[type] = func;
    };
    Yue.filter.handler = function(key , value){
        if(filter[key])return filter[key](value);
        return value;
    };
})();