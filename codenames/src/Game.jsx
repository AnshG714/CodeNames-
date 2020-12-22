import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Grid from "./Grid";
import { Layout, Switch } from "antd";
import Confetti from "react-confetti";
import { blueConf, redConf } from "./consts.js";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
const { Content, Footer } = Layout;

export default ({ signOut, user, id }) => {
  const [spyState, setSpyState] = useState(false);
  const [winningColor, setWinningColor] = useState(null);

  const changeHandler = (color) => {
    if (color === "red") setWinningColor("red");
    else setWinningColor("blue");
  };

  const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();
    return(
        promiseInProgress &&
      <div 
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        >
          <Loader type="ThreeDots" color="blue" height="100" width="100" />
        </div>
    );
  }

  return (
    <div>
      <Content>
        {" "}
        <h1 className="hello">Hello, {user.displayName}</h1>
        {winningColor && (
          <Confetti
            recycle={false}
            colors={winningColor === "red" ? redConf : blueConf}
          />
        )}
        <Grid spyMaster={spyState} callback={changeHandler} id={id} />
        <LoadingIndicator/>
        <Switch
          className="switch"
          checkedChildren={
            <img
              src="https://cdn1.iconfinder.com/data/icons/crimes-and-justice/100/14-512.png"
              height="15px"
              alt="spymaster"
            />
          }
          unCheckedChildren={
            <img
              src="https://cdn2.iconfinder.com/data/icons/player-rounded-set/154/user-login-player-function-name-avatar-512.png"
              height="15px"
              alt="player"
            />
          }
          defaultChecked={false}
          onClick={() => setSpyState(!spyState)}
        />{" "}
        <br></br>
        <button className="signout" onClick={signOut}>
          Sign out
        </button>{" "}
      </Content>
      <Footer>Made with ❤️ by Alex Lee and Ansh Godha</Footer>
    </div>
  );
};
