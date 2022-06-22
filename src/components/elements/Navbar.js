import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/tabCollectLogo.PNG";
import useStore from "../../Store/useStore";

function Navbar() {
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const deleteWorkSpace = useStore((state) => state.deleteWorkSpace);
  const navigate = useNavigate();

  const HandleLogOut = () => {
    localStorage.removeItem("accessToken");
    setCurrentUser("");
    deleteWorkSpace();
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
            <Link className="navbar-item" to="/Home">
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
