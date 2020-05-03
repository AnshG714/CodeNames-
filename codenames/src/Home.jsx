import React, { useState } from 'react';
import './home.css'
import { Link } from 'react-router-dom'

export default () => {

  const [roomText, setRoomText] = useState("this")

  const addToFirebase = async (roomID) => {
    await fetch('/addBoard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ board_id: roomID, items: { "dog": true } })
    })
  }

  return (
    <div>
      <h1>Create a room!</h1>
      <form>
        <input className="room" type="text" id="roomID" placeholder="Enter your room name" /> <br />
        <textarea className="custom" placeholder="Enter custom words" rows={5} columns={80} /> <br />

        <button className="button" type="button"
          onClick={(_) => addToFirebase(roomText)}> Submit </button>
      </form>
    </div >
  )
}