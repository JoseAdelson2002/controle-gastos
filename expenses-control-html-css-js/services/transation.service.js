const transactionService = {
    findByUser: () => {
        return callApi({
            method: "GET",
            url: "http://localhost:3000/transactions"
        });
    },
    findByUid: uid => {
        return callApi({
            method: "GET",
            url: `http://localhost:3000/transactions/${uid}`
        });
    },
    remove: transaction => {
        return callApi({
            method: "DELETE",
            url: `http://localhost:3000/transactions/${transaction.uid}`
        });
    },
    save: transaction => {
        return callApi({
            method: "POST",
            url: "http://localhost:3000/transactions",
            params: transaction
        });
    },
    update: transaction => {
        return callApi({
            method: "PATCH",
            url: `http://localhost:3000/transactions/${transaction.uid}`,
            params: transaction
        });
    }
};

function callApi({ method, url, params }) {
    return new Promise(async (resolve, reject) => {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            reject('Usuário não autenticado');
            return;
        }

        const xhr = new XMLHttpRequest();

        // Abrindo a requisição HTTP com o método e URL
        xhr.open(method, url, true);

        // Adicionando cabeçalhos de autorização e tipo de conteúdo
        xhr.setRequestHeader('Authorization', await firebase.auth().currentUser.getIdToken());
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        // Função de callback para verificar o status da requisição
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                const json = JSON.parse(this.responseText);
                if (this.status !== 200) {
                    reject(json);  // Rejeitando a Promise em caso de erro
                } else {
                    resolve(json);  // Resolvendo a Promise com a resposta
                }
                console.log(this.responseText);
            }
        };

        // Enviando a requisição com os parâmetros, se houver
        if (params) {
            xhr.send(JSON.stringify(params)); // Para POST, PUT, PATCH, etc.
        } else {
            xhr.send(); // Para GET e DELETE, não é necessário enviar corpo
        }
    });
}
