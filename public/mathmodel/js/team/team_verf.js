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

function captainVerf(){
	//姓名验证
	$(".captain .username input").focus(function(){
		if($(this).val()==""){
			$(".captain .username .prompt").show().siblings().hide();
		}
	});
	$(".captain .username input").blur(function(){
		var reg=/^[\u4E00-\u9FA5]{2,5}$/;
		if($(this).val()==""){
			$(".captain .username .empty").show().siblings().hide();
		}
		else if(!reg.test($(".captain .username input").val())){
			$(".captain .username .error").show().siblings().hide();
		}
		else{
			$(".captain .username .correct").show().siblings().hide();
		}
	});
	
	//邮箱验证
	$(".captain .email input").focus(function(){
		if($(this).val()==""){
			$(".captain .email .prompt").show().siblings().hide();
		}
	});
	$(".captain .email input").blur(function(){
		var reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if($(this).val()==""){
			$(".captain .email .empty").show().siblings().hide();
		}
		else if(!reg.test($(".email input").val())){
			$(".captain .email .error").show().siblings().hide();
		}
		else{
			$(".captain .email .correct").show().siblings().hide();
		}
	});
	
	//手机号验证
	$(".captain .phone_num input").focus(function(){
		if($(this).val()==""){
			$(".captain .phone_num .prompt").show().siblings().hide();
		}
	});
	$(".captain .phone_num input").blur(function(){
		var reg=/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
		if($(this).val()==""){
			$(".captain .phone_num .empty").show().siblings().hide();
		}
		else if(!reg.test($(".captain .phone_num input").val())){
			$(".captain .phone_num .error").show().siblings().hide();
		}
		else{
			$(".captain .phone_num .correct").show().siblings().hide();
		}
	});
	//院系
	$(".captain .dep").val("");
	
	$(".captain .dep").change(function(){
		var num=$(".captain .school_num .input input").val();
		var val=num.substring(0,2)+"-"+num.substring(7,8)
		var dep_v=$(".captain .dep").find("option:selected").text();
		var dep_val=dep_v+val;
		$(".captain .department .result").text(dep_val);
	})
	//队名验证
	$(".captain .team_name input").focus(function(){
		if($(this).val()==""){
			$(".captain .team_name .prompt").show().siblings().hide();
		}
	});
	$(".captain .team_name input").blur(function(){
		var reg=/^[\u4E00-\u9FA5]{2,7}$/;
		if($(this).val()==""){
			$(".captain .team_name .empty").show().siblings().hide();
		}
		else if(!reg.test($(".captain .team_name input").val())){
			$(".captain .team_name .error").show().siblings().hide();
		}
		else{
			$(".captain .team_name .correct").show().siblings().hide();
		}
	});
}
function player1Verf(){
	//学号验证
	$(".player1 .school_num input").focus(function(){
		if($(this).val()==""){
			$(".player1 .school_num .prompt").show().siblings().hide();
		}
	});
	$(".player1 .school_num input").blur(function(){
		var reg=/^[\d]{10}$/;
		if($(this).val()==""){
			$(".player1 .school_num .empty").show().siblings().hide();
		}
		else if(!reg.test($(".player1 .school_num input").val())){
			$(".player1 .school_num .error").show().siblings().hide();
		}
		else{
			$(".player1 .school_num .correct").show().siblings().hide();
		}
	});
	
	//姓名验证
	$(".player1 .username input").focus(function(){
		if($(this).val()==""){
			$(".player1 .username .prompt").show().siblings().hide();
		}
	});
	$(".player1 .username input").blur(function(){
		var reg=/^[\u4E00-\u9FA5]{2,5}$/;
		if($(this).val()==""){
			$(".player1 .username .empty").show().siblings().hide();
		}
		else if(!reg.test($(".player1 .username input").val())){
			$(".player1 .username .error").show().siblings().hide();
		}
		else{
			$(".player1 .username .correct").show().siblings().hide();
		}
	});
	
	//邮箱验证
	$(".player1 .email input").focus(function(){
		if($(this).val()==""){
			$(".player1 .email .prompt").show().siblings().hide();
		}
	});
	$(".player1 .email input").blur(function(){
		var reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if($(this).val()==""){
			$(".player1 .email .empty").show().siblings().hide();
		}
		else if(!reg.test($(".email input").val())){
			$(".player1 .email .error").show().siblings().hide();
		}
		else{
			$(".player1 .email .correct").show().siblings().hide();
		}
	});
	
	//手机号验证
	$(".player1 .phone_num input").focus(function(){
		if($(this).val()==""){
			$(".player1 .phone_num .prompt").show().siblings().hide();
		}
	});
	$(".player1 .phone_num input").blur(function(){
		var reg=/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
		if($(this).val()==""){
			$(".player1 .phone_num .empty").show().siblings().hide();
		}
		else if(!reg.test($(".player1 .phone_num input").val())){
			$(".player1 .phone_num .error").show().siblings().hide();
		}
		else{
			$(".player1 .phone_num .correct").show().siblings().hide();
		}
	});
	//院系
	$(".player1 .dep").val("");
	
	$(".player1 .dep").change(function(){
		var num=$(".player1 .school_num .input input").val();
		var val=num.substring(0,2)+"-"+num.substring(7,8)
		var dep_v=$(".player1 .dep").find("option:selected").text();
		var dep_val=dep_v+val;
		$(".player1 .department .result").text(dep_val);
	})
}

function player2Verf(){
	//学号验证
	$(".player2 .school_num input").focus(function(){
		if($(this).val()==""){
			$(".player2 .school_num .prompt").show().siblings().hide();
		}
	});
	$(".player2 .school_num input").blur(function(){
		var reg=/^[\d]{10}$/;
		if($(this).val()==""){
			$(".player2 .school_num .empty").hide().siblings().hide();
		}
		else if(!reg.test($(".player2 .school_num input").val())){
			$(".player2 .school_num .error").show().siblings().hide();
		}
		else{
			$(".player2 .school_num .correct").show().siblings().hide();
		}
	});
	
	//姓名验证
	$(".player2 .username input").focus(function(){
		if($(this).val()==""){
			$(".player2 .username .prompt").show().siblings().hide();
		}
	});
	$(".player2 .username input").blur(function(){
		var reg=/^[\u4E00-\u9FA5]{2,5}$/;
		if($(this).val()==""){
			$(".player2 .username .empty").hide().siblings().hide();
		}
		else if(!reg.test($(".player2 .username input").val())){
			$(".player2 .username .error").show().siblings().hide();
		}
		else{
			$(".player2 .username .correct").show().siblings().hide();
		}
	});
	
	//邮箱验证
	$(".player2 .email input").focus(function(){
		if($(this).val()==""){
			$(".player2 .email .prompt").show().siblings().hide();
		}
	});
	$(".player2 .email input").blur(function(){
		var reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if($(this).val()==""){
			$(".player2 .email .empty").hide().siblings().hide();
		}
		else if(!reg.test($(".email input").val())){
			$(".player2 .email .error").show().siblings().hide();
		}
		else{
			$(".player2 .email .correct").show().siblings().hide();
		}
	});
	
	//手机号验证
	$(".player2 .phone_num input").focus(function(){
		if($(this).val()==""){
			$(".player2 .phone_num .prompt").show().siblings().hide();
		}
	});
	$(".player2 .phone_num input").blur(function(){
		var reg=/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
		if($(this).val()==""){
			$(".player2 .phone_num .empty").hide().siblings().hide();
		}
		else if(!reg.test($(".player2 .phone_num input").val())){
			$(".player2 .phone_num .error").show().siblings().hide();
		}
		else{
			$(".player2 .phone_num .correct").show().siblings().hide();
		}
	});
	//院系
	$(".player2 .dep").val("");
	
	$(".player2 .dep").change(function(){
		var num=$(".player2 .school_num .input input").val();
		var val=num.substring(0,2)+"-"+num.substring(7,8)
		var dep_v=$(".player2 .dep").find("option:selected").text();
		var dep_val=dep_v+val;
		$(".player2 .department .result").text(dep_val);
	})
	
	//检验验证码
	$(".player2 .verf_code input").blur(function(){
		var verf_code=sessionStorage.getItem("verf_code");
		if($(this).val()=="请输入验证码"||$(this).val()==""){
			$(".player2 .verf_code .empty").show().siblings().hide();
		}
		else if($(this).val().toLowerCase()!=verf_code.toLowerCase()){
			$(".player2 .verf_code .error").show().siblings().hide();
		}
		else{
			$(".player2 .verf_code .correct").show().siblings().hide();
		}
	});
}