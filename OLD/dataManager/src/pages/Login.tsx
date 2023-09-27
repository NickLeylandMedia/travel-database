/* Library Imports */
//React
import { homedir } from 'os';
import React from 'react';

/* Stylesheet Imports */

/* Image Imports */

/* Component Imports */
import Footer from 'src/components/footer/Footer';
import LoginBox from 'src/components/login/LoginBox';
import NavBar from 'src/components/navBar/NavBar';

/* Module Imports */

/* Component Interfaces */

/* Component/Functions */
const Login = () => {
  //Function return statement
  return (
    <div className="Login page">
      {/* Header Start */}
      <header>
        <NavBar
          links={[
            { name: 'HOME', link: '/', active: false },
            { name: 'TABLES', link: '/tables', active: false },
          ]}
        />
      </header>
      {/* Header End */}
      {/* Content Start */}
      <div className="mainContent">
        <LoginBox />
      </div>
      {/* Content End */}
      {/* Footer Start */}
      <Footer />
      {/* Footer End */}
    </div>
  );
};

/* Export Statement */
export default Login;
