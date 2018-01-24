function qrcodeLogin(options){
    if(typeof options === 'string')options = {text:options};
    options = Object.assign({},options);
    this.data = options.data;
    delete options.data;
    if(this.data){
        throw 'not options data';
    }
    this.options = Object.assign({

    },options);
    this.init();
}
qrcodeLogin.prototype = {
    getCanvas:function(text){
        this.options.text = text;
        return qrcodeModel(this.options);
    },
    init:function(){
        var options = this.options;
        var clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
        if(!options.width){
            if(clientWidth > 600){
                options.width = 600;
                options.height = 600;
            }else{
                options.width = clientWidth / 2;
                options.height = clientWidth / 2;
            }
        }
        options.content = options.content || document.body;
        options.env = options.env || 'dev';
        options.channel = options.channel || 'admin';
    },
    putCanvas:function(text , remark){
        var div = document.createElement('div');
        div.style.margin = 'auto';
        div.style.textAlign = 'center';
        div.style.padding = '15px';
        div.style.background = 'white';
        div.style.color = '#333';
        div.appendChild(this.getCanvas(text));
        var text  = document.createElement('div');
        text.innerHTML = remark || options.remark || '请扫描二维码';
        text.style.marginTop = '10px';
        div.appendChild(text);
        this.options.content.appendChild(div);
    },
    putError:function(e){
        var div = document.createElement('div');
        div.innerHTML = '系统繁忙！';
        div.style.color = 'red';
        this.options.content.appendChild(div);
    },
    getUrl:function(data){
        var url = resJson.qrcodeApi +data;
        console.log(url);
        return url;
    }
};