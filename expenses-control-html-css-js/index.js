const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
};

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "pages/home/home.html";
    }
})

function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
        hideLoading();
        window.location.href = "pages/home/home.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Usuário não encontrado";
    }
    if (error.code == "auth/wrong-password") {
        return "Senha inválida";
    }
    return error.message;
}

function register() {
    window.location.href = "pages/register/register.html";
}

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso!');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function isEmailValid() {
    const email = form.email().value.trim();
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password().value.trim();
    return password !== ""; 
}

function toggleEmailErrors() {
    const email = form.email().value.trim();
    form.emailRequiredError().style.display = email ? "none" : "block"; 
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block"; 
}

function togglePasswordErrors() {
    const password = form.password().value.trim();
    form.passwordRequiredError().style.display = password ? "none" : "block"; 
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();

    // Esqueceu a senha
    const recoverButton = form.recoverPassword();
    if (!emailValid) {
        recoverButton.setAttribute("disabled", "true");
    } else {
        recoverButton.removeAttribute("disabled");
    }
    
    // Entrar
    const loginButton = form.loginButton;
    if (emailValid && passwordValid) {
        loginButton.removeAttribute("disabled");
    } else {
        loginButton.setAttribute("disabled", "true");
    }
}

document.getElementById('email').addEventListener('input', () => {
    toggleButtonsDisable();
    toggleEmailErrors();
});

document.getElementById('password').addEventListener('input', () => {
    toggleButtonsDisable();
    togglePasswordErrors();
});