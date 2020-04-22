import React, { useState } from 'react'

const ItemCell = ({ itemName, secretColor, spyMaster }) => {

  const [display, setDisplay] = useState(false)

  return (
    <div
      style={{ backgroundColor: (display || spyMaster) ? secretColor : 'gray' }}
      onClick={() => setDisplay(true)}>
      <p>{itemName}</p>
    </div>
  )
}

export default ItemCell