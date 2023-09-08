import React, { useState } from "react";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import sowedane from "../../assets/sowedane.png";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://sowedane.onrender.com/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        navigate("/");
      } else {
        alert("Authentication failed");
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="signin-container">
      <img src={sowedane} className="icon" />
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Sign In</button>
        <p style={{ textAlign: "center" }}>
          Don't have an account,{" "}
          <a onClick={() => navigate("/signup")}>Register</a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
