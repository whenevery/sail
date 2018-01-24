Yue.captureImage  = function(video , call){
    var scale = .8;
     if(typeof video === 'string'){
         var str = video;
         video = document.createElement('video');
         video.preload = 'auto';
         video.src = '/file/down?url='+str;
         var div = document.createElement('div');
         div.style.display = 'none';
         div.appendChild(video);
         document.body.appendChild(div);
         video.onloadeddata = function(){
             video.onloadeddata = null;
             get();
         }
     }else get();
    function get(){
        var canvas = document.createElement("canvas");
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width,
            canvas.height);
        var blob = useCommon.convertBase64UrlToBlob(canvas.toDataURL("image/png") , 'image/png');
        $.uploadFile(blob , {} , {} ,function(a){
            if(a.code === '10000'){
                call(a.data.filePath);
            }
        });
    }
};