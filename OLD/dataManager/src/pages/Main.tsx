/* Library Imports */
//React
import React, { useEffect } from 'react';
//React Router Dom
import { useNavigate } from 'react-router-dom';
//Recoil
import { useRecoilState, useRecoilValue } from 'recoil';

/* Stylesheet Imports */

/* Image Imports */

/* Component Imports */

/* Module Imports */
//Atoms
import { userCredentials, userLoggedIn } from 'src/modules/atoms';
//Firebase Auth
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/* Component Interfaces */

/* Component/Functions */
const Main = () => {
  //Variables
  const [loggedIn, setLoggedIn] = useRecoilState(userLoggedIn);
  const credentials = useRecoilValue(userCredentials);

  const navigate = useNavigate();

  //Login Redirect Logic
  useEffect(() => {
    if (!loggedIn) {
      alert('Please log in to continue.');
      navigate('/login');
    }
  }, [loggedIn]);

  //Effect to check auth
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return;
      } else {
        setLoggedIn(false);
      }
    });
  });

  //Function return statement
  return (
    <div className="Main page">
      {/* Header Start */}
      <header></header>
      {/* Header End */}
      {/* Content Start */}
      <div className="mainContent"></div>
      {/* Content End */}
      {/* Footer Start */}
      {/* Footer End */}
    </div>
  );
};

/* Export Statement */
export default Main;
