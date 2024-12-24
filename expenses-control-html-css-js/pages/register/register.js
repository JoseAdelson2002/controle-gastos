const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    registerButton: () => document.getElementById('register-button')
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../home/home.html";
    }
})

function onChangeEmail() {
    const email = form.email().value.trim();
    form.emailRequiredError().style.display = email? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email)? "none" : "block";

    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordMatch();

    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordMatch();

    toggleRegisterButtonDisable();
}

function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        hideLoading();
        window.location.href = "../../pages/home/home.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error) {
    if (error.code = "Firebase: The email address is already in use by another account. (auth/email-already-in-use).") {
        return ("Email já registrado");
    } 
    return error.message;
}

function validatePasswordMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
      isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return form.registerButton().setAttribute("disabled", "true"); ;
    }
    
    const password = form.password().value;
    if (!password || password.length < 6) {
        return form.registerButton().setAttribute("disabled", "true"); ;
    }
    
    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return form.registerButton().setAttribute("disabled", "true"); ;
    }

    return form.registerButton().removeAttribute("disabled");
}

