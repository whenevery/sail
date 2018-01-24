Yue.prop(Node , 'getEventListeners' , function(){
    return this.yueEventListeners || [];
});
Yue.prop(Node , 'cloneEventTo' , function(b){
    Yue.event.clone(this , b);
});
Yue.event = {
  bind:function(el , type , func){
      el.yueEventListeners = el.yueEventListeners || [];
      el.yueEventListeners.push({
          type:type,
          func:func
      });
      el.addEventListener(type , func , false);
  },
  unbind:function(el , type , func){
      el.yueEventListeners = el.yueEventListeners || [];
      var funcs = [];
      el.yueEventListeners.every(function(a){
          if(type){
              if(a.type !== type)return true;
              if(func){
                  if(a.func !== func)return true;
              }
          }
          funcs.push(func);
          el.removeEventListener(type , func);
          return true;
      });
      if(funcs.length){
          this.remove(el,type,funcs);
      }
  },
  clone:function(form , to){
      var yueEventListeners = form && form.yueEventListeners;
      if(to && yueEventListeners && yueEventListeners.length){
          yueEventListeners.forEach(function(a){
             to.addEventListener(a.type , a.func );
          });
      }
  },
  remove:function(el , type , funcs){
      if(funcs && funcs.length){
          var func = funcs.shift();
          while(func){
              el.yueEventListeners.every(function(a , i){
                  if(type){
                      if(a.type !== type)return true;
                  }
                  if(a.func === func){
                      el.yueEventListeners.splice(i,1);
                      return false;
                  }
                  return true;
              });
              func = funcs.shift()
          }
      }
  }
};