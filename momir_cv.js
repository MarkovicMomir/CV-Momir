'use strict';
$(document).ready(function () {
    let infoOnShow = $('#info-on-show');
    let infoOnHide = $('#info-on-hide');
    let content = $('.content');

    infoOnShow.hide();
    infoOnHide.hide();

    for (let i = 0; i <= 4; i++) {
        content.eq(i).hide('slow');
    };

    let mediaQuery = window.matchMedia("(max-width: 599px)");
    let screenIsNarrow;
    function screen_check(x) {
        let helloNarrow = $('#hello-narrow');
        let helloWide = $('#hello-wide');
        let registerBtnNarrow = $('#register-btn-narrow');
        let registerBtnWide = $('#register-btn-wide');
        let registerInfoNarrow = $('#register-info-narrow');
        let registerInfoWide = $('#register-info-wide');
        if (x.matches) {
            screenIsNarrow = true;
            infoOnShow.hide();
            infoOnHide.hide();
            helloNarrow.show();
            helloWide.hide();
            registerBtnNarrow.show();
            registerBtnWide.hide();
            registerInfoNarrow.show();
            registerInfoWide.hide();
        } else {
            screenIsNarrow = false;
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

    let contentIsHidden;
    $('#navbar a').click((e) => {
        console.log(e.target.innerHTML); // Provera
        // F-ja za prikazivanje 2 informaciona paragrafa, na sirokim ekranima:
        function showInfo(i) {
            let InfoOnShowIsHidden;
            let InfoOnHideIsHidden;
            contentIsHidden = content.eq(i).attr('data-content-is-hidden') === 'true'; // Dohvatamo string vrednost, odgovarajuceg atributa, i konvertujemo string 'true'/'false' u 'Bool'-ovu vrednost.
            // contentIsHidden = JSON.parse(content.eq(i).attr('data-content-is-hidden')); // Moze i ovako.
            InfoOnShowIsHidden = infoOnShow.attr('data-info-on-show-is-hidden') === 'true';
            InfoOnHideIsHidden = infoOnHide.attr('data-info-on-hide-is-hidden') === 'true';
            if (!screenIsNarrow) {
                if (contentIsHidden && InfoOnShowIsHidden) {
                    infoOnShow.show();
                    infoOnHide.hide();
                    infoOnShow.attr('data-info-on-show-is-hidden', 'false');
                    infoOnHide.attr('data-info-on-hide-is-hidden', 'true');
                    content.eq(i).attr('data-content-is-hidden', 'false');
                } else if (!contentIsHidden && !InfoOnHideIsHidden) {
                    infoOnHide.hide('slow');
                    infoOnHide.show('slow');
                    infoOnShow.hide();
                    infoOnShow.attr('data-info-on-show-is-hidden', 'true');
                    infoOnHide.attr('data-info-on-hide-is-hidden', 'false');
                    content.eq(i).attr('data-content-is-hidden', 'true');
                } else if (!contentIsHidden) {
                    infoOnShow.hide();
                    infoOnHide.show();
                    infoOnShow.attr('data-info-on-show-is-hidden', 'true');
                    infoOnHide.attr('data-info-on-hide-is-hidden', 'false');
                    content.eq(i).attr('data-content-is-hidden', 'true');
                } else if (contentIsHidden && !InfoOnShowIsHidden) {
                    infoOnShow.hide('slow');
                    infoOnShow.show('slow');
                    content.eq(i).attr('data-content-is-hidden', 'false');
                };
            }
            if (screenIsNarrow) {
                if (!contentIsHidden) {
                    content.eq(i).attr('data-content-is-hidden', 'true')
                }
                if (contentIsHidden) {
                    content.eq(i).attr('data-content-is-hidden', 'false')
                }
            }
        };

        function content_manipulation(e) {
            switch (e.target.innerHTML) {
                case 'Personal characteristics': content.eq(0).toggle('slow', function () {
                    contentIsHidden = content.eq(0).attr('data-content-is-hidden') === 'true'; // Dohvatamo string vrednost, odgovarajuceg atributa, i konvertujemo string 'true'/'false' u 'Bool'-ovu vrednost.
                    if (contentIsHidden && !screenIsNarrow) {
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
        if (!screenIsNarrow && e.target.innerHTML !== 'Contact') {
            e.preventDefault();
        }

        content_manipulation(e);
    });
})
