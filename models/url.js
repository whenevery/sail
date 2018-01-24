var apiUrl = useConfig.get('apiUrl') ;
var h5Api = useConfig.get('h5Api') ;
module.exports = {
    file:{
        upload:h5Api + '/file/upload',
    },
    sms:{
        send:apiUrl + '/api/sms/v_1/send',
        check:apiUrl + '/api/sms/v_1/invalidSms',
    },
    login:{
        login:h5Api + '/server/admin/login',
        update:h5Api + '/server/admin/login/update',
        permission:h5Api + '/server/admin/permission/data',
        qrcode:h5Api + '/server/merchant/login/qrcode',

        apiLogin:apiUrl + '/api/user/v_1/login',
        merchantLogin:apiUrl + '/api/user/v_1/bindUser',
    },
    permissionAdmin:{
        permission:h5Api + '/server/admin/permission/list',
        permissionAdd:h5Api + '/server/admin/permission/add',
        permissionUpdate:h5Api + '/server/admin/permission/update',
        permissionChange:h5Api + '/server/admin/permission/change',
        permissionDelete:h5Api + '/server/admin/permission/delete',

        permissionMenu:h5Api + '/server/admin/permission/menuList',
        permissionMenuAdd:h5Api + '/server/admin/permission/menuAdd',
        permissionMenuUpdate:h5Api + '/server/admin/permission/menuUpdate',
        permissionMenuChange:h5Api + '/server/admin/permission/menuChange',
        permissionMenuDelete:h5Api + '/server/admin/permission/menuDelete',

        role:h5Api + '/server/admin/permission/role',
        roleAdd:h5Api + '/server/admin/permission/roleAdd',
        roleUpdate:h5Api + '/server/admin/permission/roleUpdate',
        roleDelete:h5Api + '/server/admin/permission/roleDelete',

        user:h5Api + '/server/admin/permission/user',
        userAdd:h5Api + '/server/admin/permission/userAdd',
        userUpdate:h5Api + '/server/admin/permission/userUpdate',
        userDelete:h5Api + '/server/admin/permission/userDelete',
    },
    permissionMerchant:{
        permission:h5Api + '/server/merchant/permission/list',

        permissionMenu:h5Api + '/server/merchant/permission/menuList',

        role:h5Api + '/server/merchant/permission/role',
        roleAdd:h5Api + '/server/merchant/permission/roleAdd',
        roleUpdate:h5Api + '/server/merchant/permission/roleUpdate',
        roleDelete:h5Api + '/server/merchant/permission/roleDelete',

        user:h5Api + '/server/merchant/permission/user',
        userAdd:h5Api + '/server/merchant/permission/userAdd',
        userUpdate:h5Api + '/server/merchant/permission/userUpdate',
        userDelete:h5Api + '/server/merchant/permission/userDelete',

        userInfo:h5Api + '/server/merchant/permission/userInfo',

        qrcodeAdd:h5Api + '/server/merchant/permission/qrcode/add',

        merchantAdminAdd : h5Api + '/server/merchant/add',
    },
    token:{
        check:h5Api + '/server/token',
    },
    user:{
        qrcodeAdd:h5Api + '/server/merchant/permission/user/qrcodeAdd',
        info:apiUrl + '/api/user/v_1/infoByuserId',
        rongToken:apiUrl + '/api/user/v_1/getRongYunToken',
    },
    merchant:{
        login:h5Api + '/server/merchant/login',
        reset:h5Api + '/server/merchant/login/update',
        permission:h5Api + '/server/merchant/permission/data',

        info:apiUrl + '/mgr/supplier/v_1/info',
        edit:apiUrl + '/mgr/supplier/v_1/edit',
        add:apiUrl + '/mgr/supplier/v_1/add',
        list:apiUrl + '/mgr/supplier/v_1/list',
        delete:apiUrl + '/mgr/supplier/v_1/delete',

        musicAdd:apiUrl + '/mgr/supplier/music/v_1/add',
        musicEdit:apiUrl + '/mgr/supplier/music/v_1/edit',
        musicList:apiUrl + '/mgr/supplier/music/v_1/list',
        musicDown:apiUrl + '/mgr/supplier/music/v_1/down',
        musicUp:apiUrl + '/mgr/supplier/music/v_1/up',


        actAdd:apiUrl + '/mgr/supplier/act/v_1/add',
        actDelete:apiUrl + '/mgr/supplier/act/v_1/delete',
        actDown:apiUrl + '/mgr/supplier/act/v_1/down',
        actUp:apiUrl + '/mgr/supplier/act/v_1/up',
        actEdit:apiUrl + '/mgr/supplier/act/v_1/edit',
        actList:apiUrl + '/mgr/supplier/act/v_1/list',


        teamAdd:apiUrl + '/mgr/supplier/team/v_1/add',
        teamEdit:apiUrl + '/mgr/supplier/team/v_1/edit',
        teamInfo:apiUrl + '/mgr/supplier/team/v_1/info',
        teamList:apiUrl + '/mgr/supplier/team/v_1/list',

        envAdd:apiUrl + '/mgr/supplier/env/v_1/add',
        envEdit:apiUrl + '/mgr/supplier/env/v_1/edit',
        envList:apiUrl + '/mgr/supplier/env/v_1/envlist',

        contractAdd:apiUrl+'/mgr/contract/v_1/add',
        contractList:apiUrl+'/mgr/contract',
    },
    product:{
        list:apiUrl + '/mgr/goods/v_1/list',
        add:apiUrl + '/mgr/goods/v_1/add',
        up:apiUrl + '/mgr/goods/v_1/upGoods',
        down:apiUrl + '/mgr/goods/v_1/downGoods',
        edit:apiUrl + '/mgr/goods/v_1/edit',
        num:apiUrl + '/mgr/goods/v_1/editGoodsStock',
        category:apiUrl + '/mgr/goods/type/v_1/list',
        categoryAdd:apiUrl + '/mgr/goods/type/v_1/add',
        categoryEdit:apiUrl + '/mgr/goods/type/v_1/edit',
    },
    order:{
        list:apiUrl + '/api/shopping/v_1/list',
        info:apiUrl + '/api/shopping/v_1/orderDetail',
        infoBySeat:apiUrl + '/api/shopping/v_1/orderGoodsInfo',


        seatList:apiUrl + '/api/seat/v_1/orderList',
        seatInfo:apiUrl + '/api/seat/v_1/info',
        seatCost:apiUrl + '/mgr/orders/v_1/cost',

        pingList:apiUrl + '/api/seat/v_1/pzRecordLs',

        rateList:apiUrl + '/mgr/comment/v_1/list',
        rateDelete:apiUrl + '/mgr/comment/v_1/delete',

        distributeList:apiUrl + '/mgr/orders/v_1/distributeList',
        distribute:apiUrl + '/mgr/orders/v_1/distribute',
        distributeProduct:apiUrl + '/mgr/orders/v_1/distributeList2',

        giveList:apiUrl + '/api/give/v_1/list',


    },
    bank:{
        list:apiUrl + '/mgr/finance/bank/v_1/list',
        add:apiUrl + '/mgr/finance/bank/v_1/add',
        edit:apiUrl + '/mgr/finance/bank/v_1/edit',
        codeList:apiUrl + '/mgr/finance/bank/v_1/bankList',
    },
    withdraw:{
        add:apiUrl + '/mgr/finance/withdraw/v_1/apply',
        list:apiUrl + '/mgr/finance/withdraw/v_1/list',
        info:apiUrl + '/mgr/finance/withdraw/v_1/info',
        audit:apiUrl + '/mgr/finance/withdraw/v_1/audit',

        stream:apiUrl + '/mgr/finance/lszd/v_1/list',

        redPacket:apiUrl + '/mgr/redpacketsRequire',
    },
    city:{
        patent:apiUrl + '/api/area/v_1/list',
        child:apiUrl + '/api/area/v_1/childList',
    },
    version:{
        data:apiUrl + '/mgr/appversion',
        add:apiUrl + '/mgr/appversion/v_1/add',
        update:apiUrl + '/mgr/appversion/v_1/edit',
        off:apiUrl + '/mgr/appversion/v_1/off',
        on:apiUrl + '/mgr/appversion/v_1/on',
    },
    group:{
        lvlAdd:apiUrl + '/mgr/viplevel/v_1/add',
        lvlDelete:apiUrl + '/mgr/viplevel/v_1/delete',
        lvlList:apiUrl + '/mgr/viplevel',

        list:apiUrl + '/mgr/chatGroup',
        add:apiUrl + '/mgr/chatGroup/v_1/add',
        delete:apiUrl + '/mgr/chatGroup/v_1/delete',

    },
    adv:{
        bannerAdd:apiUrl + '/mgr/banner/v_1/add',
        bannerEdit:apiUrl + '/mgr/banner/v_1/edit',
        bannerList:apiUrl + '/mgr/banner/v_1/list',
    },
    member:{
        list:apiUrl + '/mgr/user/v_1/list',
        members:apiUrl + '/mgr/supplier/v_1/members',

        groupUser:apiUrl + '/api/chat/v_1/groupUser',
        quitGroup:apiUrl + '/api/chat/v_1/quitGroup',
        addChatGroup:apiUrl + '/mgr/supplier/v_1/addChatGroup',
        delChatMember:apiUrl + '/mgr/supplier/v_1/delChatGroupMembers',
    },
    wine:{
        list:apiUrl + '/mgr/wine/v_1/accessWineList',
        imp:apiUrl + '/mgr/wine/v_1/auditAccessWine',
        exp:apiUrl + '/mgr/wine/v_1/expWine',
    },
    message:{
        userList:apiUrl + '/mgr/userview',
    },
    team:{
        dutyAdd:apiUrl + '/mgr/supplier/duty/v_1/add',
        dutyList:apiUrl + '/mgr/supplier/duty/v_1/list',

        orgAdd:apiUrl + '/mgr/supplier/org/v_1/add',
        orgList:apiUrl + '/mgr/supplier/org/v_1/list',
        orgChildList:apiUrl + '/mgr/supplier/org/v_1/childlist',

        personList:apiUrl+'/mgr/supplier/staff/v_1/list',
        personAddTask:apiUrl+'/mgr/supplier/staff/v_1/addTask',
        personAddDuty:apiUrl+'/mgr/supplier/staff/v_1/addDuty',
        personAmount:apiUrl+'/mgr/supplier/staff/v_1/setAmount',
    },
};