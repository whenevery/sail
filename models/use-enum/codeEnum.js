module.exports = {
    SUCCESS:[0,'操作成功'],
    FAIL:[1,'操作失败'],
    ERROR_DATA_CODE:[2,'数据异常'],
    DB_ERROR_CODE:[3,'数据库操作异常'],
    DOMAIN_ERROR_CODE:[4,'程序内部异步异常'],
    AGAIN_ERROR_CODE:[5,'不能重复操作'],
    SMS_SEND_ERROR:[6,'短信发送失败'],
    API_ERROR_CODE:[7,'API服务异常'],
    FILE_UPLOAD_FAIL:[8,'上传文件错误'],
    PARAM_ERROR_CODE:[9,'参数错误'],

    LOGIN_PASSWORD_ERROR:[100101,'登录密码校验失败'],

    SHAKE_NULL_CREATE:[100200,'创建活动后才能添加列表'],
    SHAKE_STATUS_CHANGE_CODE:[100201,'异常的活动状态改变'],
    SHAKE_DETAIL_COUNT_CODE:[100202,'活动奖品数量不足'],
    SHAKE_DATE_ERROR_CODE:[100203,'已过期活动不能启用'],
    SHAKE_TYPE_AUTO_ERROR:[100204,'只有普通活动能设为默认'],
    SHAKE_TYPE_AUTO_STATUS_ERROR:[100205,'只有启用的普通活动能设为默认'],
    SHAKE_SPEC_TIME_ERROR:[100206,'特殊活动时间重复'],
    SHAKE_DETAIL_STATUS_CHANGE_ERROR:[100207,'非初始化的活动不能修改列表'],

    SHAKE_NULL_ERROR:[100210,'暂无有效的活动'],
    SHAKE_TIME_OUT:[100211,'活动已过期，请刷新'],
    SHAKE_COUNT_MORE_ERROR:[100212,'活动次数已用完'],
    SHAKE_PRIZE_IS_NULL:[100213 ,'奖品已抽完，请下次再来'],


    RES_CODE_NULL:[200203,'未返回code'],
    RES_CODE_ZERO:[200204,'status code 为0'],

    HTTP_CODE_401:[401,'登录超时'],
    HTTP_CODE_402:[402,'需要修改初始密码'],
    HTTP_CODE_403:[403,'页面失效'],
    HTTP_CODE_404:[404,'404'],
    HTTP_CODE_405:[405,'不支持的请求方式'],
    HTTP_CODE_406:[406,'权限不足'],
    HTTP_CODE_407:[407,'没有请求权限'],
    HTTP_CODE_408:[408,'用户身份不能做此操作'],
    HTTP_CODE_204:[204,'204'],
};