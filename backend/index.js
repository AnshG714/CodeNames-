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

const itemsCollection = db.collection('items'); 

app.get('/getItems', async (req,res) =>{
  const items = await itemsCollection.get();
  const cells = [];
  for (let doc of items.docs){
    let cell = doc.data();
    cells.push(cell);
  }
  res.send(cells);
});

app.post('/addBoard', async (req, res) => {
  const items = req.body;
  const myDoc = await itemsCollection.add(items);
  res.send(myDoc.id);
});


app.listen(port, () => console.log(`App listening on port ${port}!`));
