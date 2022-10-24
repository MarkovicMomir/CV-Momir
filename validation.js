$(document).ready(() => {

    // Reference na delove formulara, koje cemo kontrolisati (radi se o 'input' elementima).
    let formUsername = $('#username');
    let formEmail = $('#userEmail');
    let formPassword = $('#userPassword');
    let formRepeatedPassword = $('#repeatedPassword');
    let formSubscribe = $('#subscribe');

    // Reference na poruke o greskama (u paragrafima)
    let errorUsername = $('#errorUsername');
    let errorEmail = $('#errorEmail');
    let errorPassword = $('#errorPassword');
    let errorRepeatedPassword = $('#errorRepeatedPassword');

    // Pakujemo poruke i u niz, za jednostavniju, istovremenu, izmenu svih poruka.
    let errors = [errorUsername, errorEmail, errorPassword, errorRepeatedPassword];

    function hideAllErrorMessages() { errors.forEach(errMsg => errMsg.hide()); }
    function validateUsername(username) { return username.trim().length >= 4; }
    function validateEmail(email) {
        let re = /\S+@\S+\.\S+/; /* Jednostavan regularni izraz kojim cemo grubo proveravati ispravnost unete email adrese. */
        return re.test(email);
    }
    function validatePassword(password) {
        let lengthCheck = password.length >= 8;
        let digitCounter = 0;
        for (let i = 0; i < password.length; i++) {
            let c = password.charAt(i);
            if (c >= '0' && c <= '9') {
                digitCounter++;
                return lengthCheck;
            }
        }
        return false;
    }
    function validatePasswordMatch(password1, password2) {
        return password1 === password2;
    }

    let elementContent;
    function validator(formElement, fnElementContentValidation, errorMsg, passwordElement1) {
        elementContent = formElement.val();
        let elementContentStatus;
        if (formElement == formRepeatedPassword) {
            elementContentStatus = fnElementContentValidation(elementContent, passwordElement1.val());
        } else {
            elementContentStatus = fnElementContentValidation(elementContent);
        }
        if (elementContentStatus) {
            errorMsg.hide();
        } else {
            errorMsg.show();
        }
        return elementContentStatus
    }

    // Validacija korisnickog imena
    let usernameErrorStatus;
    let usernameContent;
    formUsername.on('input', () => {
        usernameErrorStatus = validator(formUsername, validateUsername, errorUsername);
        usernameContent = elementContent;
    });

    // Validacija email adrese
    let emailErrorStatus;
    let emailContent;
    formEmail.on('input', () => {
        emailErrorStatus = validator(formEmail, validateEmail, errorEmail);
        emailContent = elementContent;
    });

    // Validacija lozinke
    let passwordErrorStatus;
    let passwordContent;
    formPassword.on('input', () => {
        passwordErrorStatus = validator(formPassword, validatePassword, errorPassword);
        passwordContent = elementContent;
    });

    // Da li se lozinke poklapaju?
    let passwordMatchErrorStatus;
    formRepeatedPassword.on('input', () => {
        passwordMatchErrorStatus = validator(formRepeatedPassword, validatePasswordMatch, errorRepeatedPassword, formPassword);
    });

    $('#theForm').submit((e) => {
        e.preventDefault();
        let subscribeContent = formSubscribe.is(':checked');
        console.log(usernameErrorStatus, emailErrorStatus, passwordErrorStatus, passwordMatchErrorStatus); /* Prikaz stanja gresaka u konzoli (radi kontrole pri testiranju). */
        if (
            usernameErrorStatus && emailErrorStatus && passwordErrorStatus && passwordMatchErrorStatus
        ) { // Prosle su sve validacije, mozemo da saljemo podatke na server

            let data = {
                'username': usernameContent,
                'password': passwordContent,
                'email': emailContent,
                'subscribe': subscribeContent,
            };

            // I varijanta- simuliramo slanje podataka na server (jer nemamo 'backend'):

            console.log("Salju se podaci na server"); /* Poruka u konzoli, kojom oznacavamo da bi se u realnoj situaciji (pri, na serveru, postavljenom prijemnom fajlu- 'handle.php', iz atributa 'action', elementa <form>), u ovom trenutku, slali podaci na server! */
           
            // Kraj I varijante.

            console.log(data);

            // II varijanta- realan >kod< za slanje podataka na server, 'ajax'-om:

            let form = $('#theForm');
            let url = form.attr('action');
            console.log(`url=${url}`);

            $.ajax({
                // 'success' i 'error' su metodi ovog objekta (objekta u kojem se nalaze podesavanja jQuery metoda 'ajax'), koji, pri uspesnom slanju ('success'), tj. neuspesnom ('error'), u vidu odgovora sa servera, primaju podatke, koji, obicno, predstavljaju informaciju korisniku o uspesnosti slanja njegovih podataka i uspesnosti njegove registracije, a mi, ovde, napisemo kako da se ti podaci iskoriste. Pri uspelom slanju, aktivira se metod 'success', koji, sa izlaza 'backend' fajla na serveru ('handle.php'), prima podatke, npr. JSON-om, u vidu JS objekta, a pri neuspelom slanju se aktivira metod 'error', koji podrazumevano, sa servera, prima kao neki objekat 'stanja' (tj. 'statusa'), u kojem se nalaze podaci vezani za komunikaciju sa serverom! U tom objektu se, pod kljucem, 'responseText' nalazi i odgovor koji smo naveli na izlazu 'backend' fajla! Oba ova metoda ('success' i 'error') podatke, dobijene sa servera, prosledjuju na obradu, kao argument, svojim 'callback' f-jama (tzv. 'handler'-ima).
                type: "post",
                url: url,
                data: form.serialize(),
                success: function (data) {
                    if (data.success) {
                        console.log(`Podaci uspesno poslati na server na url ${url}!`);
                        console.log(data);
                        alert(data.msg);
                        $('#serverMessage').text(data.msg); // Ispis poruke korisniku! Ovo 'success' i 'msg' (u 'if'-u) su kljucevi objekta, poslatog sa servera (iz 'backend' fajla).
                    } else {
                        console.log("Greska!");
                        console.log(data);
                        alert(data.msg);
                        $('#serverMessage').text(data.msg);
                    }

                },
                error: function(e) {
                    console.log("Gresska!");
                    console.log(e);
                    alert(e.statusText);
                    $('#serverMessage').html(e.responseText);
                }
            });

            // Da bi ova varijanta radila kako treba, u realnoj situaciji bi postojao i 'backend' fajl na serveru 'handle.php' i baza podataka sa kojom bi on bio povezan!
           
            // Kraj II varijante.

        } else {
            console.log("Neuspelo slanje podataka na server, jer nisu prosle sve provere!");
            alert("Sending data to the server failed because they didn't pass the validation!");
        }
    });

    // Inicijalno sakrivamo sve poruke o greskama.
    hideAllErrorMessages();
});
