const db = require('./firebase-config')

const itemsCollection = db.collection('game-rooms');

const getItems = async (boardID) => {
  const items = await itemsCollection.doc(boardID).get();
  return items.docs.map(doc => doc.data())
}

const addBoard = async (board_id, items) => {
  try {
    await itemsCollection.doc(board_id).set(items);
    return board_id
  } catch (err) {
    throw new Error(err.message)
  }
}

const streamBoardData = async (boardID, observer) => {
  return itemsCollection.doc(boardID).onSnapshot(observer)
}

module.exports = {
  getItems,
  addBoard,
  streamBoardData
}