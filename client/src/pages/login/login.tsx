import "./login.css";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [currentState, setCurrent] = useState("Sign up");

  // form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stop page reload

    if (currentState === "Sign up") {
      // call your backend here
      try {
        const response = await axios.post(
          "http://localhost:3000/users/register",
          {
            userName: username, // ✔ correct name for backend
            userEmail: email, // ✔ correct name for backend
            password: password, // ✔ matches DTO
            phoneNumber: phoneNumber, // ✔ matches DTO
          }
        );

        console.log("Account created:", response.status);
        alert("Account created successfully!");
        setUsername("");
        setPhoneNumber("");
        setPassword("");
        setEmail("");
        navigate("/chat");
      } catch (error) {
        console.log(error);
        alert("Something went wrong!");
        setUsername("");
        setPhoneNumber("");
        setPassword("");
        setEmail("");
      }
    } else {
      // login API (example)
      try {
        const response = await axios.post("http://localhost:3000/users/login", {
          email,
          password,
        });

        console.log("Login success:", response.data);
        alert("Logged in!");
        setPassword("");
        setEmail("");
        navigate("/chat");
      } catch (error) {
        console.log(error);
        alert("Login failed!");
      }
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{currentState}</h2>

        {currentState === "Sign up" && (
          <input
            type="text"
            placeholder="username"
            className="form-input"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="useremail"
          className="form-input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          className="form-input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {currentState === "Sign up" ? "Create account" : "Login now"}
        </button>

        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy</p>
        </div>

        <div className="login-forget">
          {currentState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account?
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

export default Login;
