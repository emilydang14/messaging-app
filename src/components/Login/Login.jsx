import React from "react";
import classes from "./Login.module.css";
import loginLogo from "../../assets/logos/login-logo.png";
import { authentication, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

function Login() {
  const [{}, dispatch] = useStateValue();
  const logInHandler = () => {
    authentication
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({ type: actionTypes.SET_USER, user: result.user });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className={classes.Login}>
      <div className={classes.login__container}>
        <img className={classes.login__logo} src={loginLogo} alt="Login" />
        <div className={classes.login__text}>
          <h1>Login</h1>
        </div>
        <button className={classes.login__googleButton} onClick={logInHandler}>
          SIGN IN
        </button>
      </div>
    </div>
  );
}

export default Login;
