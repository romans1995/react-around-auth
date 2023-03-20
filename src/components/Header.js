import logo from "../images/logo.svg";
import React from "react";
import { useHistory } from 'react-router-dom';

function Header({ isLoggedIn, setIsLoggedIn, userEmail }) {
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.push('/signin');
  }

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      {isLoggedIn ?
        <div className="header__div">
          <p className="header__link header__button" onClick={signOut}>Log out</p>
          <p className="header__email header__button">{userEmail}</p>
        </div>
        : ""}
    </header>
  );
}

export default Header;
