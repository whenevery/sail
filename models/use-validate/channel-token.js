//验证渠道token
module.exports = function (req , res , next){
    useRequest.send(req , res , {
        url:useUrl.token.check,
        data:{
            company:req.body.channel,
            timestamp:req.body.timestamp,
            token:req.body.token,
        },
        done:function(a){
            if(a.code === 0){
                next()
            }else{
                res.send('token error');
            }
        }
    })
};