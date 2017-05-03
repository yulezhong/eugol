/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.getAddress = function() {
		var stateText = localStorage.getItem('$address') || "{}";
		return JSON.parse(stateText);
	}; 
	//设置flag
	owner.setAddress= function(address) {
		address = address || {};
		var stateText = localStorage.getItem('$address') || "{}";
		if(stateText=="{}"){
			localStorage.setItem('$address', stateText.substring(0,stateText.length-1)+"" +JSON.stringify(address)+"}");
		}else{
			localStorage.setItem('$address', stateText.substring(0,stateText.length-1)+"," +JSON.stringify(address)+"}");
		}
		console.log(stateText.substring(0,stateText.length-1)+"," +JSON.stringify(address)+"}")
		
	};	
}(mui, window.app = {}));