'use strict';
$(document).ready(function () {
    let content = $('.content');
    for (let i = 0; i <= 4; i++) {
        content.eq(i).hide('slow');
    };
    $('#navbar a').click((e) => {
        switch (e.target.innerHTML) {
            case 'Personal characteristics': content.eq(0).toggle();
            alert('You just toggled it (look down)!');
            break;
            case 'Education': content.eq(1).toggle();
            break;
            case 'Skills': content.eq(2).toggle();
            break;
            case 'Knowledge of languages': content.eq(3).toggle();
            break;
            case 'Working experience': content.eq(4).toggle();
            break;
        }
        console.log(e); // Dodajem da pogledam sta tu sve ima u 'event' objektu.
    });
})