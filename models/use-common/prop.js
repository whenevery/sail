function prop(obj , key , func){
  if(!obj.prototype[key]){
    Object.defineProperty(obj.prototype , key , {
      get:function(){
        return func
      },
    });
  }
}
prop(Number , 'toMoney' , function(){
  return this.toFixed(2) - 0;
});
prop(Number , 'turnMoney' , function(){
  return (this/100).toFixed(2);
});
prop(String , 'turnMoney' , function(){
  return (this/100).toFixed(2);
});
prop(Array , 'every' , function(func){
  for(var i=0;i<this.length;i++){
     if(func(this[i] , i) === false)return false;
  }
  return true;
});
prop(String , 'padStart' , function(num , split){
  split = split || ' ';
  return (Array(num + 1).join(split) + this).slice(-num);
});
prop(Number , 'padStart' , String.prototype.padStart);
if(!Object.assign)Object.assign = function(a , b){
  if(b)for(var i in b){
    if(b.hasOwnProperty(i))a[i] = b[i];
  }
};
prop(String , 'startTime' , function( time){
  if(this.length > 10)return this + '';
  return this + (time || ' 00:00:00');
});
prop(String , 'endTime' , function( time){
  if(this.length > 10)return this + '';
  return this + (time || ' 23:59:59');
});
prop(Array , 'find' , function(func){
  for(var i=0;i<this.length;i++){
    if(func(this[i] , i) === true)return this[i];
  }
  return null;
});
prop(Array , 'findIndex' , function(func){
  for(var i=0;i<this.length;i++){
    if(func(this[i] , i) === true)return i;
  }
  return -1;
});
prop(Array , 'clearNull' , function(func){
  var arr = this;
  this.forEach(function(a , i){
    if(a == null)arr[i] = '';
    else if(typeof a === 'object')arr[i] = a.clearNull();
  });
  return this;
});
prop(Object , 'clearNull' , function(func){
  for(var key in this){
    var  o = this[key];
    if(o == null)this[key] = '';
    else if(typeof o === 'object')this[key] = o.clearNull();
  }
  return this;
});
prop(Object , 'clearEmpty' , function(func){
  for(var key in this){
    var  o = this[key];
    if(o === null || o === '')delete this[key];
  }
  return this;
});
