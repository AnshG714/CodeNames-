
import React, { useState, useEffect } from 'react'
import ItemCell from './Cell'
//import { streamBoardData } from '../../backend/firebase-functions'

const redCount = 9
const blueCount = 8
const grayCount = 7

const Grid = ({ spyMaster, callback, id }) => {
  const [redRemaining, setRedRemaining] = useState(redCount)
  const [blueRemaining, setBlueRemaining] = useState(blueCount)
  const [items, setItems] = useState({})
  const [whoseTurn, setTurn] = useState('red')
  const [win, gameOver] = useState(false)

  const getBoardData = (id) => {
    fetch(`http://localhost:8080/getItems?board_id=${id}`)
      .then(response => response.json())
      .then(it => setItems(it))
      .catch(err => console.log(err))
  }

  const updateBoardData = async (board_id, itemName, color, index) => {
    await fetch('http://localhost:8080/updateBoard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ board_id: board_id, itemName: itemName, color: color, index: index })
    })

    console.log('updated')
  }

  const changeHandler = (color, itemName) => {
    updateBoardData(id, itemName, color, items[itemName].index)

    if (color === 'red') {
      setRedRemaining(redRemaining - 1)
      if ('blue' === whoseTurn) {
        setTurn('red')
      }
      if (redRemaining - 1 === 0) {
        setTurn('red')
        gameOver(true)
        callback('red')
      }
    } else if (color === 'lightblue') {
      setBlueRemaining(blueRemaining - 1)
      if ('red' === whoseTurn) {
        setTurn('blue')
      }
      if (blueRemaining - 1 === 0) {
        setTurn('blue')
        gameOver(true)
        callback('blue')
      }
    } else if (color === '#e6d5a8') {
      whoseTurn === 'red' ? setTurn('blue') : setTurn('red')
    } else {
      whoseTurn === 'red' ? setTurn('blue') : setTurn('red')
      gameOver(true)
      callback(whoseTurn === 'red' ? 'blue' : 'red')
    }
  }

  const passTurn = () => {
    if (!win) {
      if (whoseTurn === 'red') {
        setTurn('blue')
      } else {
        setTurn('red')
      }
    }
  }

  useEffect(() => getBoardData(id), [items])

  return (
    <div>
      <p>{win
        ? <span style={{ color: whoseTurn }}>The {whoseTurn} team wins </span>
        : <span style={{ color: whoseTurn }}>It's {whoseTurn} team's turn </span>} <br></br>

        <span style={{ color: 'red' }}>{redRemaining}</span> - <span style={{ color: 'blue' }}>{blueRemaining}</span>
        <br></br>
        <button className="passButton" onClick={passTurn}>Pass Turn</button></p>
      <div className="grid">
        {
          Object.keys(items)
            .sort((key1, key2) => {
              return items[key1].index - items[key2].index
            })
            .map((itemName, index) =>
              <ItemCell spyMaster={spyMaster}
                clickable={!win && !spyMaster}
                itemName={itemName}
                secretColor={items[itemName].color}
                clicked={items[itemName].checked}
                key={itemName}
                callback={changeHandler} />)}
      </div>
    </div >
  )
}

export default Grid
