(function(){
    var prop = Yue.prop = function (obj , key , func){
        if(!obj.prototype[key]){
            Object.defineProperty(obj.prototype , key , {
                get:function(){
                    return func
                },
            });
        }
    };
    Yue.defineProperty = function(data , key , originData , changeHandler ){
        Object.defineProperty(data , key , {
            get:originData.get || function(){
                return originData[key];
            },
            set:originData.set || function(v){
                if(originData[key]!==v){
                    originData[key] = v;
                    changeHandler();
                }
            }
        })
    };
    Yue.definePropertyGet = function(data , key ,originData){
        Object.defineProperty(data , key , {
            get:function(){
                return originData[key];
            }
        })
    };
    prop(Number , 'toMoney' , function(){
        return this.toFixed(2) - 0;
    });
    prop(Number , 'turnMoney' , function(){
        return (this/100).toFixed(2);
    });
    prop(String , 'turnMoney' , function(){
        return (this/100).toFixed(2);
    });
    prop(String , 'turnKey' , function(split){
        console.log(split);
        split = split || '-';
        return this.replace(/[A-Z]/g,function(a){return split + a.toLowerCase()});
    });
    prop(String , 'turnKeyUp' , function(split){
        split = split || '-';
        return this.replace(new RegExp(split+'\\w','g'),function(a){return a.slice(1).toUpperCase()});
    });
    prop(String , 'padStart' , function(num , split){
        split = split || ' ';
        return (Array(num + 1).join(split) + this).slice(-num);
    });
    prop(Number , 'padStart' , String.prototype.padStart);
    prop(String , 'startTime' , function( time){
        if(this.length > 10)return this + '';
        return this + (time || ' 00:00:00');
    });
    prop(String , 'endTime' , function( time){
        if(this.length > 10)return this + '';
        return this + (time || ' 23:59:59');
    });

    prop(Array , 'every' , function(func){
        for(var i=0;i<this.length;i++){
            if(func(this[i] , i) === false)return false;
        }
        return true;
    });
    prop(Array , 'find' , function(func){
        for(var i=0;i<this.length;i++){
            if(func(this[i] , i) === true)return this[i];
        }
        return null;
    });
    prop(Array , 'findIndex' , function(func){
        for(var i=0;i<this.length;i++){
            if(func(this[i] , i) === true)return i;
        }
        return -1;
    });
    prop(Array , 'sum' , function(func){
        var sum = 0;
        func = func || function(a){return a};
        this.forEach(function(a){
          sum += func(a)-0;
        });
        return sum;
    });


    prop(Object , 'getYueValue' , function(key , autoData){
        autoData = Object.assign(autoData||{},this);
        key+='';
        if(Yue.filter.check(key)){
            key = key.split(/\s\|\s/);
            return Yue.filter.handler(this.getYueValue(key[0]) , key.slice(1));
        }
        if(key==='')return '';
        var evalKey = '';
        for(var i in autoData){
            evalKey+='var ' + i + '=autoData.'+i+';';
        }
        var resData;
        evalKey += ' resData=('+key+')';
        eval(evalKey);
        return resData;
    });
    prop(Object , 'doYueMethod' , function(val , eventData){
        var $this = eventData.$this;
        var $event = eventData.$event;
        var $el = eventData.$el;
        var data = $el.yueData;
        val = val.trim();
        if(val.indexOf('(')===-1){
            if(this[val]){
                $this[val]($el , $event);
            }else{
                console.log(val , $this);
                new Function(val).call($this);
            }
        }else{
            var evalKey = '';
            for(var i in data){
                evalKey+='var ' + i + '=data.'+i+';';
            }
            var startKey = val.split('(')[0].trim();
            if(this[startKey]){
                var index = val.indexOf('(');
                val = '$this.'+startKey+val.slice(index);
            }
            evalKey+=val;
            eval(evalKey);
        }
    });
    prop(Object , 'getYueTextContent' , function(key){
        var that = this;
        return key.replace(/\{\{[^}]+\}\}/g , function(a){
            a = a.slice(2);
            a = a.slice(0,-2);
            return that.getYueValue(a);
        });
    });
    prop(Object , 'turnType' , function(){
        if(this instanceof  Number)return this - 0;
        if(this instanceof  String)return this + '';
        if(this instanceof  Boolean)return !!this;
        return this;
    });
    if(!Array.isArray)Array.isArray = function(a){
        return a.constructor === Array && a instanceof Array;
    };

    if(!Object.assign)Object.assign = function(a , b){
        if(b)for(var i in b){
            if(b.hasOwnProperty(i))a[i] = b[i];
        }
    };
    Object.copyProp = function(prop){
        var rt = {};
        for(var key in prop){
            rt[key] = this[key];
        }
        return rt;
    };


})();