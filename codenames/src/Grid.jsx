import React, { useState } from 'react'
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

const items = ['apple', 'plane', 'undertaker', 'orange', 'bark',
  'mango', 'dog', 'piano', 'unicorn', 'fly',
  'strike', 'bug', 'part', 'ship', 'australia',
  'war', 'mount', 'torch', 'march', 'pound',
  'diamond', 'bold', 'crash', 'stock', 'buck']

const redCount = 9
const blueCount = 8
const grayCount = 7

let redArr = duplicateArr(redCount, 'red')
let blueArr = duplicateArr(blueCount, 'blue')
let grayArr = duplicateArr(grayCount, '#e6d5a8')
let deathArr = ['#858585']
let colorArr = redArr.concat(blueArr, grayArr, deathArr)

shuffle(colorArr)
shuffle(items)

const Grid = ({ spyMaster }) => {
  const [redRemaining, setRedRemaining] = useState(redCount)
  const [blueRemaining, setBlueRemaining] = useState(blueCount)
  const [whoseTurn, setTurn] = useState('red')
  const [win, gameOver] = useState(false)

  const changeHandler = (color) => {
    if (color === 'red') {
      setRedRemaining(redRemaining - 1)
      if ('blue' === whoseTurn){
        setTurn('red')
      }
      if ( redRemaining-1 === 0){
        setTurn('red')
        gameOver(true)
      } 
    } else if (color === 'blue') {
      setBlueRemaining(blueRemaining - 1)
      if ('red' === whoseTurn){
        setTurn('blue')
      }
      if ( blueRemaining-1 === 0) {
        setTurn('blue')
        gameOver(true)
      }
    } else if (color === '#e6d5a8'){
      if ('red' === whoseTurn){
        setTurn('blue')
      } else{
        setTurn('red')
      }
    } else{
      if (whoseTurn === 'red'){
        setTurn('blue')
        gameOver(true)
      } else{
        setTurn('red')
        gameOver(true)
      }
    }
  }

  return (
    <div>
      <p>{win 
      ? <span style = {{ color: whoseTurn}}>The {whoseTurn} team wins </span>
      : <span style = {{ color: whoseTurn}}>It's {whoseTurn} team's turn </span>} <br></br>
      
      <span style={{ color: 'red' }}>{redRemaining}</span> - <span style={{ color: 'blue' }}>{blueRemaining}</span></p>
      <div className="grid">
        {items.map((itemName, index) =>
          <ItemCell spyMaster={spyMaster}
            clickable={!win}
            itemName={itemName}
            secretColor={colorArr[index]}
            key={itemName}
            callback={changeHandler} />)}
      </div>
    </div>
  )
}

export default Grid