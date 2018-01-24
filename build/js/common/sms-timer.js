function dateTimer(ele , time , call){
  if(!this instanceof dateTimer)return new dateTimer(ele , time , call);
  this.ele = ele;
  this.oldHtml = ele.value;
  this.allTime = time;
  this.call = call;
  this.timer();
}
dateTimer.prototype = {
  timer:function(){
    this.ele.value = this.allTime + '秒后发送';
    if(this.allTime <= 0){
      this.ele.value = this.oldHtml;
      this.call();
    }else{
      this.timeout = setTimeout(this.timer.bind(this),1000);
    }
    this.allTime --;
  },
  die:function(){
    clearTimeout(this.timeout);
  }
};
