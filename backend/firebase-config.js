const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://codenames-plus.firebaseio.com',
});

const db = admin.firestore();

module.exports = db