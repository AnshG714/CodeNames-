import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Game from './Game.jsx'
import Home from './Home.jsx'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

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

  return (
    <div className="App">
      {
        user
          ?
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/:roomID" render={({ match }) => <Game id={match.params.roomID} user={user} signOut={signOut} />} exact />
            </Switch>
          </BrowserRouter>
          : <div> <p>Please sign in.</p> <br></br><button onClick={signInWithGoogle}> Sign in with Google</button> </div>
      }
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
