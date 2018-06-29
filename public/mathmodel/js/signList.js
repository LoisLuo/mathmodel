var signList={
	config: {
		num: 0,
		server: "http://loisluo.com:3001",
		getList: "/app/sign_up/list",
	},
	item:function(list,i){
		var teamname=list.teamname==null?"个人":list.teamname;
		var username1=list.username1==null?"":list.username1;
		var username2=list.username2==null?"":list.username2;
		var email1=list.email1==null?"":list.email1;
		var email2=list.email2==null?"":list.email2;
		var department1=list.department1==null?"":list.department1;
		var department2=list.department2==null?"":list.department2;
		var remark=list.remark==null?"":list.remark;
		
		
		
		var tpl=[
		'<tr class="content">',
			'<td><div class="ser_num">{@id}</div></td>',
			'<td><div class="teamname">{@teamname}</div></td>',
			'<td>',
				'<div class="captain_name part div_h">{@captain_name}</div>',
				'<div class="player1_name part div_h">{@player1_name}</div>',				
				'<div class="player2_name div_h">{@player2_name}</div>',
			'</td>',
			'<td>',
				'<div class="captain_email part div_h">{@captain_email}</div>',
				'<div class="player1_email part div_h">{@player1_email}</div>',
				'<div class="player2_email div_h">{@player2_email}</div>',
			'</td>',
			'<td>',
				'<div class="captain_department part div_h">{@captain_department}</div>',
				'<div class="player1_department part div_h">{@player1_department}</div>',
				'<div class="player2_department div_h">{@player2_department}</div>',
			'</td>',
			'<td>{@remark}</td>',
			'<td>下载</td>',
		'</tr>'
		];
		return tpl.join("").replace("{@id}",i)
						.replace("{@teamname}",teamname)
						.replace("{@captain_name}",list.username)
						.replace("{@player1_name}",username1)
						.replace("{@player2_name}",username2)
						.replace("{@captain_email}",list.email)
						.replace("{@player1_email}",email1)
						.replace("{@player2_email}",email2)
						.replace("{@captain_department}",list.department)
						.replace("{@player1_department}",department1)
						.replace("{@player2_department}",department2)
						.replace("{@remark}",remark)
	},
	getList:function(){
		var me=this;
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getList,
			async: true,
			data:{num:4,current_page:1},
			success: function(r) {
				console.log('ss')
				console.log(r);
				for(var i=0 ;i<r.result.length;i++){
					console.log(r.result[0])
					$(".contain table").append(me.item(r.result[i],i+1));
				}
				
			},
			error: function(e) {
				console.log(e);
			}
		})
	}
}
