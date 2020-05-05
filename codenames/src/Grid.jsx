/**
 * "items": {
 *  "dog": {
 *    checked: false,
 *    color: blue
 *  }
 * }
 */

import React, { useState } from 'react'
import { items } from './consts'

import ItemCell from './Cell'

const duplicateArr = (count, element) => {
  let arr = []
  for (let i = 0; i < count; i++) {
    arr.push(element)
  }

  return arr
}

const shuffle = (arr) => {
  var ctr = arr.length, temp, index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arr[ctr];
    arr[ctr] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

const redCount = 9
const blueCount = 8
const grayCount = 7

let redArr = duplicateArr(redCount, 'red')
let blueArr = duplicateArr(blueCount, 'lightblue')
let grayArr = duplicateArr(grayCount, '#e6d5a8')
let deathArr = ['#858585']
let colorArr = redArr.concat(blueArr, grayArr, deathArr)

shuffle(colorArr)
shuffle(items)

const Grid = ({ spyMaster, callback }) => {
  const [redRemaining, setRedRemaining] = useState(redCount)
  const [blueRemaining, setBlueRemaining] = useState(blueCount)
  const [whoseTurn, setTurn] = useState('red')
  const [win, gameOver] = useState(false)

  const changeHandler = (color) => {
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

  return (
    <div>
      <p>{win
        ? <span style={{ color: whoseTurn }}>The {whoseTurn} team wins </span>
        : <span style={{ color: whoseTurn }}>It's {whoseTurn} team's turn </span>} <br></br>

        <span style={{ color: 'red' }}>{redRemaining}</span> - <span style={{ color: 'blue' }}>{blueRemaining}</span>
        <br></br>
        <button className="passButton" onClick={passTurn}>Pass Turn</button></p>
      <div className="grid">
        {items.map((itemName, index) =>
          <ItemCell spyMaster={spyMaster}
            clickable={!win && !spyMaster}
            itemName={itemName}
            secretColor={colorArr[index]}
            key={itemName}
            callback={changeHandler} />)}
      </div>
    </div >
  )
}

export default Grid
