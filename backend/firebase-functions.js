const db = require("./firebase-config");

const itemsCollection = db.collection("game-rooms");

const getItems = async (boardID) => {
  const items = await itemsCollection.doc(boardID).get();
  return items.data();
};

const addBoard = async (board_id, items, gameInfo) => {
  try {
    await itemsCollection
      .doc(board_id)
      .set({ items: items, gameInfo: gameInfo });
    return board_id;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateBoard = async (board_id, itemName, color, index, gameInfo) => {
  try {
    const data = {
      checked: true,
      color: color,
      index: index,
    };

    const key = "items." + itemName;

    const wrappedData = {};
    wrappedData[key] = data;
    if (itemName) {
      await itemsCollection.doc(board_id).update(wrappedData);
    }
    await itemsCollection.doc(board_id).update({ gameInfo: gameInfo });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getItems,
  addBoard,
  updateBoard,
};
