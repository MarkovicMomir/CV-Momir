/*  6. September 2024.:
I'm changing names to be more intuitive: 'elementContent' to 'inputValue', 'usernameContent' to 'usernameInput', 'emailContent' to 'emailInput', 'passwordContent' to 'passwordInput', 'subscribeContent' to 'subscribeCheckbox', 'validator' to 'validationManager'. Also, I'm erasing 'digitCounter' as sufficient.
8. September 2024.:
Synchronizing parameter name with the names of argument functions: 'fninputValueValidation' to 'fnValidateInputValue' and dropping off the fourth (optional) parameter of the function 'validationManager()'- 'passwordElement1' because it is used only in function call for validation of the repeated password when it gets (through the argument) the value 'formPassword' (which I write directly in the function declaration and drop it off at the argument position in the function call).
11. September 2024.:
Limitation of 'username' max length to 30 characters (and correction of the error message for 'username' input and 'label' text in 'register.html') and improvement of password validation (with the correction of the error message for 'password' input and 'label' text in 'register.html').
Adding of 'use strict'.
Moving the variable declarations ('hasNumber', 'hasLowerCase' and 'hasUpperCase') to the top of the function declaration as well as the variable declarations in the global scope ('inputValue', 'usernameErrorStatus', 'usernameInput', 'emailErrorStatus', 'emailInput', 'passwordErrorStatus', 'passwordInput' & 'passwordMatchErrorStatus') to the top of it and the declaration of 'char' to the top of the 'for' loop.
*/
 
'use strict'; // Dodajem. (11. September 2024.) 
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
    let inputValue;
    let usernameErrorStatus;
    let usernameInput;
    let emailErrorStatus;
    let emailInput;
    let passwordErrorStatus;
    let passwordInput;
    let passwordMatchErrorStatus;

    function hideAllErrorMessages() { errors.forEach(errMsg => errMsg.hide()); }
    function validateUsername(username) { 
        let usernameTrimedLength = username.trim().length;
        return usernameTrimedLength >= 4 && usernameTrimedLength <= 30; }
    function validateEmail(email) {
        let re = /\S+@\S+\.\S+/; /* Jednostavan regularni izraz kojim cemo grubo proveravati ispravnost unete email adrese. */
        return re.test(email);
    }
    function validatePassword(password) {
        let passwordLength = password.length;
        // Premestio sam deklaracije promenljivih 'hasNumber', 'hasLowerCase' i 'hasUpperCase', ovde na vrh deklaracije f-je. (11. September 2024.)
        let hasNumber = false; 
        let hasLowerCase = false;
        let hasUpperCase = false;
        let hasSpecChar = false;
        let specChar = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '{', '|', '}', '~'];

        if (passwordLength < 12) {
            return false;
        }

        for (let i = 0; i < passwordLength; i++) {
            // Preimenovao sam 'c' u 'char' i premestio ovu deklaraciju na vrh 'for' petlje. (11. September 2024.):
            let char = password.charAt(i);
            if (hasNumber && hasLowerCase && hasUpperCase && hasSpecChar) {
                return true; // Prekidam čim se nađe po 1 od svakog. Na ovom mestu, a ne posle 'if' provera, zbog 'continue'!
            }
            if (char >= '0' && char <= '9') { 
                hasNumber = true;
                continue;
            } else if (char >= 'a' && char <= 'z') {
                hasLowerCase = true;
                continue;
            } else if (char >= 'A' && char <= 'Z') {
                hasUpperCase = true;
                continue;
            } else if (specChar.indexOf(char) > -1) {
                hasSpecChar = true;
            }
        }
        if (hasNumber && hasLowerCase && hasUpperCase && hasSpecChar) {
            return true; // Provera i na ovom mestu, za poslednji korak 'for' petlje, posle kojeg se kôd ne vraća na gornju proveru, na početku 'for' petlje, već izlazi iz 'for' petlje!
        }
        return false;
    }
    function validatePasswordMatch(password1, password2) {
        return password1 === password2;
    }

    // 'fnValidateInputValue' je parametar f-je, kojem se, pri njenom pozivu, kroz argument, za njegovu vrednost, dodeljuje naziv odgovarajuće f-je za validaciju unetog podatka.
    function validationManager(formElement, fnValidateInputValue, errorMsg) {
        inputValue = formElement.val();
        let inputValueStatus;
        if (formElement == formRepeatedPassword) {
            inputValueStatus = fnValidateInputValue(inputValue, formPassword.val());
        } else {
            inputValueStatus = fnValidateInputValue(inputValue);
        }
        if (inputValueStatus) {
            errorMsg.hide();
        } else {
            errorMsg.show();
        }
        return inputValueStatus
    }

    // Validacija korisnickog imena
    formUsername.on('input', () => {
        usernameErrorStatus = validationManager(formUsername, validateUsername, errorUsername);
        usernameInput = inputValue;
    });

    // Validacija email adrese
    formEmail.on('input', () => {
        emailErrorStatus = validationManager(formEmail, validateEmail, errorEmail);
        emailInput = inputValue;
    });

    // Validacija lozinke
    formPassword.on('input', () => {
        passwordErrorStatus = validationManager(formPassword, validatePassword, errorPassword);
        passwordInput = inputValue;
    });

    // Da li se lozinke poklapaju?
    formRepeatedPassword.on('input', () => {
        passwordMatchErrorStatus = validationManager(formRepeatedPassword, validatePasswordMatch, errorRepeatedPassword);
    });

    $('#theForm').submit((e) => {
        e.preventDefault();
        let subscribeCheckbox = formSubscribe.is(':checked');
        console.log(usernameErrorStatus, emailErrorStatus, passwordErrorStatus, passwordMatchErrorStatus); /* Prikaz stanja gresaka u konzoli (radi kontrole pri testiranju). */
        if (
            usernameErrorStatus && emailErrorStatus && passwordErrorStatus && passwordMatchErrorStatus
        ) { // Prosle su sve validacije, mozemo da saljemo podatke na server

            let data = {
                'username': usernameInput,
                'password': passwordInput,
                'email': emailInput,
                'subscribe': subscribeCheckbox,
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
