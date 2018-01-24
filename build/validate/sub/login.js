(function(){
    useValidate.login = {
		validator:function(data , type){
			if(type == 'login'){
                var valid = useValidate.validator({
                    username:{
                        required:1,
                        maxlength:20,
                        requiredMessage:'请输入登录账号',
                        maxlengthMessage:'账号最长为20'
                    },
                    password:{
                        required:1,
                        lengthRange:[6,18],
                        requiredMessage:'请输入登录密码',
                        lengthRangeMessage:'登录密码为6-18位'
                    }
                },data);
			}else if(type == 'reset'){
                var valid = useValidate.validator({
                    password:{
                        required:1,
                        maxlength:20,
                        requiredMessage:'请输入密码'
                    },
                    newPassword:{
                        required:1,
                        lengthRange:[6,18],
                        requiredMessage:'请输入新密码',
                        lengthRangeMessage:'新密码长度6-18',
                    },
                    twoPassword:{
                        required:1,
                        requiredMessage:'请再次输入新密码',
                    }
                },data);
                if(valid.valid){
                	if(data.newPassword != data.twoPassword){
                		valid.valid = false;
                		valid.message = '两次密码不一致';
					}
				}
			}
			return valid;
		}
	};
})();