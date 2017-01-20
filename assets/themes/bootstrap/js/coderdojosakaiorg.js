/*
 * CoderDojo堺用Javascript
 */

$(function() {
    var topBtn = $('#page-top');
    topBtn.hide();
    //スクロールが300に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    //スクロールしてトップ
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 300);
        return false;
    });
});

$('.dropdown-menu a').on('click', function(){
    if (window.innerWidth <= 1200) {
        $('.navbar-toggle').click();
    }
});
