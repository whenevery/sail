module.exports = function(){
    return {
        data:{
            showAble:0,
            className:'class',
            one:'one-abc',
            two:'two-abc',
            three:'three',
            clickCount:0,
            text:'text',
            inputText:'inputText',
            html:'<div>newdiv</div>',
        },
        beforeCreated:function(next){
            next();
        },
        created:function(){

        },
        mounted:function(){

        },
        updated:function(){

        },
        destroy:function(){

        },
        methods:{
            click:function(el,ev){
                console.log(el,ev);
            }
        },
        watch:{

        }
    };
};