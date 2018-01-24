(function(){
    Yue.directive('text',{
        done:function(el , data){
            el.textContent = data.newVal;
        }
    });
    Yue.directive('html',{
        done:function(el , data){
            el.innerHTML = data.newVal;
        }
    });
    Yue.directive('model',{
        insert:function(el , data){
            console.log('bind input');
            el.addEventListener('input' ,el.yueInputModel = function(){
                console.log('do input');
                data.$this[data.originVal] = this.value;
            })
        },
        done:function(el , data){
            el.value = data.newVal;
        },
        die:function(el , val){
            el.removeEventListener('input' , el.yueInputModel);
        }
    });
    Yue.directive('timer',{
        insert:function(el , data){
            el.timer = setInterval(function(){
                var innerHTML = el.innerHTML || 0;
                el.innerHTML = ++innerHTML;
                console.log('timer' ,el ,el.innerHTML, innerHTML);
            },1000);
        },
        die:function(el , data){
            clearInterval(el.timer);
        }
    });
})()