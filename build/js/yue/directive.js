(function(){
    var directive = {

    };
    Yue.directive = function(type , options){
        directive['y-'+type.turnKey()] = options;
    };
    Yue.directive.handler = function(el , data , yueModal , cl){
        var yueDirective = el.yueDirective;
        cl = cl || el.yueClone && el.yueClone[0];
        if(cl && yueDirective && yueDirective.length){
            cl.directiveCount = cl.directiveCount || 0;
            yueDirective.forEach(function(a){
                var handler = directive[a.key];
                if(handler){
                    var dataValue = {
                        newVal:data.getYueValue(a.val),
                        originVal:a.val,
                        $this:yueModal
                    };
                     if(cl.directiveCount===0){
                         handler.insert && handler.insert(cl , dataValue);
                     } else{
                         handler.update && handler.update(cl , dataValue);
                     }
                    handler.done && handler.done(cl,dataValue);
                }
            });
            cl.directiveCount++;
        }
    };
    Yue.directive.die = function(el , cl){
        cl = cl || el.yueClone;
        if(Array.isArray(cl)){
            cl.forEach(function(cl){
                Yue.directive.die(el , cl);
            });
        }
        else if(cl){
            var yueDirective = el.yueDirective;
            if(yueDirective && yueDirective.length){
                yueDirective.forEach(function(a){
                    var handler = directive[a.key];
                    if(handler){
                        handler.die && handler.die(cl);
                    }
                });
            }
        }
    }
})();