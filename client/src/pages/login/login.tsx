import "./login.css";
import assets from "../../assets/assets";
import { useState } from "react";

const login = () => {
  const [currentState, setCurrent] = useState("Sign up");
  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form">
        <h2>{currentState}</h2>
        {currentState == "Sign up" ? (
          <input
            type="text"
            placeholder="username"
            className="form-input"
            required
          />
        ) : null}
        <input
          type="email"
          placeholder="useremail"
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="password"
          className="form-input"
          required
        />
        <input
          type="Contact"
          placeholder="phone Number"
          className="form-input"
          required
        />
        <button type="submit">
          {currentState == "Sign up" ? "Create account" : "Login now"}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy</p>
        </div>
        <div className="login-forget">
          {currentState == "Sign up" ? (
            <p className="login-toggle">
              Already have an account
              <span onClick={() => setCurrent("Login user")}> login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account
              <span onClick={() => setCurrent("Sign up")}> click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default login;
