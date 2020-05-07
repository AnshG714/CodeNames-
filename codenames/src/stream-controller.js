import { firebaseApp } from "./firebaseConfig";

const db = firebaseApp.firestore();

const streamBoardData = async (boardID, observer) => {
  return db.collection("game-info").doc(boardID).onSnapshot(observer);
};

export default streamBoardData;
