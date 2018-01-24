function Permission(){

}
Permission.auth = function(permissionCode){
    return function(req , res , next){
        req.__permissionCode = permissionCode;
        if(req.session.userInfo.type > 49)return next();
        var permissionList = req.session.permissionData.permissionList;
        if(permissionList.every(function(a){
            if(a.code === permissionCode){
                next();
                return false;
            }
            return true
            })){
            return res.sendErrorMessage('HTTP_CODE_406','');
        }
    }
};
Permission.authMenu = function(menuCode){
    return function(req , res , next){
        req.__menuCode = menuCode;
        if(req.session.userInfo.type > 49)return next();
        var menuList = req.session.permissionData.menuList;
        if(menuList.every(function(a){
                if(a.code === menuCode){
                    next();
                    return false;
                }
                return true
            })){
            return res.sendErrorMessage('HTTP_CODE_406','');
        }
    }
};
Permission.init = function(){
    Permission.menuList = {
        menu0101:'/permission',
        menu0102:'/permission/menu',

        menu0201:'/permission/merchant/role',
        menu0202:'/permission/merchant/user',

        menu0301:'/distribution/order',

        menu0401:'/merchant',
        menu0402:'/merchant/music',
        menu0403:'/merchant/activity',
        menu0404:'/merchant/team',
        menu0405:'/merchant/env',

        menu0501:'/message/get',
        menu0502:'/message/send',
        menu0503:'/message/order',
        menu0504:'/message/user',

        menu06:'/spread/index',

        menu07:'/product',

        menu0801:'/order/seat',
        menu0802:'/order',
        menu0803:'/order/rate',

        menu09:useConfig.get('seatUrl')+'/server/merchant/seat/index',

        menu1001:'/member/group',
        menu1002:'/member/list',

        menu1101:'/withdraw',
        menu1102:'/withdraw/list',
        menu1103:'/withdraw/bank',
        menu1104:'/withdraw/stream',

        menu1201:'/wine/list',
        menu1202:'/wine/stock',
        menu1203:'/wine/history',

        menu1301:'/team/person',
        menu1302:'/team/duty',
        menu1303:'/team/org',



        //内部使用菜单
        menu00101:'/admin/merchant',
        menu00102:'/admin/merchant/contract',
        menu00201:'/admin/member/list',
        menu00301:'/admin/finance/audit',
        menu00302:'/admin/finance/list',
        menu00304:'/admin/finance/red',
        menu004:'/admin/version',
        menu00501:'/admin/group',
        menu00502:'/admin/group/lvl',
        menu00601:'/admin/product/list',
        menu00602:'/admin/product/category',
        menu00701:'/admin/adv/banner',


    };
};
module.exports = Permission;