import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./Navbar.css";
import userContext from "../Context/userContext";
import axios from "axios";
import logo from "../images/Logo.PNG"


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
  },
};

Modal.setAppElement("#root");

function Navbar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const { addUser, setCurrentUser, currentUser } = useContext(userContext);
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChangeSignUp = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    const res = await axios.post("http://localhost:8000/v1/auth/login", user);
    if (res.data.token) {
      setEmail("");
      setPassword("");
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setCurrentUser(res.data.user);
      navigate("/");
      closeModal();
    }
  };

  const onSubmitSignUp = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:8000/v1/auth/register", user);
      if (res.data) {
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          repassword: "",
        });

        addUser({ ...user });
        navigate("/");
        closeModal();
        alert("Thanks for signing up. Please Log in.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const HandleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar-left">
        <img
          src={logo}
          height="50"
          className="navbar-item"
          alt="logo"
        ></img>
        
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
          <div className="signup button" onClick={openModal}>
            Sign up/ Log in
          </div>
        ) : (
          <div className="signup button" onClick={HandleLogOut}>
            Sign out
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-form">
          <div className="modal-form-size">
            <img
              src={logo}
              width="300"
              className="navbar-item"
              alt="logo"
            ></img>
            <h1>Log In</h1>
            <div className="form-item">Email</div>
            <input
              type="email"
              className="form-item"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <div className="form-item">Password</div>
            <input
              type="password"
              className="form-item"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <div className="modal-form-button" onClick={onSubmitLogin}>
              Log in
            </div>
          </div>
          <div className="vline"></div>
          <div className="modal-form-size">
            <h1>Sign Up</h1>
            <div className="form-item">Email</div>
            <input
              type="email"
              name="email"
              className="form-item"
              onChange={handleChangeSignUp}
              id="email"
            />
            <div className="form-item">Password</div>
            <input
              type="password"
              name="password"
              className="form-item"
              onChange={handleChangeSignUp}
              id="password"
            />
            <div className="form-item">Confirm Password</div>
            <input
              type="password"
              name="repassword"
              className="form-item"
              onChange={handleChangeSignUp}
              id="repassword"
            />
            <div className="form-item">First Name</div>
            <input
              type="text"
              name="firstName"
              className="form-item"
              onChange={handleChangeSignUp}
              id="firstName"
            />
            <div className="form-item">Last Name</div>
            <input
              type="text"
              name="lastName"
              className="form-item"
              onChange={handleChangeSignUp}
              id="lastName"
            />
            <div className="modal-form-button" onClick={onSubmitSignUp}>
              Sign Up
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
