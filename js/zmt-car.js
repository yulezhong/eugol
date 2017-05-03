
var alltotal=0;
var allNumber=0;
var checkbol=false;
var clothNumber=0



mui(".zmt-car-ul").on("tap","label",function () {
//	checkAllFn();
	
	//判断是否被点击
	var _index=$(this).parent().parent().index();

		var bol=!$("#zmt-car-li input").eq(_index).prop("checked");
		console.log(bol)
		
		
		var checkAllBol=true;
		for(var i=0;i<$(".zmt-car-ul input").length;i++){
			
			
			if(i==_index&&bol){
				console.log("选中")
				continue;
			}
			if($(".zmt-car-ul input").eq(i).prop("checked")==false||bol==false){
				checkAllBol=false;
			}
		}
		$(".allCheckP input").prop("checked",checkAllBol);
		if(checkAllBol){
			checkbol=true;
		}else{
			checkbol=false;
		}
		
		
		
		
		var number=$(".zmt-number").eq(_index).text().substr(1,5);
		var price=$(".zmt-price").eq(_index).text().substr(1,7);
		if(bol){
			clothNumber++;
			alltotal +=eval(number*price);
			allNumber=allNumber+parseInt(number);
		}else{
			clothNumber--;
			alltotal -=eval(number*price);
			allNumber=allNumber-parseInt(number);
		}
//		console.log(number,allNumber)
		$(".zmt-alltotal").text("￥"+alltotal);
		$(".zmt-allNumber").text("("+allNumber+")")
		

});

	//传值
	document.getElementsByClassName("zmt-allNumber")[0].parentNode.addEventListener("tap",function(){
		console.log(11)
		var webview = mui.openWindow({
			url:"zmt-car-sureBook.html",
			id:"zmt-car-sureBook.html",
			extras:{
				alltotal:alltotal,
				clothNumber:clothNumber
			}
		})

	})
	
	//点击全选
	
	mui(".allCheckP").on("tap","label",function(){
		
		 alltotal=0;
		 allNumber=0;
		
		checkbol=!checkbol
		console.log(checkbol)
		if(checkbol){
			console.log("全选")
			$(".zmt-car-ul input").prop("checked",true);
			
			for(var i=0;i<$(".zmt-car-ul input").length;i++){
				var number=$(".zmt-number").eq(i).text().substr(1,5);
				var price=$(".zmt-price").eq(i).text().substr(1,7);
				alltotal +=eval(number*price);
				allNumber=allNumber+parseInt(number);
			}
			
		}else{
			console.log("反选")
			$(".zmt-car-ul input").prop("checked",false);
			checkedBol=true;

		}
		
		$(".zmt-alltotal").text("￥"+alltotal);
		$(".zmt-allNumber").text("("+allNumber+")")
		
	})
	
	
	
	