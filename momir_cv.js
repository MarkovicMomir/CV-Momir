'use strict';
$(document).ready(function () {
    let infoOnShow = $('#info-on-show');
    let infoOnHide = $('#info-on-hide');
    let content = $('.content');
    infoOnShow.hide();
    infoOnHide.hide(); // Možda da, za prethodne 2 linije napravim f-je!
    for (let i = 0; i <= 4; i++) {
        content.eq(i).hide('slow');
    };
    let mediaQuery = window.matchMedia("(max-width: 599px)");
    let screen_width;
    function screen_check(x) {
        let helloNarrow = $('#hello-narrow');
        let helloWide = $('#hello-wide');
        let registerBtnNarrow = $('#register-btn-narrow');
        let registerBtnWide = $('#register-btn-wide');
        let registerInfoNarrow = $('#register-info-narrow');
        let registerInfoWide = $('#register-info-wide');
        if (x.matches) {
            screen_width = 'narrow';
            infoOnShow.hide();
            infoOnHide.hide();
            helloNarrow.show();
            helloWide.hide();
            registerBtnNarrow.show();
            registerBtnWide.hide();
            registerInfoNarrow.show();
            registerInfoWide.hide();
        } else {
            screen_width = 'wide';
            helloNarrow.hide();
            helloWide.show();
            registerBtnNarrow.hide();
            registerBtnWide.show();
            registerInfoNarrow.hide();
            registerInfoWide.show();
        };
    }
    screen_check(mediaQuery);
    mediaQuery.addEventListener('change', screen_check);
    /* let infoOnShow = $('#info-on-show');
    let infoOnHide = $('#info-on-hide');
    let content = $('.content');
    infoOnShow.hide();
    infoOnHide.hide();
    for (let i = 0; i <= 4; i++) {
        content.eq(i).hide('slow');
    }; */
    let hiddenContent;
    $('#navbar a').click((e) => {
        console.log(e.target.innerHTML); // Provera
        // F-ja za prikazivanje 2 informaciona paragrafa:
        function showInfo(i) {
            let hiddenInfoOnShow;
            let hiddenInfoOnHide;
            hiddenContent = content.eq(i).attr('data-hidden-content');
            hiddenInfoOnShow = infoOnShow.attr('data-hidden-info-on-show');
            hiddenInfoOnHide = infoOnHide.attr('data-hidden-info-on-hide');
            if (screen_width == 'wide') {
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
            }
            if (screen_width == 'narrow') {
                if (hiddenContent == 'no') {
                    content.eq(i).attr('data-hidden-content', 'yes')
                }
                if (hiddenContent == 'yes') {
                    content.eq(i).attr('data-hidden-content', 'no')
                }
            }
        };
        function content_manipulation (e) {
            switch (e.target.innerHTML) {
                case 'Personal characteristics': content.eq(0).toggle('slow', function () {
                    hiddenContent = content.eq(0).attr('data-hidden-content');
                    if (hiddenContent == 'yes' && screen_width == 'wide') {
                        alert('You just have showed some content at this page to read! Please take a look!');
                    }
                    showInfo(0);
                });
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
        }
        if (screen_width == 'wide' && e.target.innerHTML !== 'Contact') {
            e.preventDefault();
        }
        content_manipulation(e);
    });
    // mediaQuery.addEventListener('change', screen_check);
})
