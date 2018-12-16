$(document).ready(function() {
		var html = "";
		var today = new Date();
		var limitTime = "";
		var startTime = "";
		var yobi = new Array("日","月","火","水","木","金","土");
		$.ajax({
			url: "https://connpass.com/api/v1/event/?series_id=2620&count=5&order=2",
			dataType: "jsonp",
		})
		// 成功処理
		.done(function (data) {
			$.each(data.events, function(index,value){
				var ti = new Date(value.started_at);
				if(today < ti){
					limitTime = "";
				}else{
					limitTime = "done";
				}
				startTime = ti.getFullYear() + "/" + (ti.getMonth()+1) + "/" + ti.getDate() + "("+ yobi[ti.getDay()]+") "+("00"+ti.getHours()).slice(-2)+":"+("00"+ti.getMinutes()).slice(-2);
				html = html+"<li class='"+limitTime+"'><a href='"+value.event_url+"' target='_blank'><p class=''><span>"+startTime+"</span></p><p class='title'><span>"+value.title+"</span></p><p class='sub'><span>"+value.address+" "+value.place+"</span></p></a></li>";
			})
			$(".connpass").html("<ul>"+html+"</ul><p style='margin-top: 20px;text-align: right;'>※最新５件を表示しています。</p>");
		})
		// 失敗処理
		.fail(function () {
			$(".connpass").html("<p>イベント一覧の読み込みに失敗しました。<br>申し込みサイト（下のボタン）にてイベントの確認をお願いします。</p>");
		});
});