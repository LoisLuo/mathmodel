var login = {
	state: {
		token: "",
		userId: ""
	},
	config: {
		server: "http://loisluo.com:3001",
		login: "/app/login"
	},
	
	doLogin: function() {
		var me = this;
		var data = {}
		var fromdata = $(".fm_login").serializeArray();
		$.each(fromdata, function(i, item) {
			data[item.name] = item.value;
		})

		$.ajax({
			type: "post",
			url: me.config.server + me.config.login,
			async: true,
			data: data,
			success: function(r) {
				console.log(r);
//					me.state.token = r.token;
//					me.state.userId = r.userId[0].id;
					sessionStorage.setItem("token", r.token);
					sessionStorage.setItem("username", r.username);
					sessionStorage.setItem("userId", r.userId[0].id);
					
					$(".logged .username").text(r.username);
					me.closeLoginModal();
					me.isLogin();
					
					location.reload();
				
			},
			error: function(e) {
				$(".loginBoxErr").css({"visibility":"visible"});
				console.log(e);
			}
		});
	},
	
	logout: function(showdrop) {
		var me=this;
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("username");
		sessionStorage.removeItem("userId");
		me.noLogin();
		
		location.reload();
		
	},
	//判断是否登录
	logOrnot: function() {
		var me = this;
		if(sessionStorage.getItem("token") != null) {
			
			me.isLogin();
			var username=sessionStorage.getItem("username")
			$(".logged .username").text(username);
		} else {
			me.noLogin();
		}
	},
	showLoginModal: function() {
		$(".loginBox").show();
	},
	closeLoginModal: function() {
		$(".loginBox").hide();
	},
	//登录显示图片
	isLogin: function() {
		$(".logged").show().siblings().hide();
	},
	//没登陆显示文字
	noLogin: function() {
		$(".nologined").show().siblings().hide();
	},
	
	

		
	
		

	
}