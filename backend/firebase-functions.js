const Database = require('./firebase-config')

const db = Database.db

const itemsCollection = db.collection('items');

export const getItems = async (boardID) => {
  const items = await itemsCollection.doc(boardID).get();
  return items.docs.map(doc => doc.data())
}

export const streamBoardData = async (boardID, observer) => {
  return itemsCollection.doc(boardID).onSnapshot(observer)
}