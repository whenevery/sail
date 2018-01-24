(function(obj){
    if(!obj.Promise){
        var Promise = function(call){
            var that = this;
            this.PromiseValue = null;
            var PromiseStatus = 'pending';
            Object.defineProperty(this , 'PromiseStatus',{
               get:function(){
                   return PromiseStatus;
               },
                set:function(v){
                    PromiseStatus = v;
                    if(PromiseStatus === 'rev'){
                        that.then(that.PromiseValue);
                    }
                }
            });
            this.thenArray = [];
            this.catchArray = [];
            call && call(function(data){
                that.PromiseValue = data;
                that.PromiseStatus = 'rev';
            } , function(data){
                that.PromiseValue = data;
                that.PromiseStatus = 'rej';
            });
        };
        Promise.prototype = {
            then:function(func){
                if(this.PromiseStatus === 'pending'){
                    this.thenArray.push(func);
                    return this;
                }
                if(this.PromiseStatus !== 'rev'){
                    return this;
                }
                if(this.PromiseStatus === 'rev'){
                    return func(this.PromiseValue);
                }
            },
            catch:function(func){
                if(this.PromiseStatus === 'pending'){
                    this.catchArray.push(func);
                    return this;
                }
                if(this.PromiseStatus !== 'rej'){
                    return this;
                }
                return func(this.PromiseValue);
            },
        };
        Promise.all = function(list){

        };
        obj.Promise = Promise
    }
})(window);