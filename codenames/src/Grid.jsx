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
let grayArr = duplicateArr(grayCount, '#ebf5c9')
let deathArr = ['#858585']
let colorArr = redArr.concat(blueArr, grayArr, deathArr)

shuffle(colorArr)
shuffle(items)

const Grid = ({ spyMaster }) => {
  const [redRemaining, setRedRemaining] = useState(redCount)
  const [blueRemaining, setBlueRemaining] = useState(blueCount)
  const [redsTurn, setRedsTurn] = useState(true)

  const changeHandler = (color) => {
    if (color === 'red') {
      setRedRemaining(redRemaining - 1)
    } else if (color === 'blue') {
      setBlueRemaining(blueRemaining - 1)
    }

    if ((color === 'blue' && redsTurn) || (color === 'red' && !redsTurn)) {
      setRedsTurn(!redsTurn)
    }
  }

  return (
    <div>
      <div className='turnInfo'>
        <p style={{ float: 'left', 'margin-left': '320px' }}>
          <span style={{ color: redsTurn ? 'red' : 'blue' }}>
            It is {redsTurn ? 'red\'s' : 'blue\'s'} turn
          </span>
        </p>
        <p style={{ 'margin-left': '280px' }}>
          <span style={{ color: 'red' }}>{redRemaining}</span> - <span style={{ color: 'blue' }}>{blueRemaining}</span>
        </p>
      </div>
      <div className="grid">
        {items.map((itemName, index) =>
          <ItemCell spyMaster={spyMaster}
            itemName={itemName}
            secretColor={colorArr[index]}
            key={itemName}
            callback={changeHandler} />)}
      </div>
    </div >
  )
}

export default Grid