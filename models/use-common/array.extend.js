module.exports = function(obj){
    if(obj){
        /*
         * 去掉重复值 会打乱顺序
         * */
        obj.unique = function(arr){
            var _arr = arr.slice();
            _arr.sort();
            var rt = [];
            var last;
            for(var i=0;i<_arr.length;i++){
                if(arr[i] != last){
                    last = _arr[i];
                    rt.push(last);
                }
            }
            return rt;
        };
        /*
         * 数组计算和
         * */
        obj.arraySum = function(arr , func){
            func = func || function(a){return a;};
            var sum = 0;
            if(arr){
                arr = [].slice.call(arr);
                if(Array.isArray(arr)){
                    arr.forEach(function(o){sum += func(o) - 0;});
                }
            }
            return sum;
        }
    }
};