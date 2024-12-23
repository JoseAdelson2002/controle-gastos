const firebaseConfig = {
    apiKey: "AIzaSyDkl29Rp3a24l3xOdlQl2utGMJXZ573W4o",
    authDomain: "controle-de-gastos-39737.firebaseapp.com",
    projectId: "controle-de-gastos-39737",
    storageBucket: "controle-de-gastos-39737.firebasestorage.app",
    messagingSenderId: "395480642857",
    appId: "1:395480642857:web:41f4c91a70ed2d53993338",
    measurementId: "G-T1RPT1FF3Q"
};
firebase.initializeApp(firebaseConfig);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        console.log("Persistência da sessão habilitada");
    })
    .catch(error => {
        console.error("Erro ao configurar persistência da sessão:", error);
    });
