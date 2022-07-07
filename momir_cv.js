'use strict';
$(document).ready(function () {
    /* mediaQuery = window.matchMedia('(max-width: 599px)');
    function screen_check(x) {
        if (x.matches) {
            
        }
    } */ // Možda, da promenim 'href' atribute linkova, da se pri kliku na link pokaže taj deo stranice.
    let infoOnShow = $('#info-on-show');
    let infoOnHide = $('#info-on-hide');
    let content = $('.content');
    infoOnShow.hide();
    infoOnHide.hide();
    for (let i = 0; i <= 4; i++) {
        content.eq(i).hide('slow');
    };
    let hiddenContent;
    $('#navbar a').click((e) => {
        e.preventDefault();
        // F-ja za prikazivanje 2 informaciona paragrafa:
        function showInfo(i) {
            let hiddenInfoOnShow;
            let hiddenInfoOnHide;
            hiddenContent = content.eq(i).attr('data-hidden-content');
            hiddenInfoOnShow = infoOnShow.attr('data-hidden-info-on-show');
            hiddenInfoOnHide = infoOnHide.attr('data-hidden-info-on-hide');
            if (hiddenContent == 'yes' && hiddenInfoOnShow == 'yes') {
                infoOnShow.show();
                infoOnHide.hide();
                infoOnShow.attr('data-hidden-info-on-show', 'no');
                infoOnHide.attr('data-hidden-info-on-hide', 'yes');
                content.eq(i).attr('data-hidden-content', 'no');
            } else if (hiddenContent == 'no' && hiddenInfoOnHide == 'no') {
                infoOnHide.hide('slow');
                infoOnHide.show('slow');
                infoOnShow.hide();
                infoOnShow.attr('data-hidden-on-show', 'yes');
                infoOnHide.attr('data-hidden-on-hide', 'no');
                content.eq(i).attr('data-hidden-content', 'yes');
            } else if (hiddenContent == 'no') {
                infoOnShow.hide();
                infoOnHide.show();
                infoOnShow.attr('data-hidden-info-on-show', 'yes');
                infoOnHide.attr('data-hidden-info-on-hide', 'no');
                content.eq(i).attr('data-hidden-content', 'yes');
            } else if (hiddenContent == 'yes' && hiddenInfoOnShow == 'no') {
                infoOnShow.hide('slow');
                infoOnShow.show('slow');
                content.eq(i).attr('data-hidden-content', 'no');
            };
        };
        switch (e.target.innerHTML) {
            case 'Personal characteristics': content.eq(0).toggle('slow', function () {
                hiddenContent = content.eq(0).attr('data-hidden-content');
                if (hiddenContent == 'yes') {
                    alert('You just have showed some content at this page to read! Please take a look!');
                    // content.attr('data-hidden-content', 'no');
                } else if (hiddenContent == 'no') {
                    // content.attr('data-hidden-content', 'yes');
                }
                showInfo(0);
            });
                /* showInfo(0); */
                break;
            case 'Education': content.eq(1).toggle('slow', showInfo(1));
                break;
            case 'Skills': content.eq(2).toggle('slow', showInfo(2));
                break;
            case 'Knowledge of languages': content.eq(3).toggle('slow', showInfo(3));
                break;
            case 'Working experience': content.eq(4).toggle('slow', showInfo(4));
                break;
        }
        // console.log(e);
    });
})