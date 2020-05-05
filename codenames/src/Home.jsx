import React, { useState } from 'react';
import './home.css'
import { Link } from 'react-router-dom'
import { items } from './consts'

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

function convertItemsToJSON(itemList, colorList) {
  let res = {}
  for (let i = 0; i < itemList.length; i++) {

    const newitemData = {
      color: colorList[i],
      checked: false
    }

    res[itemList[i]] = newitemData
  }

  return res
}

export default () => {

  const [roomText, setRoomText] = useState("")

  const addToFirebase = async (roomID) => {
    await fetch('http://localhost:8080/addBoard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ board_id: roomID, items: convertItemsToJSON(items, colorArr) })
    })
  }

  return (
    <div>
      <h1>Create a room!</h1>
      <form>
        <input className="room" type="text" id="roomID" placeholder="Enter your room name"
          onChange={(e) => setRoomText(e.target.value)} /> <br />
        <textarea className="custom" placeholder="Enter custom words" rows={5} columns={80} /> <br />

        <Link to={roomText}><button className="button" type="button"
          onClick={(_) => addToFirebase(roomText)}> Submit </button>
        </Link>
      </form>
    </div >
  )
}