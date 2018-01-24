Yue.queue = function(){
    this.queues = [];
};
Yue.queue.prototype = {
    add:function(func){
        console.log('queue add');
        this.queues.push(func);
    },
    start:function(){
        if(!this.queues.length)return this.end();
        var first = this.queues.shift();
        if(first){
            first(this.start.bind(this));
        }else{
            this.start();
        }
    },
    end:function(func){
        if(func)this.endCall = func;
        else this.endCall && this.endCall();
    }
};