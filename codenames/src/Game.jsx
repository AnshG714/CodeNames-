import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Grid from './Grid'
import { Switch } from 'antd'
import Confetti from 'react-confetti'
import { blueConf, redConf } from './consts.js'
import { OmitProps } from 'antd/lib/transfer/renderListBody';

export default ({ signOut, user, id }) => {
  const [spyState, setSpyState] = useState(false)
  const [winningColor, setWinningColor] = useState(null)

  const changeHandler = (color) => {
    if (color === 'red') setWinningColor('red')
    else setWinningColor('blue')
  }

  return (
    <div> <h1 className="hello">Hello, {user.displayName}</h1>
      {
        winningColor && <Confetti recycle={false} colors={winningColor === 'red' ? redConf : blueConf} />
      }

      <Grid spyMaster={spyState} callback={changeHandler} id={id} />

      <Switch className="switch"
        checkedChildren={<img src='https://cdn1.iconfinder.com/data/icons/crimes-and-justice/100/14-512.png' height='15px' alt="spymaster" />}
        unCheckedChildren={<img src="https://cdn2.iconfinder.com/data/icons/player-rounded-set/154/user-login-player-function-name-avatar-512.png" height='15px' alt="player" />}
        defaultChecked={false}
        onClick={() => setSpyState(!spyState)}

      /> <br></br><button className="signout" onClick={signOut}>Sign out</button> </div>
  )

}