(function(){
    Yue.bind('router-before' , function(){
        if(Yue.autoYueObj && Yue.autoYueObj.__yueDom){
            removeDom(Yue.autoYueObj.__yueDom);
            Yue.autoYueObj.__yueDom.remove();
            delete Yue.autoYueObj.__yueDom;
        }
        Yue.clearHtml();
    });
    Yue.clearHtml = function(){
        if(Yue.routerDom)Yue.routerDom.innerHTML = '';
    };
    function createDom(msg){
        var div = document.createElement('div');
        div.innerHTML = msg;
        return div.childNodes[0];
    }
    function createTextNode(){
        var div = document.createElement('div');
        div.textContent = ' ';
        return div.childNodes[0];
    }
    function checkExist(dom ,data){
        var sts = true;
        if(dom.yueOn)dom.yueOn.every(function(a){
            if(a.key === 'if'){
                sts = !!data.getYueValue(a.val);
                return false;
            }
            return true;
        });
        return sts;
    }
    function domClone(el , data , methods , parent , yueModal ){
        var cl;
        if(el.nodeName === '#text'){
            if(!el.textContent.replace(/\s/g,'')){
                el.remove();
            }else{
                if(!parent)return false;
                if(!el.yueClone){
                    el.yueClone = el.cloneNode(true);
                    parent.appendChild(el.yueClone);
                }
                el.yueClone.textContent = data.getYueTextContent(el.textContent);
            }
            return false;
        }
        var oldExist = el.yueExist;
        var oldClone = el.yueClone;
        el.yueExist = checkExist(el , data);
        var existChange = el.yueExist !== oldExist || !oldClone;
        if(el.yueExist){
            if(existChange){
                cl = document.createElement(el.tagName || el.nodeName);
                el.yueClone = cl;
            }
            domShow(el  , data , methods ,yueModal);
            [].slice.call(el.childNodes).forEach(function(a){
                domClone(a , data , methods , el.yueClone , yueModal);
            });
        }else{
            if(existChange){
                cl = createDom('<!------>');
                el.yueClone = cl;
            }
        }
        if(existChange){
            if(oldClone){
                oldClone.after(cl);
                if(el.yueExist){
                    oldClone.remove();
                }
                else removeDom(el , oldClone);
            }else{
                if(parent)parent.appendChild(cl);
            }
        }
        return cl;
    }
    function removeDom(dom , oldClone){
        if(dom){
            if(dom.tagName){
                Yue.directive.die(dom , oldClone);
                Yue.domUnBind(dom , oldClone);
                [].slice.call(dom.childNodes).forEach(function(a){
                    var oldClone = a.yueClone;
                    delete a.yueClone;
                    removeDom(a , oldClone);
                });
            }
            if(oldClone)oldClone.remove();
        }
    }
    function domShow(el , data , methods ,yueModal){
        var cl = el.yueClone;
        if(cl){
            if(el.nodeName === '#text'){
                cl.textContent = data.getYueTextContent(el.textContent);
                return false;
            }
            Yue.directive.handler(el , data , yueModal);
            if(el.yueOn)el.yueOn.forEach(function(a){
                if(a.key !=='if'){
                    var dataValue = data.getYueValue(a.val);
                    if(a.key === 'style'){
                        var styles;
                        if(typeof dataValue !== 'object'){
                            styles = {};
                            styles[a.key] = dataValue;
                        }
                        else styles = dataValue;
                        for(var style in styles){
                            cl.style[style] = styles[style];
                        }
                    }else if(a.key === 'class'){
                        cl.classList = el.classList;
                        if(dataValue){
                            if(Array.isArray(dataValue)){
                                dataValue.forEach(function(a){
                                    cl.classList.add(a);
                                })
                            }
                            else if(typeof dataValue === 'object'){
                                for(var key in dataValue){
                                    if(dataValue[key])cl.classList.add(key);
                                }
                            }
                            else cl.classList.add(dataValue);
                        }
                    }else{
                        if(['readonly','checked','selected'].indexOf(a.key)>-1){
                            cl.prop(a.key ,dataValue );
                        }
                        else if(['id','name','type','value'].indexOf(a.key)>-1){
                            cl[a.key] = dataValue;
                        }else{
                            cl.setAttribute(a.key , dataValue);
                        }
                    }
                }
            });
            if(el.yueAttr)el.yueAttr.forEach(function(a){
                cl.setAttribute(a.key , a.val);
            });
            Yue.domBind(el , methods , data , yueModal);
        }
    }
    function evalDom(dom , data , methods){
        if(dom.nodeName === '#text'){
            return false;
        }
        dom.yueDirective = [];
        dom.yueBind = [];
        dom.yueOn = [];
        dom.yueAttr = [];
        if(dom.getAttributeNames){
            dom.getAttributeNames().forEach(function(key){
                var val = dom.getAttribute(key);
                if(key[0] === ':'){
                    dom.yueOn.push({
                        key:key.slice(1),
                        val:val
                    })
                }else if(key[0] === '@'){
                    dom.yueBind.push({
                        key:key.slice(1),
                        val:val
                    })
                }else{
                    if(key.indexOf('y-')===0){
                        dom.yueDirective.push({
                            key:key,
                            val:val
                        })
                    }else{
                        dom.yueAttr.push({
                            key:key,
                            val:val
                        })
                    }
                }
            });
        }
        [].slice.call(dom.childNodes).forEach(function(a){
            evalDom(a , data , methods);
        });
    }
    var handlerCount = 0;
    Yue.loadView = function(router ,jsData, call){
        handlerCount++;
        handlerCount += '';
        var dom,data,methods,yueModal = {},valueData={};
        dom = createDom(router.view);
        yueModal.__yueDom = dom;
        data = jsData.data;
        methods = jsData.methods;
        var queue = new Yue.queue();
        yueModal.setData = function(data){
            if(data)for(var key in data){
                if(!(key in valueData)){
                    valueData[key] = data[key];
                    Yue.defineProperty(yueModal , key , valueData , changeHandler);
                }
            }
            changeHandler();
        };
        queue.add(function(next){
            if(jsData.beforeCreated){
                jsData.beforeCreated(next)
            }else{
                next();
            }
        });
        function changeHandler(){
            domClone(dom , valueData , methods , null , yueModal);
        }
        queue.add(function(next){
            for(var key in data){
                valueData[key] = data[key];
                Yue.defineProperty(yueModal , key , valueData , changeHandler);
            }
            for(var key in methods){
                Yue.definePropertyGet(yueModal , key , methods);
            }
            evalDom(dom , valueData , methods);
            Yue.routerDom.appendChild(domClone(dom , valueData , methods , null , yueModal));
            if(call)call(yueModal);
        });
        queue.start();
    };
    Yue.loadJs = function(view , call){
        var module = {};
        eval(view);
        var res = module.exports && module.exports();
        if(call)call(res);
        return res;
    };
})();