/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if(loginInfo.account.length < 5) {
			console.log("abc");
			return callback('账号最短为 5 个字符');
		}
		if(loginInfo.password.length < 6) {
			console.log("ddd");
			return callback('密码最短为 6 个字符');
		}
		//cq----mui ajax请求新浪服务器
		mui.ajax('http://10.class3.applinzi.com/shoppingBar/login.php', {
			data: {
				"action": "login",
				"account": loginInfo.account,
				"password": hex_md5(loginInfo.password)
			},
			dataType: 'text', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				var dataJson = JSON.parse(data)
				console.log(dataJson.error);
				if(dataJson.error) {
					return owner.createState(loginInfo.account, callback); //---------------
				} else {
					return callback('用户名或密码错误');
				}
			},
			error: function(xhr, type, errorThrown) {
				console.log(type);
				console.log(errorThrown);

			}
		});
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		//		state.token = "token123456789";
		var time = new Date().getTime()
		state.token = hex_md5(name + time);
		owner.setState(state);
		//cq--保存token到服务器
		mui.ajax('http://10.class3.applinzi.com/shoppingBar/login.php', {
			data: {
				"action": "createState",
				"token": state.token,
				"account": state.account
			},
			dataType: 'text', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				var dataJson = JSON.parse(data)
				if(dataJson.error) {
					console.log("success"); //---------------
				} else {
					console.log("fail");
				}
			},
			error: function(xhr, type, errorThrown) {
				console.log(type);
				console.log(errorThrown);
			}
		});
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		regInfo.email = regInfo.email || '';
		if(regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if(regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if(!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		//cq----加密密码
		regInfo.password = hex_md5(regInfo.password);
		//cq-----上传注册信息到sae
		mui.ajax('http://10.class3.applinzi.com/shoppingBar/login.php', {
			data: {
				"action": "reg",
				"account": regInfo.account,
				"password": regInfo.password,
				"email": regInfo.email,
			},
			dataType: 'text', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				var dataJson = JSON.parse(data)
				console.log(dataJson);
				//判断是否重复注册
				if(dataJson.repeat==1){
					return callback('该用户名已注册');
				}
				if(dataJson.repeat==2){
					return callback('该邮箱已注册');
				}				
				if(dataJson.error) {
					console.log("success"); //---------------
					return callback();
				} else {
					console.log("fail");
					return callback();
				}
			},
			error: function(xhr, type, errorThrown) {
				console.log(type);
				console.log(errorThrown);
			}
		});	
//		return callback();
//		var users = JSON.parse(localStorage.getItem('$users') || '[]');
//		users.push(regInfo);
//		localStorage.setItem('$users', JSON.stringify(users));
		
		
		
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * ----------cq---验证服务器端的token------
	 **/
	owner.getStateByser = function(token,callback) {
		mui.ajax('http://10.class3.applinzi.com/shoppingBar/login.php', {
			data: {
				"action": "getState",
				"token": token
			},
			dataType: 'text', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				tokenFind = JSON.parse(data)
				return callback(tokenFind);
			},
			error: function(xhr, type, errorThrown) {
				console.log(type);
				console.log(errorThrown);
			}
		});
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};
 	/*
 	 获取cq--load的flag,控制mainpage_flag
 	 * */
	owner.getMain = function() {
		var stateText = localStorage.getItem('$main') || "{}";
		return JSON.parse(stateText);
	}; 
	//设置flag
	owner.setMain = function(main) {
		main = main || {};
		localStorage.setItem('$main', JSON.stringify(main));
	};
	/*cq get user name*/
	owner.getName = function() {
		var stateText = localStorage.getItem('$name') || "{}";
		return JSON.parse(stateText);
	}; 
	//设置flag
	owner.setName = function(name) {
		name = name || {};
		localStorage.setItem('$name', JSON.stringify(name));
	};		
	
	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if(!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	/**
	 * 获取本地是否安装客户端
	 **/
	owner.isInstalled = function(id) {
		if(id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if(mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch(e) {}
		} else {
			switch(id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));