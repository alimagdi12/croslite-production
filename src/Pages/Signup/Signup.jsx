import React, { useState } from "react";
import SignupService from "../../services/Signup/Signup"; // Import your SignupService
import "./Signup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    company: "",
    email: "",
    phone: "",
    gender: "male",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { t } = useTranslation(); // Initialize translation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess(""); // Reset success state

    try {
      const response = await SignupService.signup({
        userName: formData.userName,
        fName: formData.firstName,
        lName: formData.lastName,
        companyName: formData.company,
        email: formData.email,
        mobile: formData.phone,
        gender: formData.gender,
        birthday: formData.birthday,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      console.log(response);

      if (response.success === true) toast.success(response.message);
    } catch (error) {
      toast.error(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img
          src="/images/Signup/login.jpg"
          alt="Signup illustration"
          className="signup-image"
        />
        <div className="signup-text">
          <h2>{t("SignUpText")}</h2>
          <p>While seats are available!</p>
        </div>
      </div>

      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-input-group">
            <div className="input-wrapper">
              <label htmlFor="firstName">{t("FirstName")} *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">{t("LastName")} *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-input-group">
            <div className="input-wrapper">
              <label htmlFor="userName">{t("UserName")} *</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="company">{t("Company")} *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-input-group">
            <div className="input-wrapper">
              <label htmlFor="email">{t("Email")} *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="phone">{t("Phone")} *</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-input-group">
            <div className="input-wrapper">
              <label>{t("Gender")}</label>
              <div className="signup-radio-group">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                <label htmlFor="male">{t("Male")}</label>

                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                <label htmlFor="female">{t("Female")}</label>
              </div>
            </div>
            <div className="input-wrapper">
              <label htmlFor="birthday">{t("Birthday")}</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="signup-input-group">
            <div className="input-wrapper">
              <label htmlFor="password">{t("Password")}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="confirmPassword">{t("ConfirmPassword")}</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <p className="signup-error">{error}</p>}
          {success && <p className="signup-success">{success}</p>}

          <button type="submit" className="signup-button">
            {t("Signup")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
