(function(){
    Yue.filter('moneyFilter',function(val){
        return (val - 0 ).toFixed(2);
    });
    Yue.filter('turnMoney',function(val){
        return (val / 100).toFixed(2);
    });
    Yue.filter('reverse',function(val){
        return val.split('').reverse().join('');
    });
})();