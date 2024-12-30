import express, { json } from 'express';
import admin from 'firebase-admin';
import { transactionsRouter } from './transactions/routes.js';

const app = express();

// Inicializa o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKey.json')
});

// Configuração do CORS
app.use((request, response, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:5500']; // Adicione as origens permitidas aqui
  const origin = request.headers.origin;

  if (allowedOrigins.includes(origin)) {
    response.header("Access-Control-Allow-Origin", origin); // Permite a origem se estiver na lista
  }

  response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH,DELETE");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // Permite preflight de requisições OPTIONS
  if (request.method === "OPTIONS") {
    return response.sendStatus(200);
  }

  next();
});

app.use(json());

// Roteador de transações
app.use('/transactions', transactionsRouter);

// Inicia o servidor
app.listen(3000, () => console.log('API REST iniciada em http://localhost:3000'));
