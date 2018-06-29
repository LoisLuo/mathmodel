var index={
	config: {
		server: "http://loisluo.com:3001",
		signup: "/app/sign_up/team_create",
		getUser: "/app/user/getone",
		updateUser:"/app/user/update",
	},
	clickItem:function(){
		var me=this;
		//点击变色
//		$(".nav_item").on("click", function() {
//			$(this).addClass("changecolor").siblings().removeClass("changecolor")
//		})
		
		$(".personnal_sign").on("click",function(){
			if(sessionStorage.getItem("token")==null){
				$(".loginBox").show();
				$(".loginBox").load("login.html")
			}else{
				var username=sessionStorage.getItem("username");
				$.ajax({
					type: "get",
					url: me.config.server + me.config.getUser,
					async: true,
					data: {
						username: username
					},
					success: function(r) {
						if(r[0].sign_up == 1) {
							sessionStorage.setItem("sign",1);
							$(".contian_box").load("hasSign.html");
						} else {
							$(".contian_box").load("personalSign.html");
						}
					},
					error: function(e) {
						console.log(e);
					}
				});
			}
		})
		
		$(".team_sign").on("click",function(){
			if(sessionStorage.getItem("token")==null){
				$(".loginBox").show();
				$(".loginBox").load("login.html")
			}else{
				var username=sessionStorage.getItem("username");
				$.ajax({
					type: "get",
					url: me.config.server + me.config.getUser,
					async: true,
					data: {
						username: username
					},
					success: function(r) {
						if(r[0].sign_up == 1) {
							sessionStorage.setItem("sign",1);
							$(".contian_box").load("hasSign.html");
						} else {
							$(".contian_box").load("teamSign.html");
						}
					},
					error: function(e) {
						console.log(e);
					}
				});
			}
		})
	}
}
