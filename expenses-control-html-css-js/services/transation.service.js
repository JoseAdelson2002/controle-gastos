const transactionService = {
    findByUser: user => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(
                "GET",
                "http://localhost:3000/transactions",
                true
            );

            xhr.onreadystatechange = function() {
                console.log(this.responseText);
            }

            xhr.send();
        })
        return firebase.firestore()
            .collection('transactions')
            .where('user.uid', '==', user.uid)
            .orderBy('date', 'desc')
            .get()
            .then(snapshot => {
                hideLoading();
            return snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }));
        })
    },
    findByUid: uid => {
        return firebase.firestore()
        .collection('transactions')
        .doc(uid)
        .get()
        .then(doc => {
            return doc.data();
        })
    } ,
    remove: transaction => {
        return firebase.firestore()
        .collection('transactions')
        .doc(transaction.uid)
        .delete()
    },
    save: transaction => {
        return  firebase.firestore()
        .collection('transactions')
        .add(transaction);
    },
    update: transaction => 
        firebase.firestore()
        .collection('transactions')
        .doc(getTransactionUid())
        .update(transaction)
}