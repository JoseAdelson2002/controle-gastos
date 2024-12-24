import admin from 'firebase-admin';

export class  TransactionRepository {

    findByUserUid(uid) {
        const snapshot = admin.firestore()
            .collection('transactions')
            .where('user.uid', '==', uid)
            .orderBy('date', 'desc')
            .get();
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
    }

    findByUid(uid) {
        const snapshot = admin.firestore()
            .collection('transactions')
            .doc(uid)
            .get();
        return snapshot.data();
    }

}