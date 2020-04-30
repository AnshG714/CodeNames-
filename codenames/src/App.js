import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Grid from './Grid'
import { Switch } from 'antd'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Confetti from 'react-confetti'
//import useWindowSize from 'react-use/lib/useWindowSize'
import { blueConf, redConf } from './consts.js'

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};



function App(props) {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = props

  const [spyState, setSpyState] = useState(false)
  const [winningColor, setWinningColor] = useState(null)

  const changeHandler = (color) => {
    if (color === 'red') setWinningColor('red')
    else setWinningColor('blue')
  }

  // const { width, height } = useWindowSize()

  return (
    <div className="App">
      {
        user
          ? (<div> <h1 className="hello">Hello, {user.displayName}</h1>
            {
              winningColor && <Confetti recycle={false} colors={winningColor === 'red' ? redConf : blueConf} />
            }
            <Grid spyMaster={spyState} callback={changeHandler} />
            <Switch class="switch"
              checkedChildren={<img src='https://cdn1.iconfinder.com/data/icons/crimes-and-justice/100/14-512.png' height='15px' alt="spymaster" />}
              unCheckedChildren={<img src="https://cdn2.iconfinder.com/data/icons/player-rounded-set/154/user-login-player-function-name-avatar-512.png" height='15px' alt="player" />}
              defaultChecked={false}
              onClick={() => setSpyState(!spyState)}
            /> <br></br><button class="signout" onClick={signOut}>Sign out</button> </div>)
          : <div> <p>Please sign in.</p> <br></br><button onClick={signInWithGoogle}> Sign in with Google</button> </div>
      }
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
