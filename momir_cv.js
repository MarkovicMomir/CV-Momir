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

    screenSynchronize(mediaQuery); // The 'e' parameter in the 'screenSynchronize(e)' function has a dual role. In this line, it receives the 'MediaQueryList' object (stored in the 'mediaQuery' variable) via an argument, and in the next line, the 'change' event listener passes the 'MediaQueryListEvent' event object! [Serbian: Parametar 'e' f-je 'screenSynchronize(e)' ima dvostruki karakter. U ovoj liniji mu se, preko argumenta, prosledjuje objekat 'MediaQueryList' (sacuvan u promenljivoj 'mediaQuery'), a, u narednoj liniji, mu 'eventListener' 'change' prosledjuje 'event' objekat 'MediaQueryListEvent'!]
    mediaQuery.onchange = screenSynchronize;

    $('#navbar a').click((e) => {
        console.log(e.target.innerHTML); // Check [Serbian: Provera]
        function contentManipulation(e) {
            let contentIsHidden;
            let sticky = $('#sticky'); // Since I missed moving this declaration here earlier, I’m doing it now.  [Serbian: Posto ovu deklaraciju ranije nisam premestio ovde, radim to sada.]
            let InfoOnShowIsHidden;
            // Function for displaying two informational paragraphs on wide screens: [Serbian: F-ja za prikazivanje 2 informaciona paragrafa, na sirokim ekranima:]
            function showInfo(i) { // 'i' -> the index of a specific element from the fetched elements object ('content'). [Serbian: 'i' -> index konkretnog elementa iz objekta sa dohvacenim elementima ('content').]
                let InfoOnHideIsHidden;
                contentIsHidden = content.eq(i).attr('data-content-is-hidden') === 'true'; // We fetch the string value of the corresponding attribute and convert the string 'true'/'false' into a Boolean value. [Serbian: Dohvatamo string vrednost, odgovarajuceg atributa, i konvertujemo string 'true'/'false' u 'Bool'-ovu vrednost.]
                // contentIsHidden = JSON.parse(content.eq(i).attr('data-content-is-hidden')); // That can also be done like this. [Serbian: Moze i ovako.]
                InfoOnShowIsHidden = infoOnShow.attr('data-info-on-show-is-hidden') === 'true';
                InfoOnHideIsHidden = infoOnHide.attr('data-info-on-hide-is-hidden') === 'true';
                if (!screenIsNarrow) {
                    if (contentIsHidden) { 
                        if (InfoOnShowIsHidden) {
                            infoOnShow.show();
                            infoOnHide.hide();
                        } else if (!InfoOnShowIsHidden) {
                            infoOnShow.hide('slow');
                            infoOnShow.show('slow');
                        }
                    } else if (!contentIsHidden) {
                        if (InfoOnHideIsHidden) {
                            infoOnShow.hide();
                            infoOnHide.show();
                            } else if (!InfoOnHideIsHidden) {
                            infoOnHide.hide('slow');
                            infoOnHide.show('slow');
                            infoOnShow.hide();
                        }
                    };
                }
            };
            function adjustDataAtrrs(i) { // 'i' -> the index of a specific element from the fetched elements object ('content'). [Serbian: 'i' -> index konkretnog elementa iz objekta sa dohvacenim elementima ('content').]
                if (screenIsNarrow) {
                    if (contentIsHidden) {
                        content.eq(i).attr('data-content-is-hidden', 'false')
                    } else if (!contentIsHidden) {
                        content.eq(i).attr('data-content-is-hidden', 'true')
                    }
                } else if (!screenIsNarrow) {
                    if (contentIsHidden) { 
                        if (InfoOnShowIsHidden) {
                            infoOnShow.attr('data-info-on-show-is-hidden', 'false');
                            infoOnHide.attr('data-info-on-hide-is-hidden', 'true');
                        }
                        content.eq(i).attr('data-content-is-hidden', 'false');
                    } else if (!contentIsHidden) {
                        infoOnShow.attr('data-info-on-show-is-hidden', 'true');
                        infoOnHide.attr('data-info-on-hide-is-hidden', 'false');
                        content.eq(i).attr('data-content-is-hidden', 'true');
                    };
                }
            };
            switch (e.target.innerHTML) {
                case 'Personal characteristics': content.eq(0).toggle('slow', () => { // I REMOVED updating the 'contentIsHidden' variable since the 'showInfo()' function call (in the next line) handles that!!! [Serbian: UKLONIO SAM ažuriranje promenljive 'contentIsHidden', pošto poziv f-je 'showInfo()' (u sledećoj liniji) radi to!!!]
                    showInfo(0);
                    adjustDataAtrrs(0);
                    if (contentIsHidden) {
                        e.target.style.color = 'darkgreen';
                    } else {
                        e.target.style.color = 'brown';
                    }
                    if (content.eq(0) !== "" && sticky.length && !screenIsNarrow && contentIsHidden) { // This ensurance, that the fetched content exists, MAY NOT BE NECESSARY in this case (SINCE I know the content exists!), BUT IT IS GOOD PRACTICE! ALSO, I FIND IT INTERESTING EVEN WITHOUT '!screenIsNarrow'!!! But I will include it to avoid looking like unadjusted for responsivity! And 'contentIsHidden' ensures that, when the user is hiding the content, the following code (for scroll animation) is not executed! [Serbian: Ovo obezbeđivanje da dohvaćeni sadržaj postoji, MOŽDA, u ovakvom slučaju, NIJE POTREBNO (POŠTO znam da taj sadržaj postoji!), ALI PREDSTAVLJA DOBRU PRAKSU! TAKOĐE, ČINI MI SE INTERESANTNIM I BEZ '!screenIsNarrow'!!! Ali ću uraditi sa njim, da ne bi izgledalo kao ne prilagođeno u smislu responzivnosti! A 'contentIsHidden' obezbeđuje da se, pri sakrivanju sadržaja ne primnjuje kôd koji sledi (za animaciju sa skrolovanjem)!]
                        setTimeout(() => ($('html, body').animate({
                            scrollTop: content.eq(0).offset().top - sticky.outerHeight(true)
                        }, 2000)), 1000);
                    }
                });
                    break;
                case 'Education': content.eq(1).toggle('slow', () => {
                    showInfo(1);
                    adjustDataAtrrs(1);
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
                    adjustDataAtrrs(2);
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
                    adjustDataAtrrs(3);
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
                    adjustDataAtrrs(4);
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
        console.log(e); // September 4, 2024
        switch (e.target.title) { // The important thing here is that, in this way, we can access the 'title' attribute in all modern browsers because the 'title' is an attribute of the 'HTMLElement' object, accessed via the 'target' attribute of the 'Event' object (otherwise, we would have to use additional 'id's assigned to the buttons <button> for closing the content)! [Serbian: Ovde je bitno da se, na ovakav nacin, moze pristupiti atributu 'title' u svim modernim pretrazivacima, jer je 'title' atribut objekta 'HTMLElement', kojem pristupamo preko atributa 'target' objekta 'Event' (u suprotnom bi morali da koristimo, dodatne 'id'-eve, koje bi zadali u dugmadima- <button>, za zatvaranje sadrzaja)!]
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
