import React from 'react'
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

  return (
    <div className="grid">
      {items.map((itemName, index) => <ItemCell spyMaster={spyMaster} itemName={itemName} secretColor={colorArr[index]} key={itemName} />)}
    </div>
  )
}

export default Grid