import express from "express";

//REST API http://api.controle-gastos.com/transactions
const app = express();

//GET       http://api.controle-gastos.com/transactions
app.get('/transactions', (request, response) => {
    console.log('GET transactions');
    response.json([{id: 1}]);
})



app.listen(3000, () => console.log('API REST iniciada em http://localhost:3000'));