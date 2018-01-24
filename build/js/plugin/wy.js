(function(){
    var Yue = window.Yue;
    var handlers = {};
    var readyHandler = {};
    Yue.ready = function(type ,func , done){
        var handler = readyHandler[type] = readyHandler[type] || {};
        if(typeof func === 'function'){
            Yue.bind('ready-' + type , func);
            if(handler.isReady){
                console.log('ready bind--' +type );
                func && func(handler.data, handler.done);
                return false;
            }
        }else{
            handler.data = func;
            handler.done = done;
            handler.isReady = true;
            Yue.trigger('ready-' + type , handler.data , handler.done);
            if(handler.once){
                handler.once.forEach(function(a){
                    try{
                        a(handler.data , handler.done);
                    }catch (e){
                        console.error(e);
                    }
                });
                handler.once = [];
            }
        }
    };
    Yue.readyOnce = function(type ,func){
        var handler = readyHandler[type] = readyHandler[type] || {};
        if(typeof func === 'function'){
            if(handler.isReady){
                func && func(handler.data , handler.done);
                return false;
            }else{
                handler.once = handler.once || [];
                handler.once.push(func);
            }
        }
    };
    Yue.bind = function(event , func){
        console.log('bind --' +event );
        if(func){
            var handler = handlers[event] = handlers[event] || [];
            if(handler.indexOf(func) >= 0){
                return false;
            }
            handler.push(func);
        }
    };
    Yue.unbind = function(event , func){
        if(func){
            var handler = handlers[event];
            if(handler){
                var index = handler.indexOf(func);
                if(index >= 0){
                    handler.splice(index , 1);
                }
            }

        }else{
            handlers[event] = [];
        }
    };
    Yue.clearBind = function(func){
        if(func){
            for(var key in handlers){
                var o = handlers[key],index;
                if(o && o.length){
                    index = o.indexOf(func);
                    if(index >=0){
                        o.splice(index , 1);
                        return;
                    }
                }
            }
            for(var key in readyHandler){
                var o = readyHandler[key].once,index;
                if(o && o.length){
                    index = o.indexOf(func);
                    if(index >=0){
                        o.splice(index , 1);
                        return;
                    }
                }
            }
        }
    };
    Yue.trigger = function(event , data , options){
        console.log('trigger --' +event );
        var handler = handlers[event];
        var nextStatus;
        handler && handler.forEach(function(a){
            try{
                if(a(data , options) === false){
                    nextStatus = false;
                }
            }catch (e){
                console.error(e);
            }
        });
        if(nextStatus === false)return false;
        if(event.indexOf('.') > 0){
            Yue.trigger(event.replace(/\.\w+$/,'') , data , options);
        }
    };

    Yue.oneReady = function(type , func , oneObj){
        oneObj = oneObj || Yue.autoYueObj;
        oneObj.yueWyHandler = oneObj.yueWyHandler || [];
        oneObj.yueWyHandler.push(oneObj);
        Yue.ready(type , func);
    };
    Yue.oneReadyOnce = function(type , func , oneObj){
        oneObj = oneObj || Yue.autoYueObj;
        oneObj.yueWyHandler = oneObj.yueWyHandler || [];
        oneObj.yueWyHandler.push(oneObj);
        Yue.readyOnce(type , func);
    };
    Yue.oneBind = function(type , func , oneObj){
        oneObj = oneObj || Yue.autoYueObj;
        oneObj.yueWyHandler = oneObj.yueWyHandler || [];
        oneObj.yueWyHandler.push(oneObj);
        Yue.bind(type , func);
    };
    Yue.oneUnBind = function(oneObj){
        oneObj = oneObj || Yue.autoYueObj;
        Yue.autoYueObj = null;
        var yueWyHandler = oneObj.yueWyHandler;
        if(yueWyHandler){
            yueWyHandler.forEach(function(a){
                Yue.clearBind(a);
            })
        }
    };
})();
