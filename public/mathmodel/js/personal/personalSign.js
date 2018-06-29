var personalSign = {
	config: {
		server: "http://loisluo.com:3001",
		signup: "/app/sign_up/personal_create",
		updateUser:"/app/user/update"
	},
	doSign: function() {
		var me = this;
		var dep=$(".result").text();
		var remark=$(".personal_sign .remark .remark_input #remark_text").val();
		var data = {department:dep,remark:remark}
		var fromdata = $("#person_form").serializeArray();
		$.each(fromdata, function(i, item) {
			data[item.name] = item.value;
		})
		var school_num=data.school_num;
		$.ajax({
			type: "post",
			url: me.config.server + me.config.signup,
			async: true,
			data: data,
			success: function(r) {
				$.ajax({
					type: "post",
					url: me.config.server + me.config.updateUser,
					async: true,
					data: {
						username: school_num,
						sign_up: 1
					},
					success: function(r) {
						//成功之后跳页
						sessionStorage.setItem("sign",1)
						window.location.href = "#/signlist";												window.location.href = "#/signlist";
				
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			error: function(e) {
				
				console.log(e);
			}
		});
	},
	

	
}