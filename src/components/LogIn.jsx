import { useState, useEffect, useReducer } from "react";
import { authGlobalVals, setAuthVals } from "../AuthSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { memo } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LogIn.module.css";
import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function LogIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const userVals = useSelector(authGlobalVals);

  const [isLogIn, setLogIn] = useState(true);
  const [formHasError, setFormError] = useState(false);
  const [isVisiblePass, setVisiblePass] = useState(false);

  const [authVals, setAuthValsLocal] = useState({ username: "", password: "" });



  useEffect(() => {
    // console.log(userVals);
  }, []);

  function logOut(){
    localStorage.removeItem("authVals"); 
   
    navigate("/")
     window.location.reload();
  }

  function createAccount() {

    if (!authVals.username) {
      setFormError(true);
    } 
    else {
      setFormError(false);
      localStorage.setItem("authVals", JSON.stringify(authVals));
      dispatch(setAuthVals(authVals));
      // console.log(authVals, "wot");
      window.location.reload();
    }
  }

  function capitalise(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAuthValsLocal((values) => ({ ...values, [name]: value }));
  };



  return (
    <div className={styles.wrapper}>
      {userVals.username ? (
        <div className={styles.loggedInWrapper}>
          <p>Welcome back, {capitalise(userVals.username)} ! </p>

          <div>
            <p>Check out our newest products here:</p>
            <Link to="/items">Items</Link>
          </div>

          <div>
            <p>If you have a message for us, you can send it here:</p>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <p>If you want to check your shopping cart, click here:</p>
            <Link to="/cart">Shopping Cart</Link>
          </div>

          <div>
            <p>If you want to log out from your account, you can do it here:</p>
            <a onClick={() => logOut()}>Log out</a>
          </div>
        </div>
      ) : (
        <>
          {isLogIn ? (
            <div className={styles.formWrapper}>
              <p>Username: </p>
              <input
                type="text"
                maxLength="15"
                placeholder="Enter ursername"
                name="username"
                value={authVals.username || ""}
                onChange={(event) => handleChange(event)}
              ></input>

              <p>Password: </p>
              <span className={styles.inputSpan}>
                <input
                  maxLength="25"
                  type={isVisiblePass ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={authVals.password || ""}
                  onChange={(event) => handleChange(event)}
                ></input>
                {isVisiblePass ? (
                  <VisibilityOffIcon onClick={() => setVisiblePass(false)} />
                ) : (
                  <VisibilityIcon onClick={() => setVisiblePass(true)} />
                )}
              </span>

              <p
                className={
                  formHasError ? styles.formError : styles.formErrorHidden
                }
              >
                Please complete all fields!
              </p>

              <p>
                <button onClick={() => createAccount()}>Log In</button>
                <div className={styles.logInChange}>
                  or{" "}
                  <a
                    onClick={() => {
                      setFormError(false);
                      setLogIn(false);
                    }}
                  >
                    Create Account
                  </a>
                </div>
              </p>
            </div>
          ) : (
            <div className={styles.formWrapper}>
              <p>Pick a username: </p>
              <input
                maxLength="15"
                type="text"
                placeholder="Enter username"
                name="username"
                value={authVals.username || ""}
                onChange={(event) => handleChange(event)}
              ></input>

              <p>Pick a password: </p>
              <div className={styles.inputSpan}>
                <input
                  maxLength="25"
                  type={isVisiblePass ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={authVals.password || ""}
                  onChange={(event) => handleChange(event)}
                ></input>
                {isVisiblePass ? (
                  <VisibilityOffIcon onClick={() => setVisiblePass(false)} />
                ) : (
                  <VisibilityIcon onClick={() => setVisiblePass(true)} />
                )}
              </div>
              <p
                className={
                  formHasError ? styles.formError : styles.formErrorHidden
                }
              >
                Please complete all fields!
              </p>
              <p>
                <button onClick={() => createAccount()}>Create Account</button>
                <div className={styles.logInChange}>
                  or{" "}
                  <a
                    onClick={() => {
                      setFormError(false);
                      setLogIn(true);
                    }}
                  >
                    Log In
                  </a>
                </div>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default memo(LogIn);
