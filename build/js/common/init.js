
window.onerror = function(err , url , line){
    try{
        errorLog({
            err:err,
            url:url ,
            line : line
        });
    }catch(e){

    }
};
window.errorLog = function(data){
    $.ajax({
        url:'common/log',
        notLog:true,
        data:data
    })
};
