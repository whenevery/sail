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
    function getForData(val , data ){
        var dataKey = val , valArr , item = 'item' , index = 'index';
        if(val.indexOf(' in ') > -1){
            valArr = val.split(' in ');
            dataKey = valArr[1];
            var firstStr = valArr[0].replace(/\(|\)/g,'');
            item = firstStr.split(',')[0];
            index = firstStr.split(',')[1] || index;
        }
        var arr = data.getYueValue(dataKey);
        var res = [];
        if(arr){
            item = item.trim();
            index = index.trim();
            if(Array.isArray(arr)){
                arr.forEach(function(a , i){
                    var newData = Object.assign({},data);
                    newData[item] = a;
                    newData[index] = i;
                    res.push(newData);
                });
            }else{
                for(var key in arr){
                    var newData = Object.assign({},data);
                    newData[item] = arr[key];
                    newData[index] = key;
                    res.push(newData);
                }
            }
        }
        return res;
    }
    function copyYueClone(el , yueClone , oldClone , key){
        var res = [];
        key = key || 'yueClone';
        if(!oldClone){
            oldClone = el[key] = el[key] || [];
        }
        if(yueClone){
            yueClone.forEach(function(a , i){
                oldClone[i] = oldClone[i] || [];
                if(Array.isArray(a)){
                    res[i] = copyYueClone(el , a , oldClone[i] , key);
                }else{
                    res[i] = oldClone[i];
                }
            })
        }
        return res;
    }
    function findYueClone(yueClone , index){
        index = index.slice();
        var i = index.shift();
        while (i >= 0){
            yueClone = yueClone[i] = yueClone[i] || [];
            i = index.shift();
        }
        return yueClone;
    }
    function findRealClone(yueClone){
        if(Array.isArray(yueClone))return yueClone[0];
        return yueClone;
    }
    function domClone(el , data , methods , parent , yueModal , index , parentYueClone){
        index = index || [0];
        var yueClone = copyYueClone(el , parentYueClone );
        var yueExist = copyYueClone(el , parentYueClone , null , 'yueExist');
        var thisYueClone = findYueClone(yueClone , index);
        var thisYueExist = findYueClone(yueExist , index);
        var oldExist = thisYueExist[0];
        var oldClone = thisYueClone[0];
        if(el.nodeName === '#text'){
            if(!el.textContent.replace(/\s/g,'')){
                el.remove();
            }else{
                if(!parent)return false;
                console.log(index , parentYueClone , yueClone , yueClone[0] , thisYueClone , thisYueClone.length);
                if(!oldClone){
                    oldClone = el.cloneNode(true);
                    thisYueClone.push(oldClone);
                    parent.appendChild(oldClone);
                    console.log(thisYueClone, thisYueClone.length);
                }
                console.log(index , parentYueClone , yueClone , yueClone[0] , thisYueClone , thisYueClone.length);
                var newText = data.getYueTextContent( el.textContent );
                if(newText !== oldClone.textContent )
                {
                    oldClone.textContent = newText;
                }
            }
            return false;
        }

        thisYueExist[0] = checkExist(el , data);
        var existChange = thisYueExist[0] !== oldExist || !oldClone;
        var cl;
        if(thisYueExist[0]){
            var forData = [data];
            var forOn = el.yueOn.find(function(a){return a.key === 'for'});
            if(existChange) thisYueClone[0] = [];
            if(forOn){
                forData= getForData(forOn.val , data);
            }
            thisYueClone = thisYueClone[0];
            var prevDom = oldClone;
            forData.forEach(function(data , i){
                cl = thisYueClone[i];
                if(existChange || !cl){
                    cl = document.createElement(el.tagName || el.nodeName);
                    thisYueClone[i] = [cl];
                    if(prevDom){
                        console.log(yueClone , index , thisYueClone , oldClone ,prevDom , parentYueClone);
                        prevDom.after(cl);
                        if(oldClone)oldClone.remove();
                    }else{
                        if(parent)parent.appendChild(cl);
                    }
                    prevDom = cl;
                }
                domShow(el  , data , methods , yueModal , cl);
                [].slice.call(el.childNodes).forEach(function(a){
                    var arr = index.slice();
                    var newClone = parentYueClone;
                    if(forOn){
                        newClone = yueClone;
                        arr.push(i);
                    }
                    domClone(a , data , methods , cl, yueModal , arr , newClone);
                });
            });
        }else{
            if(existChange){
                cl = createDom('<!------>');
                thisYueClone[0] = cl;
                if(oldClone){
                    oldClone.after(cl);
                    removeDom(el , oldClone);
                }else{
                    if(parent)parent.appendChild(cl);
                }
            }else cl = oldClone[0]
        }
        return cl;
    }
    function removeDom(dom , oldClone){
        if(Array.isArray(oldClone)){
            return oldClone.forEach(function(a){
                removeDom(dom , a);
            });
        }
        if(dom){
            if(dom.tagName){
                Yue.directive.die(dom , oldClone);
                Yue.domUnBind(dom , oldClone);
                if(oldClone)delete oldClone.yueData;
                [].slice.call(dom.childNodes).forEach(function(a){
                    var oldClone = a.yueClone;
                    delete a.yueClone;
                    removeDom(a , oldClone);
                });
            }
            if(oldClone)oldClone.remove();
        }
    }
    function domShow(el , data , methods ,yueModal , cl){
        cl = cl || el.yueClone[0];
        if(cl){
            if(cl.nodeName === '#text'){
                var newText = data.getYueTextContent(el.textContent);
                if(cl.textContent !== newText)cl.textContent = newText;
                return false;
            }
            cl.yueData = data;
            Yue.directive.handler(el , data , yueModal , cl);
            if(el.yueOn)el.yueOn.forEach(function(a){
                if(['if','for'].indexOf(a.key) === -1){
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
            Yue.domBind(el , methods , data , yueModal , cl);
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