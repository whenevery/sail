var WebSocketServer  = require('ws').Server;
var  wss = new WebSocketServer({
    port: useConfig.get('wsPort'), //监听接口
});
//wss.clients
wss.on('connection' , function(ws){
    console.log('has one connection');
    ws.on('message', function(jsonStr , flags) {
        var data = useCommon.parse(jsonStr);
        if(handler[data.type]){
            handler[data.type](data , ws);
        }
    });
    ws.on('close', function(close) {
        console.log('on close');
        delete allWs[ws.id];
    });
});
var handler = {
    init:function(data , ws){
        var id = getWsId();
        ws.id = id;
        ws.send(JSON.stringify({
            type:'setId',
            id:id
        }));
    },
    getMemberData:function(data , ws){
        var callback = data.callback;
        if(callbacks[callback])callbacks[callback](data);
    }
};
var callbacks = {};
var callbackCount = 1;
module.exports = {
    getMemberData:function(data , call){
        var wsId = data.wsId;
        var userId = data.userId;
        if(!wsId || !userId){
            if(call)call({code:1,message:'无效页面,请重新获取！'});
            return ;
        }
        var ws = allWs[wsId];
        if(!ws){
            if(call)call({code:1,message:'管理员系统异常！'});
            return ;
        }
        var callbackId = 'callback'+callbackCount++;
        var timer = setTimeout(function(){
            if(call)call({
                code:1,
                message:'网络超时，请重试!'
            });
            call = null;
        } , 30);
        callbacks[callbackId] = function(data){
             clearTimeout(timer);
             if(call){
                 call(data);
             }
             call = null;
        };
        ws.send(JSON.stringify({type:'getMemberData',callback:'callback'+callbackCount++,userId:userId}))
    },
    setIpcData:function(data , wsId){
        var ws = allWs[wsId];
        if(ws){
            ws.send(JSON.stringify({type:'setIpcData',data:data}));
        }
    }
};