/* Library Imports */
//Detect-it
import { deviceType } from 'detect-it';
//React
import React, { useEffect, useState } from 'react';
//Recoil
import { useRecoilState } from 'recoil';

import { useNavigate } from 'react-router-dom';

/* Stylesheet Imports */
import './LoginBox.scss';

/* Image Imports */

/* Component Imports */

/* Module Imports */
import { logInWithEmail } from 'src/modules/firebase';

import { userCredentials, userLoggedIn } from 'src/modules/atoms';

/* Component Interfaces */

/* Component/Functions */
const LoginBox = () => {
  /* MOBILE STATE LOGIC */
  //Logic + Vars for hover state
  let hoverCond: any;

  //State to store mobile logic
  const [isMobile, setMob] = useState<boolean>(false);

  //Logic to set if mobile
  useEffect(() => {
    if (deviceType !== 'mouseOnly') setMob(true);
  }, []);

  //Logic to determine hover condition
  if (!isMobile) hoverCond = 'hoverable';
  /* END MOBILE STATE LOGIC */

  const navigate = useNavigate();

  //State to store user info
  const [user, setUser] = useState<any>(null);

  //State to store login logic
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  //State to store user credentials
  const [creds, setCreds] = useRecoilState(userCredentials);
  //State to store logged in status
  const [loggedIn, setLoggedIn] = useRecoilState(userLoggedIn);

  //effect to log user on change
  useEffect(() => {
    if (user) {
      setCreds(user);
      setLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    if (loggedIn) {
      alert('Login Successful!');

      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [loggedIn]);

  //Function to handle submit
  const handleSubmit = () => {
    if (username && password) {
      logInWithEmail(username, password)
        .then((res) => {
          if (res) {
            setUser(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Function return statement
  return (
    <div className="LoginBox">
      <div className="loginForm">
        <div className="logInput">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="logInput">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit} className={`loginButton ${hoverCond}`}>
          LOGIN
        </button>
        <button onClick={handleSubmit} className={`loginButton ${hoverCond}`}>
          REGISTER
        </button>
      </div>
    </div>
  );
};

/* Export Statement */
export default LoginBox;
