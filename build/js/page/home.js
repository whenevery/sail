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
            inputText:'123',
            html:'<div>newdiv</div>',
            money:12345,
            obj:'',
            arr0:['a','b','c'],
            arr1:['aa','bb','cc'],
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
                console.log(this);
            },
            arrClick:function(key , index){
                var data = this[key];
                data.arrClickIndex = data.arrClickIndex || 0;
                data.arrClickIndex++;
                data[index] = data[index].replace(/\d/g,'')+data.arrClickIndex;
                this.setData();
            }
        },
        watch:{

        }
    };
};