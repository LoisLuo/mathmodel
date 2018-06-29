var userInfo={
	config: {
		num: 0,
		server: "http://loisluo.com:3001",
		getList: "/app/user/getone",
		getSignList: "/app/sign_up/getone",
		signOut: "/app/sign_up/remove",
		updateUser:"/app/user/update",
	},
	getList:function(){
		var me=this;
		var username=sessionStorage.getItem("username");
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getList,
			async: true,
			data:{username:username},
			success: function(r) {
				if(r[0].sign_up == 1) {
					sessionStorage.setItem("sign",1);
					$(".sign .sign_b").hide();
					$(".sign .hasSign").show();
					$(".sign .sign_out").show();
				} else {
					sessionStorage.setItem("sign",0);
					$(".sign .sign_b").show();
					$(".sign .hasSign").hide();
					$(".sign .sign_out").hide();
				}
			},
			error: function(e) {
				console.log(e);
			}
		})
	},
	
	
	signOut:function(){
		var me=this;
		$(".sign_out input").on("click",function(){
			$(".signOutMsg").show();
		})
		$(".signOutMsg .yes").on("click",function(){
			var username=sessionStorage.getItem("username");
			$.ajax({
				type: "get",
				url: me.config.server + me.config.getSignList,
				async: true,
				data:{username:username},
				success: function(r) {
					console.log("id");
					console.log(r);
					if(r.length!=0){
						var id = r[0].id;
						var username = r[0].school_num;
						var username1 = r[0].school_num1;
						var username2 = r[0].school_num2;
						
						if(r[0].school_num2 != "") {
							me.updateUsers(username);
							me.updateUsers(username1);
							me.updateUsers(username2);
							me.removeSign(id)
						} else if(r[0].school_num1 == "") {
							me.updateUsers(username);
							me.removeSign(id)
						} else {
							me.updateUsers(username);
							me.updateUsers(username1);
							me.removeSign(id)
						}
					}
					
					
				},
				error: function(e) {
					console.log(e);
				}
			})
		})
		$(".signOutMsg .no").on("click",function(){
			$(".signOutMsg").hide();
		})
		$(".signOutMsg .cancel").on("click",function(){
			$(".signOutMsg").hide();
		})
	},
	updateUsers:function(username){
		var me=this;
		$.ajax({
			type: "post",
			url: me.config.server + me.config.updateUser,
			async: true,
			data: {
				username: username,
				sign_up:0
			},
			success: function(r) {
				console.log('yes')
			},
			error: function(e) {
				console.log(e);
			}
		})
	},
	removeSign:function(id){
		var me=this;
		$.ajax({
			type: "post",
			url: me.config.server + me.config.signOut,
			async: true,
			data: {
				ids: id
			},
			success: function(r) {
				sessionStorage.setItem("sign", 0);
				$(".sign .sign_b").show();
				$(".sign .hasSign").hide();
				$(".sign .sign_out").hide();
				$(".signOutMsg").hide();
			},
			error: function(e) {
				console.log(e);
			}
		})
	}
	
}
