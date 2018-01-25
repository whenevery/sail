window.Yue = {};
Yue.config = function(a , b){
    if(typeof a === 'object'){
        for(var key in a){
            Yue.config(key , a[key]);
        }
    }else{
        if(!a || !b || typeof b !== 'object')return false;
        if(Yue[a]){
            if(Yue[a].config){
                Yue[a].config(b);
            }else{
                if(Yue[a].options){
                    Object.assign(Yue[a].options,b);
                }else{
                    Yue[a].options = b;
                }
            }
        }
    }
};
Yue.readyQueue = [];
