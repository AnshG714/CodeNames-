const express = require('express');
const bodyParser = require('body-parser');
const functions = require('./firebase-functions')

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/getItems', async (req, res) => {
  const result = await functions.getItems(req.query.board_id)
  res.send(result)
});

/** 
 * Items is structured like this: {name: "cat", checked: false}, {name: "dog", checked: true}
*/
app.post('/addBoard', async (req, res) => {
  const { board_id, items } = req.body;
  const id = await functions.addBoard(board_id, items)
  res.send(id);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
