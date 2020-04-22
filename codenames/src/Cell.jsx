import React, { useState } from 'react'
import './App.css'

const ItemCell = ({ itemName, secretColor, spyMaster }) => {

  const [display, setDisplay] = useState(false)

  const divStyle = {
    backgroundColor: (display || spyMaster) ? secretColor : 'gray',
    width: '200px',
    
  }

  return (
    <div
      style={divStyle}
      onClick={() => setDisplay(true)}>
      <p>{itemName}</p>
    </div>
  )
}

export default ItemCell