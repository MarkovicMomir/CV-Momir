/*  September 6, 2024.:
I'm changing names to be more intuitive: 'elementContent' to 'inputValue', 'usernameContent' to 'usernameInput', 'emailContent' to 'emailInput', 'passwordContent' to 'passwordInput', 'subscribeContent' to 'subscribeCheckbox', 'validator' to 'validationManager'. Also, I'm erasing 'digitCounter' as sufficient.
September 8, 2024.:
Synchronizing parameter name with the names of argument functions: 'fninputValueValidation' to 'fnValidateInputValue' and dropping off the fourth (optional) parameter of the function 'validationManager()'- 'passwordElement1' because it is used only in function call for validation of the repeated password when it gets (through the argument) the value 'formPassword' (which I write directly in the function declaration and drop it off at the argument position in the function call).
September 11, 2024.:
Limitation of 'username' max length to 30 characters (and correction of the error message for 'username' input and 'label' text in 'register.html') and improvement of password validation (with the correction of the error message for 'password' input and 'label' text in 'register.html').
Adding of 'use strict'.
Moving the variable declarations ('hasNumber', 'hasLowerCase' and 'hasUpperCase' as well as 'inputValue', 'usernameErrorStatus', 'usernameInput', 'emailErrorStatus', 'emailInput', 'passwordErrorStatus', 'passwordInput' & 'passwordMatchErrorStatus') to the top of the corresponding function declaration and the declaration of 'char' to the top of the 'for' loop.
September 16, 2024.:
Adding of English comments.
*/
 
'use strict'; // Adding. (September 11, 2024) [Serbian: Dodajem. (11. septembar 2024.)] 
$(document).ready(() => {

    // References to parts of the form that we will control (referring to 'input' elements). [Serbian: Reference na delove formulara, koje cemo kontrolisati (radi se o 'input' elementima).]
    let formUsername = $('#username');
    let formEmail = $('#userEmail');
    let formPassword = $('#userPassword');
    let formRepeatedPassword = $('#repeatedPassword');
    let formSubscribe = $('#subscribe');

    // References to error messages (in paragraphs). [Serbian: Reference na poruke o greskama (u paragrafima)]
    let errorUsername = $('#errorUsername');
    let errorEmail = $('#errorEmail');
    let errorPassword = $('#errorPassword');
    let errorRepeatedPassword = $('#errorRepeatedPassword');

    // We pack the messages into an array for easier simultaneous editing of all messages. [Serbian: Pakujemo poruke i u niz, za jednostavniju, istovremenu, izmenu svih poruka.]
    let errors = [errorUsername, errorEmail, errorPassword, errorRepeatedPassword];
    
    // I moved the variable declarations ('inputValue', 'usernameErrorStatus', 'usernameInput', 'emailErrorStatus', 'emailInput', 'passwordErrorStatus', 'passwordInput' & 'passwordMatchErrorStatus') here to the top of function declaration. (September 11, 2024.) [Serbian: Premestio sam deklaracije promenljivih ('inputValue', 'usernameErrorStatus', 'usernameInput', 'emailErrorStatus', 'emailInput', 'passwordErrorStatus', 'passwordInput' i 'passwordMatchErrorStatus'), ovde na vrh deklaracije f-je. (11. septembar 2024.)]
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
        let re = /\S+@\S+\.\S+/; /* A simple regular expression to roughly check the validity of the entered email address. [Serbian: Jednostavan regularni izraz kojim cemo grubo proveravati ispravnost unete email adrese.] */
        return re.test(email);
    }
    function validatePassword(password) {
        let passwordLength = password.length;
        // I moved the declarations of 'hasNumber', 'hasLowerCase', and 'hasUpperCase' variables here to the top of the function declaration. (September 11, 2024) [Serbian: Premestio sam deklaracije promenljivih 'hasNumber', 'hasLowerCase' i 'hasUpperCase', ovde na vrh deklaracije f-je. (11. septembar 2024.)]
        let hasNumber = false; 
        let hasLowerCase = false;
        let hasUpperCase = false;
        let hasSpecChar = false;
        let specChar = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '{', '|', '}', '~'];

        if (passwordLength < 12) {
            return false;
        }

        for (let i = 0; i < passwordLength; i++) {
            // Renamed 'c' to 'char' and moved this declaration here to the top of the 'for' loop. (September 11, 2024) [Serbian: Preimenovao sam 'c' u 'char' i premestio ovu deklaraciju ovde, na vrh 'for' petlje. (11. septembar 2024.)]:
            let char = password.charAt(i);
            if (hasNumber && hasLowerCase && hasUpperCase && hasSpecChar) {
                return true; // I stop as soon as one of each is found. At this point, not after the 'if' checks, because of the 'continue'! (September 11, 2024.) [Serbian: Prekidam čim se nađe po 1 od svakog. Na ovom mestu, a ne posle 'if' provera, zbog 'continue'! (11. septembar 2024.)]
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
            return true; // A check at this point, for the last step of the 'for' loop, after which the code does not return to the top check at the start of the 'for' loop, but exits the 'for' loop! [Serbian: Provera i na ovom mestu, za poslednji korak 'for' petlje, posle kojeg se kôd ne vraća na gornju proveru, na početku 'for' petlje, već izlazi iz 'for' petlje!]
        }
        return false;
    }
    function validatePasswordMatch(password1, password2) {
        return password1 === password2;
    }

    // 'fnValidateInputValue' is a function parameter that is assigned the name of the appropriate function for validation of the entered data (through the argument in the function call). [Serbian: 'fnValidateInputValue' je parametar f-je, kojem se, pri njenom pozivu, kroz argument, za njegovu vrednost, dodeljuje naziv odgovarajuće f-je za validaciju unetog podatka.]
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

    // Username validation [Serbian: Validacija korisnickog imena]
    formUsername.on('input', () => {
        usernameErrorStatus = validationManager(formUsername, validateUsername, errorUsername);
        usernameInput = inputValue;
    });

    // Email address validation [Serbian: Validacija email adrese]
    formEmail.on('input', () => {
        emailErrorStatus = validationManager(formEmail, validateEmail, errorEmail);
        emailInput = inputValue;
    });

    // Password validation [Serbian: Validacija lozinke]
    formPassword.on('input', () => {
        passwordErrorStatus = validationManager(formPassword, validatePassword, errorPassword);
        passwordInput = inputValue;
    });

    // Do the passwords match? [Serbian: Da li se lozinke poklapaju?]
    formRepeatedPassword.on('input', () => {
        passwordMatchErrorStatus = validationManager(formRepeatedPassword, validatePasswordMatch, errorRepeatedPassword);
    });

    $('#theForm').submit((e) => {
        e.preventDefault();
        let subscribeCheckbox = formSubscribe.is(':checked');
        console.log(usernameErrorStatus, emailErrorStatus, passwordErrorStatus, passwordMatchErrorStatus); /* Display of error status in the console (for control during testing). [Serbian: Prikaz stanja gresaka u konzoli (radi kontrole pri testiranju).] */
        if (
            usernameErrorStatus && emailErrorStatus && passwordErrorStatus && passwordMatchErrorStatus
        ) { // All validations passed, we can send the data to the server. [Serbian: Prosle su sve validacije, mozemo da saljemo podatke na server]

            let data = {
                'username': usernameInput,
                'password': passwordInput,
                'email': emailInput,
                'subscribe': subscribeCheckbox,
            };

            // First option - we simulate sending the data to the server (since we don’t have a 'backend' on 'Netlify' -> 'https://momir.netlify.app'). [Serbian: I varijanta- simuliramo slanje podataka na server (jer nemamo 'backend' na 'Netlify'-u -> 'https://momir.netlify.app'))]:

            console.log("Data are being sent to the server"); /* Console message indicating that in a real situation (with a reception file 'handle.php' set on the server, from the 'action' attribute of the <form> element), the data would now be sent to the server! [Serbian: Poruka u konzoli, kojom oznacavamo da bi se u realnoj situaciji (pri, na serveru, postavljenom prijemnom fajlu- 'handle.php', iz atributa 'action', elementa <form>), u ovom trenutku, slali podaci na server!] */
           
            // End of the first option. [Serbian: Kraj I varijante.]

            console.log(data);

            // Second option - real code for sending data to the server using 'ajax' [Serbian: II varijanta- realan >kod< za slanje podataka na server, 'ajax'-om]:

            let form = $('#theForm');
            let url = form.attr('action');
            console.log(`url=${url}`);

            $.ajax({
                // 'success' and 'error' are methods of this object (the object containing the jQuery 'ajax' method settings), which, upon successful ('success') or unsuccessful ('error') sending, receive data in response from the server, usually representing information to the user about the success of sending their data and registration. Here, we write how to use that data. Upon successful sending, the 'success' method is activated, receiving data from the server’s 'backend' file ('handle.php') output in the form of a JS object, typically JSON. Upon failure, the 'error' method is triggered, which by default receives something like a 'state' object from the server, containing communication status data! This object includes the 'responseText' key with the server’s output specified in the 'backend' file! Both of these methods ('success' and 'error') pass the data received from the server as an argument to their 'callback' functions (also known as 'handlers'). [Serbian: 'success' i 'error' su metodi ovog objekta (objekta u kojem se nalaze podesavanja jQuery metoda 'ajax'), koji, pri uspesnom slanju ('success'), tj. neuspesnom ('error'), u vidu odgovora sa servera, primaju podatke, koji, obicno, predstavljaju informaciju korisniku o uspesnosti slanja njegovih podataka i uspesnosti njegove registracije, a mi, ovde, napisemo kako da se ti podaci iskoriste. Pri uspelom slanju, aktivira se metod 'success', koji, sa izlaza 'backend' fajla na serveru ('handle.php'), prima podatke, npr. JSON-om, u vidu JS objekta, a pri neuspelom slanju se aktivira metod 'error', koji podrazumevano, sa servera, prima kao neki objekat 'stanja' (tj. 'statusa'), u kojem se nalaze podaci vezani za komunikaciju sa serverom! U tom objektu se, pod kljucem, 'responseText' nalazi i odgovor koji smo naveli na izlazu 'backend' fajla! Oba ova metoda ('success' i 'error') podatke, dobijene sa servera, prosledjuju na obradu, kao argument, svojim 'callback' f-jama (tzv. 'handler'-ima).]
                type: "post",
                url: url,
                data: form.serialize(),
                success: function (data) {
                    if (data.success) {
                        console.log(`Data were successfully sent to the server at the URL ${url}!`);
                        console.log(data);
                        alert(data.msg);
                        $('#serverMessage').text(data.msg); // Display a message to the user! The 'success' and 'msg' (in the 'if' statement) are keys of the object sent from the server (from the 'backend' file). [Serbian: Ispis poruke korisniku! Ovo 'success' i 'msg' (u 'if'-u) su kljucevi objekta, poslatog sa servera (iz 'backend' fajla).]
                    } else {
                        console.log("Errorr!");
                        console.log(data);
                        alert(data.msg);
                        $('#serverMessage').text(data.msg);
                    }

                },
                error: function(e) {
                    console.log("Errorrr!");
                    console.log(e);
                    alert(e.statusText);
                    $('#serverMessage').html(e.responseText);
                }
            });

            // For this option to work correctly in a real situation, a 'backend' file would exist on the server, 'handle.php', and a database it connects to (as I have done on: http://momir.atwebpages.com)! [Serbian: Da bi ova varijanta radila kako treba, u realnoj situaciji bi postojao i 'backend' fajl na serveru 'handle.php' i baza podataka sa kojom bi on bio povezan (kao što sam uradio na: http://momir.atwebpages.com)!]
           
            // End of the second option. [Serbian: Kraj II varijante.]

        } else {
            console.log("Failed to send data to the server because not all validations passed!!");
            alert("Sending data to the server failed because they didn't pass the validation!");
        }
    });

    // Initially, we hide all error messages. [Serbian: Inicijalno sakrivamo sve poruke o greskama.]
    hideAllErrorMessages();
});
