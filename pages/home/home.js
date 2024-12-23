function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout!');
    })
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        user.getIdToken().then(token => console.log(token))
        findTransactions(user);
    }
})

function newTransaction() {
    window.location.href = "../transaction/transaction.html"
}

function findTransactions(user) {
    showLoading();
    transactionService.findByUser(user)
        .then(transactions => {
            hideLoading();
            addTransactionsToScreen(transactions);
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao recuperar transações');
        })
}

function addTransactionsToScreen(transactions) {
    const orderedlist = document.getElementById('transactions');
    
    transactions.forEach(transaction => {
        const li = createTransactionListItem(transaction);

        li.appendChild(createDeleteButton(transaction));

        li.appendChild(createParagraph(formatDate(transaction.date)));
        li.appendChild(createParagraph(formatMoney(transaction.money)));
        li.appendChild(createParagraph(transaction.transactionType));
        if (transaction.description) {
            li.appendChild(createParagraph(transaction.description));
        }

        orderedlist.appendChild(li);
    });
}

function createParagraph(value) {
    const element = document.createElement('p');
    element.innerHTML = value;
    return element;
}

function createTransactionListItem(transaction) {
    const li = document.createElement('li');
    li.classList.add(transaction.type);
    li.id = transaction.uid;
    li.addEventListener('click', () => {
        window.location.href = "../transaction/transaction.html?uid=" + transaction.uid;
    })
    return li;   
}

function createDeleteButton(transaction) {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Remover";
    deleteButton.classList.add('outline', 'danger');
    deleteButton.addEventListener('click', event => {
        event.stopPropagation();
        askRemoveTransaction(transaction);
    })
    return deleteButton;
}

function askRemoveTransaction(transaction) {
    const shouldRemove = confirm('Deseja remover a transação?');
    if (shouldRemove) {
        removeTransaction(transaction);
    }
}

function removeTransaction(transaction) {
    showLoading();

    transactionService.remove(transaction)
        .then(() => {
            hideLoading();
            document.getElementById(transaction.uid).remove();
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao remover transação');
        })
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
    return `${money.currency} ${formatToTwoDecimals(money.value)}`;
}

function formatToTwoDecimals(value) {
    return new Intl.NumberFormat('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(value);
}