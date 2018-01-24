Yue.domBind = function(el , methods , data , yueModal){
    var cl = el.yueClone;
    if(cl && el.yueBind){
        el.yueBind.forEach(function(a){
            if(!cl['yueDomBind'+a.key]){
                (function(data , a){
                    cl.addEventListener(a.key ,cl['yueDomBind'+a.key] = function(e){
                        methods.doYueMethod(a.val ,{
                            $event:e,
                            $el:this,
                            $this:yueModal
                        } , data)
                    });
                })(data , a);
            }
        });
    }
};
Yue.domUnBind = function(el , oldClone){
    oldClone = oldClone || el.yueClone;
    if(oldClone && el.yueBind){
        el.yueBind.forEach(function(a){
            oldClone.removeEventListener(a.key ,oldClone['yueDomBind'+a.key]);
        });
    }
};