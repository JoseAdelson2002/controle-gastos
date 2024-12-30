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

        const token = await currentUser.getIdToken();
        console.log("Token gerado:", token); // Log para verificar o token gerado

        const xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                const json = JSON.parse(this.responseText);
                if (this.status !== 200) {
                    console.error("Erro na requisição:", json); // Log do erro
                    reject(json);
                } else {
                    resolve(json);
                }
            }
        };

        if (params) {
            xhr.send(JSON.stringify(params));
        } else {
            xhr.send();
        }
    });
}
