import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import sowedane from "../../assets/sowedane.png";

function Profile() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://sowedane.onrender.com/api/myprofile", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const handleEditProfile = () => {
    navigate("/editprofile");
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
      <div style={{ textAlign: "center" }}>
        <h1>My Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div>
              <div style={profileStyle}>
                <h2>{userData.fullName}</h2>
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.phone}</p>
                <p>Address: {userData.address}</p>
                <p>Company Name: {userData.companyName}</p>
              </div>
              <button onClick={handleEditProfile} style={editButtonStyle}>
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// Inline CSS styles
const profileStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "10px",
  margin: "20px",
};

const editButtonStyle = {
  backgroundColor: "blue",
  color: "white",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "20px",
};

export default Profile;
