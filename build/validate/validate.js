(function(){
	var validator = {
		required:{
			method:function(val){
				return val !== '' && val != null;
			},
			message:function(key){
				return key + ' is required';
			}
		},
		max:{
			method:function(val , param){
				return val - 0 <= param;
			},
			message:function(key , param){
				return key + ' 不能大于' + param;
			}
		},
		min:{
			method:function(val , param){
				return val - 0 >= param;
			},
			message:function(key , param){
				return key + ' 不能小于' + param;
			}
		},
		moreThen:{
			method:function(val , param){
				return val - 0 > param;
			},
			message:function(key , param){
				return key + ' 不能小于' + param;
			}
		},
		isInt:{
			method:function(val){
				return /^(\-)?\d+$/.test(val);
			},
			message:function(key, param , val){
				return key + ' 必须是整数 but ' + val;
			}
		},
		isNumber:{
			method:function(val){
				return /^(\-)?\d+(\.\d+)?$/.test(val);
			},
			message:function(key, param , val){
				return key + ' 必须是数字 but ' + val;
			}
		},
		isMoney:{
			method:function(val){
				return /^\d+(\.\d{1,2})?$/.test(val);
			},
			message:function(key , param , val){
				return key + ' 必须是有效金额 but ' + val;
			}
		},
		length:{
			method:function(val , param){
				return val.length == param;
			},
			message:function(key , param){
				return key + '  length is ' + param;
			}
		},
		maxlength:{
			method:function(val , param){
				return val.length <= param;
			},
			message:function(key , param){
				return key + '  is too long , maxlength is ' + param;
			}
		},
		minlength:{
			method:function(val , param){
				return val.length >= param;
			},
			message:function(key , param){
				return key + '  is too short , minlength is ' + param;
			}
		},
		lengthRange:{
			method:function(val , param){
				if(!param.splice)param = param.split(',');
				return val.length >= param[0] && val.length <= param[1];
			},
			message:function(key , param){
				if(!param.splice)param = param.split(',');
				return key + '  is between  ' + param[0] + ' and ' + param[1];
			}
		},
		isPhone:{
			method:function(val){
				return /^1(3|4|5|7|8)(\d{9})$/.test(val);
			},
			message:function(key , param , val){
				return key + '需要正确的手机号格式 but ' + val;
			}
		},
		isDate:{
			method:function(val){
				if(val - 0 )val -= 0;
				return new Date(val) != 'Invalid Date';
			},
			message:function(key , param , val){
				return key + '必须可转化为日期 but ' + val;
			}
		},
		inArray:{
			method:function(val , param){
				if(param.constructor  != [].constructor ){
					param += '';
					param = param.split(',');
				}
				return param.indexOf(val) >= 0;
			},
			message:function(key , param , val){
				return '请输入正确的枚举值';
			}
		},
		forInData:{
			method:function(val , param){
				if(param){
					return val in param;
				}
			},
			message:function(key , param , val){
				return '请输入正确的枚举值';
			}
		},
		regExp:{
			method:function(val , param){
				return param.test(val);
			},
			message:function(key , param , val){
				return '请输入正确的格式';
			}
		},
		chinese:{
			method:function(val){
				return /^[\u4E00-\u9FA5\uf900-\ufa2d]+((\.|\·)?[\u4E00-\u9FA5\uf900-\ufa2d]+)+$/g.test(val);
			},
			message:function(){
				return '请输入正确的中文';
			}
		},
		isAllName:{
			method:function(val){
				return /^[\u4E00-\u9FA5\uf900-\ufa2d\w]+$/g.test(val);
			},
			message:function(){
				return '不允许特殊字符';
			}
		},
		isEnAndNum:{
			method:function(val){
				return /^[a-zA-Z0-9]+$/g.test(val);
			},
			message:function(){
				return '只允许英文字母和数字';
			}
		},
		isEqual:{
			method:function(val, param){
				return val == param;
			},
			message:function(val, param){
				return val + ' 与 ' + param + '不相同';
			}

		},
		isNotEqual:{
			method:function(val, param){
				return val != param;
			},
			message:function(val, param){
				return val + ' 与 ' + param + '不能相同';
			}

		},
		isCityCode:{
			method:function(val, param){
				for(var i = 0,len = useCommon.citySelectData.length;i < len; i++){
					if(useCommon.citySelectData[i].code == val){
						return true;
					}
				}
			},
			message:function(val, param){
				return '非法的省市区编码';
			}

		},
		isIdCard:{
			method:function(val , param , ele){
				var CheckIdCard={
					//Wi 加权因子 Xi 余数0~10对应的校验码 Pi省份代码
					Wi:[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],
					Xi:[1,0,"X",9,8,7,6,5,4,3,2],
					Pi:[11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91],
					//检验18位身份证号码出生日期是否有效
					//parseFloat过滤前导零，年份必需大于等于1900且小于等于当前年份，用Date()对象判断日期是否有效。
					brithday18:function(sIdCard){
						var year=parseFloat(sIdCard.substr(6,4));
						var month=parseFloat(sIdCard.substr(10,2));
						var day=parseFloat(sIdCard.substr(12,2));
						var checkDay=new Date(year,month-1,day);
						var nowDay=new Date();
						if (1900<=year && year<=nowDay.getFullYear() && month==(checkDay.getMonth()+1) && day==checkDay.getDate()) {
							return true;
						}
					},
					//检验校验码是否有效
					validate:function(sIdCard){
						var aIdCard=sIdCard.split("");
						var sum=0;
						for (var i = 0; i < CheckIdCard.Wi.length; i++) {
							sum+=CheckIdCard.Wi[i]*aIdCard[i]; //线性加权求和
						}
						var index=sum%11;//求模，可能为0~10,可求对应的校验码是否于身份证的校验码匹配
						if (CheckIdCard.Xi[index]==aIdCard[17].toUpperCase()) {
							return true;
						}
					},
					//检验输入的省份编码是否有效
					province:function(sIdCard){
						var p2=sIdCard.substr(0,2);
						for (var i = 0; i < CheckIdCard.Pi.length; i++) {
							if(CheckIdCard.Pi[i]==p2){
								return true;
							}
						}
					}
				};
				return /^\d{17}(\d|X|x)$/.test(val) && CheckIdCard.province(val)&&CheckIdCard.validate(val) || false;
			},
			message:function(val , param , ele){
				return '请输入正确的身份证号';
			}
		}
	};
	function validate(type , key , val , param){
		if(type in validator){
			if(!validator[type].method(val , param)){
				return validator[type].message(key , param , val);
			}
		}
	}
	/*
	 * 用于验证参数有效性
	 * */
	useValidate.validator = function(rules , params){
		var message;
		for(var key in rules){
			var sts = true;
			var rule = rules[key];
			if(rule.required){
				if(message = validate('required', key , params[key])){
					message = rule.requiredMessage || rule.message || message;
					break;
				}
			}
			if(validator.required.method(params[key])){
				delete rule.required;
				for(var type in rule){
					if(message = validate(type , key , params[key] , rule[type])){
						message = rule[type + 'Message'] || rule.message || message;
						sts = false;
						break;
					}
				}
			}
			if(!sts)break;
		}
		return {valid:!message,message:message};
	};
})();