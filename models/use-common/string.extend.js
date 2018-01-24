module.exports = function(obj){
    if(obj){
        /*
         * 在字符串前 插入(非重复插入)
         * str 需要操作的字符串
         * split 插入符号
         * */
        obj.unShift = function(str , split){
            str = str || '';
            split = split || '/';
            if(str.indexOf(split) == 0){
                return str;
            }
            return split + str;
        };
        /*
         * 在字符串前 插入(非重复插入)
         * str 需要操作的字符串
         * split 插入符号
         * */
        obj.stringConcatOnce = function(str , split){
            str = str || '';
            split = split || '/';
            if(str.indexOf(split) == str.length -1){
                return str;
            }
            return str + split;
        };
        /*
         *在前补全字符串
         * */
        obj.stringPadStart = function(str , len , split){
            if(str == null)str = '';
            str += '';
            if(str.length > len)return str;
            var _len = len - str.length;
            return Array(_len + 1).join(split).slice(0 , _len) + str;
        };
        /*
         *在后补全字符串
         * */
        obj.stringPadEnd = function(str , len , split){
            if(str == null)str = '';
            str += '';
            if(str.length > len)return str;
            var _len = len - str.length;
            return  str + Array(_len + 1).join(split).slice(0 , _len);
        };
        /*
         *生成随机code
         * len生成长度  默认4
         * type 0 数字  1字母 2 数字字母组合 默认0
         * */
        obj.stringRandom = function(len , type){
            if(isNaN(len) || !len || len < 0)len = 4;
            if(isNaN(type) || !type || type < 0)type = 0;
            var arrs = [
                '123456890',
                'qwertyuiopasdfghjklzxcvbnm',
                '123456789qwertyupasdfghjkzxcvbnm'//数字字母组合时  去掉 数字(1 0) 字母(O I l) 以防混淆不好辨认
            ];
            var randomStr = arrs[type];
            var rt = '';
            for(var i=0;i<len;i++){
                rt += randomStr[Math.random() * randomStr.length | 0];
            }
            return rt;
        };
        /*
         *获取渠道channel
         * */
        obj.getChannelByReq = function(req){
            return (req.baseUrl + req.path).split('/')[1];
        };
        /*
         *变成金额显示字符串
         * */
        obj.toMoneyString = function(num){
            var str = '';
            if(num > 1e4){
                str += Math.floor(num / 1e4) + '万';
            }
            num %= 1e4;
            if(num > 1e3){
                str += Math.floor(num / 1e3) + '千';
            }
            num %= 1e3;
            if(num){
                str += num;
            }
            return str;
        };
        obj.resetImgUrl = function(url){
            url += '';
            return url.replace(/^http(s)?:/,'')
        };
        obj.getCookieData = function(str){
            var rt = {};
            if(str)str.split('; ').forEach(function(a){
               var arr = a.split('=');
                rt[arr[0]] = arr[1];
            });
            return rt;
        };
        obj.serialize = function(data){
            var str = '';
            for(var key in data){
                var o = data[key];
                if(o != null){
                    if(str)str+='&';
                    str += key + '=' + encodeURIComponent(o);
                }
            }
            return str;
        };
        obj.concatImgUrl = function(url){
            if(/^http/.test(url))return url;
            return useConfig.get('apiImgUrl') + url;
        };
        obj.addUrlParam = function(url , param){
            if(typeof param === 'object'){
                param = obj.serialize(param);
            }
            url += /\?/.test(url)?'&':'?';
            url += param;
            return url.replace('?&','?');
        };
    }
};