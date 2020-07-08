import React, { useState, useEffect } from "react";
import ItemCell from "./Cell";
import streamBoardData from "./stream-controller";
import { trackPromise } from "react-promise-tracker";

const Grid = ({ spyMaster, callback, id }) => {
  const [redRemaining, setRedRemaining] = useState(9);
  const [blueRemaining, setBlueRemaining] = useState(8);
  const [items, setItems] = useState({});
  const [whoseTurn, setTurn] = useState("red");
  const [win, gameOver] = useState(false);

  const updateBoardData = async (
    board_id,
    itemName,
    color,
    index,
    gameInfo
  ) => {
      await fetch("https://sheldonames.herokuapp.com/updateBoard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_id: board_id,
        itemName: itemName,
        color: color,
        index: index,
        gameInfo: gameInfo,
      }),
    });
  };

  const changeHandler = async (color, itemName) => {
    const gameInfo = await colorHandler(color);
    if (itemName === "pass") {
      updateBoardData(id, undefined, undefined, undefined, gameInfo);
    } else {
      updateBoardData(id, itemName, color, items[itemName].index, gameInfo);
    }
  };

  const colorHandler = (c) => {
    let gameInfo;
    if (c === "red") {
      if (
        "blue" === whoseTurn ||
        ("red" === whoseTurn && !(redRemaining - 1 === 0))
      ) {
        gameInfo = {
          turn: "red",
          red: redRemaining - 1,
          blue: blueRemaining,
          win: win,
        };
      } else {
        gameInfo = {
          turn: "red",
          red: redRemaining - 1,
          blue: blueRemaining,
          win: true,
        };
        callback("red");
      }
    } else if (c === "pass") {
      if ("red" === whoseTurn) {
        gameInfo = {
          turn: "blue",
          red: redRemaining,
          blue: blueRemaining,
          win: win,
        };
      } else {
        gameInfo = {
          turn: "red",
          red: redRemaining,
          blue: blueRemaining,
          win: win,
        };
      }
    } else if (c === "lightblue") {
      if (
        "red" === whoseTurn ||
        ("blue" === whoseTurn && !(blueRemaining - 1 === 0))
      ) {
        gameInfo = {
          turn: "blue",
          red: redRemaining,
          blue: blueRemaining - 1,
          win: win,
        };
      } else {
        gameInfo = {
          turn: "blue",
          red: redRemaining,
          blue: blueRemaining - 1,
          win: true,
        };
        callback("blue");
      }
    } else if (c === "#e6d5a8") {
      whoseTurn === "red"
        ? (gameInfo = {
            turn: "blue",
            red: redRemaining,
            blue: blueRemaining,
            win: win,
          })
        : (gameInfo = {
            turn: "red",
            red: redRemaining,
            blue: blueRemaining,
            win: win,
          });
    } else {
      whoseTurn === "red"
        ? (gameInfo = {
            turn: "blue",
            red: redRemaining,
            blue: blueRemaining,
            win: true,
          })
        : (gameInfo = {
            turn: "red",
            red: redRemaining,
            blue: blueRemaining,
            win: true,
          });

      callback(whoseTurn === "red" ? "blue" : "red");
    }
    return gameInfo;
  };

  const passTurn = () => {
    if (!win) {
      changeHandler("pass", "pass");
    }
  };

  useEffect(() => {
    async function stream() {
      const unsubscribe = await trackPromise(streamBoardData(id, {
        next: (querySnapshot) => {
          const data = querySnapshot.data();
          if (data === undefined) return
          setItems(data.items);
          setBlueRemaining(data.gameInfo.blue)
          setRedRemaining(data.gameInfo.red)
          setTurn(data.gameInfo.turn)
          gameOver(data.gameInfo.win)
          if (data.gameInfo.win) callback(data.gameInfo.turn);
        },
        error: (err) => console.log(err),
      }));

      return unsubscribe;
    }

    stream();
  }, []);

  return (
    <div>
      <p>
        {win ? (
          <span style={{ color: whoseTurn }}>The {whoseTurn} team wins </span>
        ) : (
          <span style={{ color: whoseTurn }}>
            It's {whoseTurn} team's turn{" "}
          </span>
        )}{" "}
        <br></br>
        <span style={{ color: "red" }}>{redRemaining}</span> -{" "}
        <span style={{ color: "blue" }}>{blueRemaining}</span>
        <br></br>
        <button className="passButton" onClick={passTurn}>
          Pass Turn
        </button>
      </p>
      <div className="grid">
        {Object.keys(items)
          .sort((key1, key2) => {
            return items[key1].index - items[key2].index;
          })
          .map((itemName) => (
            <ItemCell
              spyMaster={spyMaster}
              clickable={!win && !spyMaster}
              itemName={itemName}
              secretColor={items[itemName].color}
              clicked={items[itemName].checked}
              key={itemName}
              callback={changeHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default Grid;
