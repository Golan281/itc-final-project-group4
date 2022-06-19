function Modal(props) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-form">
        <div className="modal-form-size">
          <img
            src="img\AppetLogo.jpg"
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
          {/* <div className="form-item">Phone Number</div>
          <input
            type="tel"
            name="phone"
            className="form-item"
            onChange={handleChangeSignUp}
            id="phone"
          /> */}
          <div className="modal-form-button" onClick={onSubmitSignUp}>
            Sign Up
          </div>
        </div>
      </div>
    </Modal>
  );
}
