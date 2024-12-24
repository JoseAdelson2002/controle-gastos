export class TransactionUidNotInformedError extends Error {

    constructor() {
        super("Uid da transacao nao informado");
        this.codename = "transaction-uid-not-informed";
        this.code = 500;
    }

}