import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import sowedane from "../../assets/sowedane.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://sowedane.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 201) {
        console.log("User registered successfully");
        navigate("/signin");
      } else if (response.status === 400) {
        console.log("User already exists");
        alert("User already exists");
      } else {
        console.error("Error registering user");
        alert("Error registering user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user");
    }
    // Reset the form fields
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="signup-container">
      <img src={sowedane} className="icon" />

      <h2>Sign Up</h2>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit">Sign Up</button>
        <p style={{ textAlign: "center" }}>
          Already have an account,{" "}
          <a onClick={() => navigate("/signin")}>Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
