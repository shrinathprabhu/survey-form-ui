import Zango from 'zangodb';

// if (!('indexedDB' in window)) {
//     global.indexedDB = require('fake-indexeddb');
//     global.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');
// }
let db = new Zango.Db('openforms', ['forms']);

export async function fetchForms() {
    return await db.collection('forms').find().toArray();
}

export async function saveForms(forms) {
    await db.collection('forms').remove({});
    await db.collection('forms').insert(forms);
    return;
}

export default {
    fetchForms,
    saveForms
}