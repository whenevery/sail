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
    function createComment(str){
        if(document.createComment)return document.createComment(str);
        return createDom('<!--'+str+'-->');
    }
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
            console.log('firstStr',firstStr);
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
        key = key || 'yueClone';
        if(!oldClone){
            oldClone = el[key] = el[key] || [];
        }
        if(yueClone){
            yueClone.forEach(function(a , i){
                if(Array.isArray(a)){
                    oldClone[i] = copyYueClone(el , a , oldClone[i] || [] , key);
                }
            })
        }
        return oldClone;
    }
    function findYueClone(yueClone , index){
        index = index.slice();
        var i = index.shift();
        while (i >= 0){
            if(Array.isArray(yueClone[i])){
                yueClone = yueClone[i];
            }else{
                if(index.length){
                    yueClone[i] = [];
                }
                else return yueClone;
            }
            i = index.shift();
        }
        return yueClone;
    }
    function findRealClone(yueClone){
        if(Array.isArray(yueClone))return yueClone[0];
        return yueClone;
    }
    function domAfter(dom , a){
        dom.parentNode.insertBefore( a, dom.nextSibling );
    }
    function domIsText(a){
        return a.nodeName && a.nodeName.indexOf('#') === 0;
    }
    function domClone(el , data , methods , parent , yueModal , index , parentYueClone){
        index = index || [0];
        var thisIndex = index[index.length - 1];
        var yueClone = copyYueClone(el , parentYueClone );
        var yueExist = copyYueClone(el , parentYueClone , null , 'yueExist');
        var thisYueClone = findYueClone(yueClone , index);
        var thisYueExist = findYueClone(yueExist , index);
        var oldExist = thisYueExist[thisIndex];
        var oldClone = thisYueClone[thisIndex];
        if(domIsText(el)){
            if(!el.textContent.replace(/\s/g,'')){
                el.remove();
            }else{
                if(!parent)return false;
                if(!oldClone){
                    oldClone = el.cloneNode(true);
                    thisYueClone[thisIndex] = oldClone;
                    parent.appendChild(oldClone);
                }
                var newText = data.getYueTextContent( el.textContent );
                if(newText !== oldClone.textContent )
                {
                    oldClone.textContent = newText;
                }
            }
            return false;
        }

        thisYueExist[thisIndex] = checkExist(el , data);
        var existChange = thisYueExist[thisIndex] !== oldExist || !oldClone;
        var cl;
        if(thisYueExist[thisIndex]){
            var forData = [data];
            var forOn = el.yueOn.find(function(a){return a.key === 'for'});
            if(existChange)if(forOn)thisYueClone[thisIndex] = [];
            if(forOn){
                forData= getForData(forOn.val , data);
                console.log('forData',forData);
            }
            if(forOn)thisYueClone = thisYueClone[thisIndex];
            var prevDom = oldClone;
            forData.forEach(function(data , i){
                if(forOn){
                    oldClone = thisYueClone[i];
                    prevDom = oldClone;
                }
                if(forOn){
                    cl = thisYueClone[i];
                }else{
                    cl = thisYueClone[thisIndex];
                }
                if(existChange || !cl){
                    cl = document.createElement(el.tagName || el.nodeName);
                    if(forOn){
                        thisYueClone[i] = cl;
                    }else{
                        thisYueClone[thisIndex] = cl;
                    }
                    if(prevDom){
                        domAfter(prevDom , cl);
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
                cl = createComment('--');
                thisYueClone[thisIndex] = cl;
                if(oldClone){
                    domAfter(oldClone , cl);
                    removeDom(el , oldClone);
                }else{
                    if(parent)parent.appendChild(cl);
                }
            }else cl = oldClone[thisIndex]
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
            if(domIsText(cl)){
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
    function getAttributeNames(el){
        if(el.getAttributeNames)return el.getAttributeNames();
        return [].slice.call(el.attributes);
    }
    function evalDom(dom , data , methods){
        if(domIsText(dom)){
            return false;
        }
        dom.yueDirective = [];
        dom.yueBind = [];
        dom.yueOn = [];
        dom.yueAttr = [];
        getAttributeNames(dom).forEach(function(key){
            var val;
            if(typeof key === 'string'){
                val = dom.getAttribute(key);
            }
            else{
                val = key.value;
                key = key.name;
            }
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
        function changeHandler(){
            domClone(dom , valueData , methods , null , yueModal);
        }
        yueModal.setData = function(data){
            if(data)for(var key in data){
                if(!(key in valueData)){
                    valueData[key] = data[key];
                    Yue.defineProperty(yueModal , key , valueData , changeHandler);
                }
            }
            changeHandler();
        };
        var queue = new Yue.queue();
        queue.add(function(next){
            if(jsData.beforeCreated){
                jsData.beforeCreated(next)
            }else{
                next();
            }
        });
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