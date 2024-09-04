'use strict';
$(document).ready(function () {
    let infoOnShow = $('#info-on-show');
    let infoOnHide = $('#info-on-hide');
    let content = $('.content');
    let mediaQuery = window.matchMedia("(max-width: 599px)");
    let screenIsNarrow;

    function showAlert(message) {
        $('#alert-message').text(message);
        $('#custom-alert').fadeIn();
    }
    
    $('#close-alert').on('click', function () {
        $('#custom-alert').fadeOut();
    });
    showAlert('Please consider that this page is made mostly to show JavaScript functionalities and connection with the backend (without some awesome design)!');

    infoOnShow.hide();
    infoOnHide.hide();

    for (let i = 0; i <= 4; i++) {
        content.eq(i).hide('slow');
    };

    function screenSynchronize(e) {
        let helloNarrow = $('#hello-narrow');
        let helloWide = $('#hello-wide');
        let registerBtnNarrow = $('#register-btn-narrow');
        let registerBtnWide = $('#register-btn-wide');
        let registerInfoNarrow = $('#register-info-narrow');
        let registerInfoWide = $('#register-info-wide');
        if (e.matches) {
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

    screenSynchronize(mediaQuery); // Parametar 'e' f-je 'screenSynchronize(e)' ima dvostruki karakter. U ovoj liniji mu se, preko argumenta, prosledjuje objekat 'MediaQueryList' (sacuvan u promenljivoj 'mediaQuery'), a, u narednoj liniji, mu 'eventListener' 'change' prosledjuje 'event' objekat 'MediaQueryListEvent'!
    mediaQuery.onchange = screenSynchronize;

    $('#navbar a').click((e) => {
        console.log(e.target.innerHTML); // Provera
        function contentManipulation(e) {
            let contentIsHidden;
            // F-ja za prikazivanje 2 informaciona paragrafa, na sirokim ekranima:
            function showInfo(i) { // 'i' -> index konkretnog elementa iz objekta sa dohvacenim elementima ('content').
                let InfoOnShowIsHidden;
                let InfoOnHideIsHidden;
                contentIsHidden = content.eq(i).attr('data-content-is-hidden') === 'true'; // Dohvatamo string vrednost, odgovarajuceg atributa, i konvertujemo string 'true'/'false' u 'Bool'-ovu vrednost.
                // contentIsHidden = JSON.parse(content.eq(i).attr('data-content-is-hidden')); // Moze i ovako.
                InfoOnShowIsHidden = infoOnShow.attr('data-info-on-show-is-hidden') === 'true';
                InfoOnHideIsHidden = infoOnHide.attr('data-info-on-hide-is-hidden') === 'true';
                if (screenIsNarrow) {
                    if (contentIsHidden) {
                        content.eq(i).attr('data-content-is-hidden', 'false')
                    } else if (!contentIsHidden) {
                        content.eq(i).attr('data-content-is-hidden', 'true')
                    }
                } else if (!screenIsNarrow) {
                    if (contentIsHidden) { 
                        if (InfoOnShowIsHidden) {
                            infoOnShow.show();
                            infoOnHide.hide();
                            infoOnShow.attr('data-info-on-show-is-hidden', 'false');
                            infoOnHide.attr('data-info-on-hide-is-hidden', 'true');
                        } else if (!InfoOnShowIsHidden) {
                            infoOnShow.hide('slow');
                            infoOnShow.show('slow');
                        }
                        content.eq(i).attr('data-content-is-hidden', 'false');
                    } else if (!contentIsHidden) {
                        if (InfoOnHideIsHidden) {
                            infoOnShow.hide();
                            infoOnHide.show();
                        } else if (!InfoOnHideIsHidden) {
                            infoOnHide.hide('slow');
                            infoOnHide.show('slow');
                            infoOnShow.hide();
                        }
                        infoOnShow.attr('data-info-on-show-is-hidden', 'true');
                        infoOnHide.attr('data-info-on-hide-is-hidden', 'false');
                        content.eq(i).attr('data-content-is-hidden', 'true');
                    };
                }
            };
            let sticky = $('#sticky');
            switch (e.target.innerHTML) {
                case 'Personal characteristics': content.eq(0).toggle('slow', () => { // UKLONIO SAM ažuriranje promenljive 'contentIsHidden', pošto poziv f-je 'showInfo()' (u sledećoj liniji) radi to!!!
                    showInfo(0);
                    if (contentIsHidden) {
                        e.target.style.color = 'darkgreen';
                    } else {
                        e.target.style.color = 'brown';
                    }
                    if (content.eq(0) !== "" && sticky.length && !screenIsNarrow && contentIsHidden) { // Ovo obezbeđivanje da dohvaćeni sadržaj postoji, MOŽDA, u ovakvom slučaju, NIJE POTREBNO (POŠTO znam da taj sadržaj postoji!), ALI PREDSTAVLJA DOBRU PRAKSU! TAKOĐE, ČINI MI SE INTERESANTNIM I BEZ '!screenIsNarrow'!!! Ali ću uraditi sa njim, da ne bi izgledalo kao ne prilagođeno u smislu responzivnosti! A 'contentIsHidden' obezbeđuje da se, pri sakrivanju sadržaja ne primnjuje kôd koji sledi (za animaciju sa skrolovanjem)!
                        setTimeout(() => ($('html, body').animate({
                            scrollTop: content.eq(0).offset().top - sticky.outerHeight(true)
                        }, 2000)), 1000);
                    }
                });
                    break;
                case 'Education': content.eq(1).toggle('slow', () => {
                    showInfo(1);
                    if (contentIsHidden) {
                        e.target.style.color = 'darkgreen';
                    } else {
                        e.target.style.color = 'brown';
                    }
                    if (content.eq(1) !== "" && sticky.length && !screenIsNarrow && contentIsHidden) {
                        setTimeout(() => ($('html, body').animate({
                            scrollTop: content.eq(1).offset().top - sticky.outerHeight(true)
                        }, 2000)), 1000);
                    }
                });
                    break;
                case 'Skills': content.eq(2).toggle('slow', () => {
                    showInfo(2);
                    if (contentIsHidden) {
                        e.target.style.color = 'darkgreen';
                    } else {
                        e.target.style.color = 'brown';
                    }
                    if (content.eq(2) !== "" && sticky.length && !screenIsNarrow && contentIsHidden) {
                        setTimeout(() => ($('html, body').animate({
                            scrollTop: content.eq(2).offset().top - sticky.outerHeight(true)
                        }, 2000)), 1000);
                    }
                });
                    break;
                case 'Knowledge of languages': content.eq(3).toggle('slow', () => {
                    showInfo(3);
                    if (contentIsHidden) {
                        e.target.style.color = 'darkgreen';
                    } else {
                        e.target.style.color = 'brown';
                    }
                    if (content.eq(3) !== "" && sticky.length && !screenIsNarrow && contentIsHidden) {
                        setTimeout(() => ($('html, body').animate({
                            scrollTop: content.eq(3).offset().top - sticky.outerHeight(true)
                        }, 2000)), 1000);
                    }
                });
                    break;
                case 'Working experience': content.eq(4).toggle('slow', () => {
                    showInfo(4);
                    if (contentIsHidden) {
                        e.target.style.color = 'darkgreen';
                    } else {
                        e.target.style.color = 'brown';
                    }
                    if (content.eq(4) !== "" && sticky.length && !screenIsNarrow && contentIsHidden) {
                        setTimeout(() => ($('html, body').animate({
                            scrollTop: content.eq(4).offset().top - sticky.outerHeight(true)
                        }, 2000)), 1000);
                    }
                });
                    break;
            }
        }
        if (!screenIsNarrow && e.target.innerHTML !== 'Contact') {
            e.preventDefault();
        }

        contentManipulation(e);
    });

    $('#btn-close-info-on-hide').click(() => {
        infoOnHide.hide();
    });
    $('#btn-close-info-on-show').click(() => {
        infoOnShow.hide();
    });

    $('.btn-close-content').click((e) => {
        console.log(e); // 2024.
        switch (e.target.title) { // Ovde je bitno da se, na ovakav nacin, moze pristupiti atributu 'title' u svim modernim pretrazivacima, jer je 'title' atribut objekta 'HTMLElement', kojem pristupamo preko atributa 'target' objekta 'Event' (u suprotnom bi morali da koristimo, dodatne 'id'-eve, koje bi zadali u dugmadima- <button>, za zatvaranje sadrzaja)!
            case "Close 'Personal characteristics'.": content.eq(0).hide().attr('data-content-is-hidden', 'true');
                $('#navbar a[href="#pers-char"]').css('color', 'brown');
                break;
            case "Close 'Education'.": content.eq(1).hide().attr('data-content-is-hidden', 'true');
                $('#navbar a[href="#edu"]').css('color', 'brown');
                break;
            case "Close 'Skills'.": content.eq(2).hide().attr('data-content-is-hidden', 'true');
                $('#navbar a[href="#skil"]').css('color', 'brown');
                break;
            case "Close 'Knowledge of languages'.": content.eq(3).hide().attr('data-content-is-hidden', 'true');
                $('#navbar a[href="#know-of-lang"]').css('color', 'brown');
                break;
            case "Close 'Working experience'.": content.eq(4).hide().attr('data-content-is-hidden', 'true');
                $('#navbar a[href="#work-exp"]').css('color', 'brown');
                break;
        }
    })
})
