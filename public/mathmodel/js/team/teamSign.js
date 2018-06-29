var teamSign = {
	config: {
		server: "http://loisluo.com:3001",
		signup: "/app/sign_up/team_create",
		getUser: "/app/user/getone",
		updateUser:"/app/user/update",
	},
	doSign: function() {
		var me = this;

		var num = $(".captain .school_num .input input").val();
		var val = num.substring(0, 2) + "-" + num.substring(7, 8)
		var dep_v = $(".captain .dep").find("option:selected").text();
		var dep = dep_v + val;

		var num1 = $(".player1 .school_num .input input").val();
		var val1 = num1.substring(0, 2) + "-" + num1.substring(7, 8)
		var dep_v1 = $(".player1 .dep").find("option:selected").text();
		var dep1 = dep_v1 + val1;

		var num2 = $(".player2 .school_num .input input").val();
		var val2 = num2.substring(0, 2) + "-" + num2.substring(7, 8)
		var dep_v2 = $(".player2 .dep").find("option:selected").text();
		var dep2 = dep_v2 + val2;
		
		var remark=$(".player2 .remark .remark_input #remark_text").val();

		if(dep2 == "-") {
			dep2 = "";
		}
		var data = {
			department: dep,
			department1: dep1,
			department2: dep2,
			remark:remark
		}
		var fromdata = $("#captain_form").serializeArray();
		$.each(fromdata, function(i, item) {
			data[item.name] = item.value;
		})
		var fromdata1 = $("#player1_form").serializeArray();
		$.each(fromdata1, function(i, item) {
			data[item.name] = item.value;
		})
		var fromdata2 = $("#player2_form").serializeArray();
		$.each(fromdata2, function(i, item) {
			data[item.name] = item.value;
		})
		
		//检查队员1
		var username1 = data.school_num1
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getUser,
			async: true,
			data: {username:username1},
			success: function(r) {
				if(r.length != 0) {
					if(r[0].sign_up==1){
						$(".msgBox").show();
						$(".msgBox .hasSign").show();
						$(".msgBox .hasSign .text").text(username1)
					}else{
						//检查队员2
						var username2 = data.school_num2
						if(username2 != "") {
							$.ajax({
								type: "get",
								url: me.config.server + me.config.getUser,
								async: true,
								data: {username:username2},
								success: function(r) {
									if(r.length != 0) {
										if(r[0].sign_up == 1) {
											$(".msgBox").show();
											$(".msgBox .hasSign").show();
											$(".msgBox .hasSign .text").text(username2)
										}else{
											$.ajax({
												type: "post",
												url: me.config.server + me.config.signup,
												async: true,
												data: data,
												success: function(r) {
													//成功之后更新
													$.ajax({
														type: "post",
														url: me.config.server + me.config.updateUser,
														async: true,
														data: {username:data.school_num1,sign_up:1},
														success: function(r) {
															//成功之后更新
															$.ajax({
																type: "post",
																url: me.config.server + me.config.updateUser,
																async: true,
																data: {username:data.school_num2,sign_up:1},
																success: function(r) {
																	
																	$.ajax({
																		type: "post",
																		url: me.config.server + me.config.updateUser,
																		async: true,
																		data: {
																			username: data.school_num,
																			sign_up: 1
																		},
																		success: function(r) {
																			//成功之后跳页
																			sessionStorage.setItem("sign",1)
																			window.location.href = "#/signlist";													window.location.href = "#/signlist";
																			console.log('ssssss')
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
														error: function(e) {
															console.log(e);
														}
													});
													
												},
												error: function(e) {
													console.log(e);
												}
											});
										}
										
									} else {
										$(".msgBox").show();
										$(".msgBox .noexit").show();
										$(".msgBox .noexit .text").text(username2)
									}
									
								},
								error: function(e) {
									console.log(e);
								}
							});
						} else {
							$.ajax({
								type: "post",
								url: me.config.server + me.config.signup,
								async: true,
								data: data,
								success: function(r) {
									//成功之后更新
									$.ajax({
										type: "post",
										url: me.config.server + me.config.updateUser,
										async: true,
										data: {
											username: data.school_num1,
											sign_up: 1
										},
										success: function(r) {
											$.ajax({
												type: "post",
												url: me.config.server + me.config.updateUser,
												async: true,
												data: {
													username: data.school_num,
													sign_up: 1
												},
												success: function(r) {
													//成功之后跳页
													console.log('ssssss')
													sessionStorage.setItem("sign",1)
													window.location.href = "#/signlist";

												},
												error: function(e) {
													console.log(e);
												}
											});
											
											//成功之后跳页
//											window.location.href = "#/signlist";
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
						}
					}
				} else {
					$(".msgBox").show();
					$(".msgBox .noexit").show();
					$(".msgBox .noexit .text").text(username1)
				}
				
				

			},
			error: function(e) {
				console.log(e);
			}
		});
	},
	check: function(username) {
		var me = this;
		console.log(username)
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getUser,
			async: true,
			data: {
				username: username
			},
			success: function(r) {
				if(r.length != 0) {
					if(r[0].sign_up==1){
						$(".msgBox").show();
						$(".msgBox .hasSign").show();
						$(".msgBox .hasSign .text").text(username)
					}else{
//						window.location.href = "#/signlist";
					}
					
				} else {
					$(".msgBox").show();
					$(".msgBox .noexit").show();
					$(".msgBox .noexit .text").text(username)
				}

			},
			error: function(e) {
				console.log(e);
			}
		});
	}

}