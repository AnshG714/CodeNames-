import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Grid from './Grid'
import { Switch } from 'antd'


function App() {

  return (
    <div className="App">
      <Grid />
      <Switch className="switch"
        checkedChildren={<img src='https://cdn1.iconfinder.com/data/icons/crimes-and-justice/100/14-512.png' height='15px' alt="spymaster" />}
        unCheckedChildren={<img src="https://cdn2.iconfinder.com/data/icons/player-rounded-set/154/user-login-player-function-name-avatar-512.png" height='15px' alt="player" />}
        defaultChecked={false}
      />
    </div>
  );
}

export default App;
