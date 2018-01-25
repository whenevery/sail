window.onload = function(){
    if(Yue.readyQueue.length){

    }
    Yue.app = document.getElementById('yue');
    Yue.routerDom = document.getElementById('router');
    Yue.router.start();
};