var name = "";
var phone = ";"
var address = "";
var addressBol = false;
//$("#addressBtn").on("touchstart", function() {
//	addressBol = !addressBol;
//	console.log(addressBol)
//})

$("#addAddress").on("touchstart", function() {
	addressBol = false;
	name = $("#takeName").val();
	phone = $("#contactPhone").val();
	address = $("#address").val();



	if(name == "" || phone == "" || address == "") {
		mui.toast('请填完整收货人信息');
		return;
	}
	
		if($("#addressBtn").prop("class")=="mui-switch mui-switch-mini"){
			addressBol=false;
		}else{
			addressBol=true;
		}
	
	
			
	
		//保存数据
			console.log(name, phone, address, addressBol)
		var adrJson= {
			"name":name,
			"phone":phone,
			"address":address,
			"addressBol":addressBol ? "addressBlock":'addressNone'
		}
		app.setAddress(adrJson)
		
		$("#takeName").val("");
		$("#contactPhone").val("");
		$("#address").val("");
		$("#addressBtn").removeClass("mui-active");
		$("#addressBtn").children().css("transform", "translate(0px, 0px)")
		mui.toast('添加成功')
		
		setTimeout(function(){
			mui.openWindow({  
				url:"lsc-address-compile.html", 
				id:"lsc-address-compile.html"
			})
			
		},500)
		


})

//点击收货地址
$(".mui-table-view-cell").on("touchstart", function() {
	console.log(111)
	mui.openWindow({
		url: "zmt-car-sureBook.html",
		id: "zmt-car-sureBook.html"
	})
})