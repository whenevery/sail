Yue.domBind = function(el , methods , data , yueModal , cl){
    if(el.yueBind && el.yueBind.length){
        cl = cl || el.yueClone && el.yueClone[0];
        if(Array.isArray(cl)){
            cl.forEach(function(cl){
                Yue.domBind(el , methods , data , yueModal , cl);
            })
        }
        else if(cl){
            el.yueBind.forEach(function(a){
                if(!cl['yueDomBind'+a.key]){
                    (function(data , a){
                        console.log('addEventListener', a.key , a.val , cl);
                        cl.addEventListener(a.key ,cl['yueDomBind'+a.key] = function(e){
                            methods.doYueMethod(a.val ,{
                                $event:e,
                                $el:this,
                                $this:yueModal
                            })
                        });
                    })(data , a);
                }
            });
        }
    }
};
Yue.domUnBind = function(el , oldClone , key){
    oldClone = oldClone || el.yueClone;
    if(el.yueBind && el.yueBind.length){
        if(Array.isArray(oldClone)){
            oldClone.forEach(function(oldClone){
                Yue.domUnBind(el , oldClone , key);
            })
        }
        else if(oldClone){
            if(key)oldClone.removeEventListener(a.key ,oldClone['yueDomBind'+key]);
            else el.yueBind.forEach(function(a){
                oldClone.removeEventListener(a.key ,oldClone['yueDomBind'+a.key]);
            });
        }
    }
};