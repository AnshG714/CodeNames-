import React from 'react'
import ItemCell from './Cell'

const Grid = (props) => {
  const items = ['apple', 'plane', 'undertaker', 'orange', 'bark',
    'mango', 'dog', 'piano', 'unicorn', 'fly',
    'strike', 'bug', 'part', 'ship', 'australia',
    'war', 'mount', 'torch', 'march', 'pound',
    'diamond', 'bold', 'crash', 'stock', 'buck']
  return (
    <div className="grid">
      {items.map((itemName) => <ItemCell itemName={itemName} secretColor={'blue'} key={itemName} />)}
    </div>
  )
}

export default Grid