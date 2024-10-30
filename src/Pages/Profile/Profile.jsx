import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    birthDay: "",
    gender: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found in localStorage.");
        }

        const response = await axios.get("http://127.0.0.1:3001/get-user", {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });

        setUserData(response.data);
      } catch (err) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:3001/update-user",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        }
      );

      toast.success(response.data.message);
    } catch (err) {
      toast.error("Error updating user data");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-form-wrapper">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            First Name:
            <input
              type="text"
              name="fname"
              value={userData.fname}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lname"
              value={userData.lname}
              onChange={handleChange}
            />
          </label>
          <label>
            Birth Day:
            <input
              type="date"
              name="birthDay"
              value={userData.birthDay.split("T")[0]}
              onChange={handleChange}
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Mobile:
            <input
              type="tel"
              name="mobile"
              value={userData.mobile}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="submit-btn">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
