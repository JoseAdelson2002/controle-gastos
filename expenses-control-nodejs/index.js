import express from 'express';
import admin from 'firebase-admin'

//REST API http://api.controle-gastos.com/transactions
const app = express();

admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKey.json')
});

//GET       http://api.controle-gastos.com/transactions
app.get('/transactions', async (request, response) => {
    const jwt = request.headers.authorization;
    if (!jwt) {
        response.status(401).json({message: "Usuário não autorizado"});
        return;
    }

    let decodedIdToken;
    try {
        decodedIdToken = await admin.auth().verifyIdToken(jwt, true);
    } catch (e) {
        response.status(401).json({message: "Usuário não autorizado"});
        return;
    }
    

    console.log('GET transactions');
    admin.firestore()
        .collection('transactions')
        .where('user.uid', '==', decodedIdToken.sub)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            const transactions = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }))
            response.json(transactions);
        })
})


app.listen(3000, () => console.log('API REST iniciada em http://localhost:3000'));