import React from 'react';
import logo from './logo.svg';
import './App.css';
import ItemCell from './Cell'

function App() {

  const items = ['apple', 'plane', 'undertaker', 'orange', 'bark',
    'mango', 'dog', 'piano', 'unicorn', 'fly',
    'strike', 'bug', 'part', 'ship', 'australia',
    'war', 'mount', 'torch', 'march', 'pound',
    'diamond', 'bold', 'crash', 'stock', 'buck']

  return (
    <div className="App">
      {items.map((itemName) => <ItemCell itemName={itemName} secretColor={'blue'} key={itemName} />)}
    </div>
  );
}

export default App;
