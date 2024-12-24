import { auth } from './firebase-init.js';
import { onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

// Formulário e seus elementos
const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
};

// Observa mudanças no estado do usuário
onAuthStateChanged(auth, user => {
    if (user) {
        window.location.href = "pages/home/home.html";
    }
});

// Função de login
function login() {
    showLoading();
    const email = form.email().value;
    const password = form.password().value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            hideLoading();
            window.location.href = "pages/home/home.html";
        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        });
}

// Função para recuperar senha
function recoverPassword() {
    showLoading();
    const email = form.email().value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            hideLoading();
            alert('Email enviado com sucesso!');
        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        });
}
