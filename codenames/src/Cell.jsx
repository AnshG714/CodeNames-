import React, { useState } from 'react'
import './App.css'

const ItemCell = ({ itemName, secretColor, spyMaster, callback, clickable }) => {

  const [display, setDisplay] = useState(false)

  const divStyle = {
    backgroundColor: (display || spyMaster) ? secretColor : '#d1d1d1',
    width: '150px',
    height: '120px'
  }

  return (
    <div className="item"
      style={divStyle}
      onClick={() => {
        if (!display && clickable){ 
        callback(secretColor)
        setDisplay(true)
        }
      }}>
      <p>{itemName}</p>
    </div>
  )
}

export default ItemCell