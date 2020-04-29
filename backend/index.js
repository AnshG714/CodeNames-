const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://codenames-plus.firebaseio.com',
});

const db = admin.firestore();

const app = express();
const port = 8080;
app.use(bodyParser.json());



app.listen(port, () => console.log(`App listening on port ${port}!`));
