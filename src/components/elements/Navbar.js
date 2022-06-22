import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import userContext from "../Context/userContext";
import logo from "../images/tabCollectLogo.PNG";

function Navbar() {
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();

  const HandleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar-left">
        <img src={logo} height="50" className="navbar-item" alt="logo"></img>
      </div>
      <div className="navbar-right">
        {currentUser ? (
          <div>
            <Link className="navbar-item" to="/">
              Home
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        {!currentUser ? (
          <div></div>
        ) : (
          <div className="signup button" onClick={HandleLogOut}>
            Sign out
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
