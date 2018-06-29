function textFocus(el){
	if(el.defaultValue==el.value){
		el.value='',el.style.color='#333';
	}
}
function textBlur(el){
	if(el.value==''){
		el.value=el.defaultValue;el.style.color="#999"
	}
}

function verfPerSign(){
	//姓名验证
	$(".username input").focus(function(){
		if($(this).val()==""){
			$(".username .prompt").show().siblings().hide();
		}
	});
	$(".username input").blur(function(){
		var reg=/^[\u4E00-\u9FA5]{2,5}$/;
		if($(this).val()==""){
			$(".username .empty").show().siblings().hide();
		}
		else if(!reg.test($(".username input").val())){
			$(".username .error").show().siblings().hide();
		}
		else{
			$(".username .correct").show().siblings().hide();
		}
	});
	
	//邮箱验证
	$(".email input").focus(function(){
		if($(this).val()==""){
			$(".email .prompt").show().siblings().hide();
		}
	});
	$(".email input").blur(function(){
		var reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if($(this).val()==""){
			$(".email .empty").show().siblings().hide();
		}
		else if(!reg.test($(".email input").val())){
			$(".email .error").show().siblings().hide();
		}
		else{
			$(".email .correct").show().siblings().hide();
		}
	});
	
	//手机号验证
	$(".phone_num input").focus(function(){
		if($(this).val()==""){
			$(".phone_num .prompt").show().siblings().hide();
		}
	});
	$(".phone_num input").blur(function(){
		var reg=/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
		if($(this).val()==""){
			$(".phone_num .empty").show().siblings().hide();
		}
		else if(!reg.test($(".phone_num input").val())){
			$(".phone_num .error").show().siblings().hide();
		}
		else{
			$(".phone_num .correct").show().siblings().hide();
		}
	});
	
	//院系
	$(".dep").val("");
	
	$(".dep").change(function(){
		var num=$(".personal_sign .school_num .input input").val();
		var val=num.substring(0,2)+"-"+num.substring(7,8)
		var dep_v=$(".dep").find("option:selected").text();
		var dep_val=dep_v+val;
		$(".personal_sign .department .result").text(dep_val);
		console.log(dep_val)
	})
	
	
	
	//检验验证码
	$(".verf_code input").blur(function(){
		var verf_code=sessionStorage.getItem("verf_code");
		if($(this).val()=="请输入验证码"||$(this).val()==""){
			$(".verf_code .empty").show().siblings().hide();
		}
		else if($(this).val().toLowerCase()!=verf_code.toLowerCase()){
			$(".verf_code .error").show().siblings().hide();
		}
		else{
			$(".verf_code .correct").show().siblings().hide();
		}
	});
}
