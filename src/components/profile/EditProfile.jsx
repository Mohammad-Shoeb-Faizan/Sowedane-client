import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import sowedane from "../../assets/sowedane.png";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");

  let navigate = useNavigate();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://sowedane.onrender.com/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullName,
          phone,
          address,
          companyName,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log(data.message);
        alert(data.message);
        setFullName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCompanyName("");
        navigate("/profile");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <header
        className="header"
        style={{
          backgroundColor: "#fff",
        }}
      >
        <div className="header-left">
          <img src={sowedane} className="icon" onClick={() => navigate("/")} />
        </div>
        <div className="header-right">
          <BsPersonCircle
            className="icon"
            onClick={() => navigate("/profile")}
          />
        </div>
      </header>
      <div
        style={{
          backgroundColor: "#1d2634",
          padding: "10px 50px",
          width: "60vw",
          height: "80vh",
          border: "1px solid #ddd",
          borderRadius: "5px",
          margin: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h2>Seller Registration</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={handleFullNameChange}
              style={{ width: "100%", padding: "0.8rem" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              style={{ width: "100%", padding: "0.8rem" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={handlePhoneChange}
              style={{ width: "100%", padding: "0.8rem" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={handleAddressChange}
              style={{ width: "100%", padding: "0.8rem" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              placeholder="Enter your company name"
              value={companyName}
              onChange={handleCompanyNameChange}
              style={{ width: "100%", padding: "0.8rem" }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
