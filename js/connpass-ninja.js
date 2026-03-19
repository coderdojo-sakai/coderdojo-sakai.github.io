// connpass イベント一覧を表示する
// イベントデータは GitHub Actions が定期的に data/events.json へ更新する
$(document).ready(function() {
	var yobi = ["日","月","火","水","木","金","土"];
	var today = new Date();

	fetch("/data/events.json")
	.then(function(response) {
		if (!response.ok) {
			throw new Error("HTTP error: " + response.status);
		}
		return response.json();
	})
	.then(function(data) {
		var html = "";
		$.each(data.events, function(_index, value) {
			var ti = new Date(value.started_at);
			var limitTime = today < ti ? "" : "done";
			var startTime = ti.getFullYear() + "/" + (ti.getMonth() + 1) + "/" + ti.getDate()
				+ "(" + yobi[ti.getDay()] + ") "
				+ ("00" + ti.getHours()).slice(-2) + ":" + ("00" + ti.getMinutes()).slice(-2);
			html += "<li class='" + limitTime + "'>"
				+ "<a href='" + value.url + "' target='_blank'>"
				+ "<p class=''><span>" + startTime + "</span></p>"
				+ "<p class='title'><span>" + value.title + "</span></p>"
				+ "<p class='sub'><span>" + value.address + " " + value.place + "</span></p>"
				+ "</a></li>";
		});
		$(".connpass").html("<ul>" + html + "</ul><p style='margin-top: 20px;text-align: right;'>※最新５件を表示しています。</p>");
	})
	.catch(function() {
		$(".connpass").html("<p style='color: #AAA;'>イベント一覧の読み込みに失敗しました。<br>外部サイト（connpass）にてイベントの確認をお願いします。</p>");
	});
});
