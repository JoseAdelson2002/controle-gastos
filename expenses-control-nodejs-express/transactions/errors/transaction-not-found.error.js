export class TransactionNotFoundError extends Error {

    constructor() {
        super("Transacao nao encontrada");
        this.name = "transaction-not-found";
        this.code = 404;
    }

}