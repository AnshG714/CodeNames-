const express = require('express');
const bodyParser = require('body-parser');
const functions = require('./firebase-functions')
const cors = require('cors');
const path = require('path')

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));


app.get('/getItems', async (req, res) => {
  const result = await functions.getItems(req.query.board_id)
  res.send(result)
});

/** 
 * Items is structured like this: {name: "cat", checked: false}, {name: "dog", checked: true}
*/
app.post('/addBoard', async (req, res) => {
  const { board_id, items, gameInfo } = req.body;
  const id = await functions.addBoard(board_id, items, gameInfo)
  res.send(id);
});

app.post('/updateBoard', async (req, res) => {
  const { board_id, itemName, color, index, gameInfo } = req.body;
  await functions.updateBoard(board_id, itemName, color, index, gameInfo)
  res.send({ success: true })
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => console.log(`App listening on port ${port}!`));
