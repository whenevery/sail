(function(){
    var isLoading;
    var $loadingWindow
    Yue.loading = function(sts){
        if(sts === 0){
            isLoading = 0;
            if($loadingWindow)$loadingWindow.hide();
            return false;
        }
        $loadingWindow = $loadingWindow || $('.wy-loading-window');
        $loadingWindow.show();
        isLoading = 1;
        var width = 190,height = 65;
        function canvasLoading(canvas){
            canvas.width = width;
            canvas.height = height;
            var x = 67 , y = 94;
            var ctx = canvas.getContext('2d');
            var requestAnimationFrame = window.requestAnimationFrame || function(func){setTimeout(func , 16)};
            var start = 0;
            var startColor = '#ff0042',endColor = 'black';
            function createLinearGradient(){
                var grd=ctx.createLinearGradient(-width/2,0,width*3/2,width);
                grd.addColorStop((start)%1,startColor);
                grd.addColorStop((start+1/12)%1,startColor);
                grd.addColorStop((start+3/12)%1,endColor);
                grd.addColorStop((start+4/12)%1,endColor);
                grd.addColorStop((start+6/12)%1,startColor);
                grd.addColorStop((start+7/12)%1,startColor);
                grd.addColorStop((start+9/12)%1,endColor);
                grd.addColorStop((start+10/12)%1,endColor);
                grd.addColorStop((start+1)%1,startColor);
                return grd;
            }
            function draw(){
                ctx.clearRect(0,0,width,height);
                ctx.beginPath();
                ctx.strokeStyle = createLinearGradient();
                ctx.lineWidth = 3;
                ctx.moveTo(0,height/2);
                ctx.quadraticCurveTo(x,y,width,0);
                ctx.stroke();
                ctx.moveTo(0,height/2);
                ctx.quadraticCurveTo(x,height-y,width,height);
                ctx.stroke();
                start+=0.01;
                if(start>1)start-=1;
                requestAnimationFrame(function(){
                    if(isLoading)draw();
                });
            }
            draw();
        }
        canvasLoading($loadingWindow.find('canvas')[0]);
    };
})();