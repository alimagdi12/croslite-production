import React, { useState, useEffect } from "react"; // Import useEffect
import "./Login.css";
import { useTranslation } from "react-i18next";
import LoginService from "../../services/Login/Login.service";
import { useLogin } from "../../Context/Login/LoginContext"; // Import the login context
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login, isLoggedIn } = useLogin(); // Use the login context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const { t } = useTranslation(); // Initialize translation
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Example rule: password must be at least 6 characters
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Input validation
    if (name === "email" && !validateEmail(value)) {
      setErrors({ ...errors, email: "Invalid email format" });
    } else {
      setErrors({ ...errors, email: "" });
    }

    if (name === "password" && !validatePassword(value)) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters",
      });
    } else {
      setErrors({ ...errors, password: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.email && !errors.password) {
      const success = await LoginService(formData);
      if (success) {
        login(); // Set logged in state
        toast.success("logged in successfully");
        navigate("/"); // Redirect to home after login
      } else {
        setErrors({
          ...errors,
          email: "Login failed. Please check your credentials.",
        });
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <img
            src="/images/logo/Nav_Logo.png"
            alt="Croslite Logo"
            className="login-logo"
          />
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Please enter your email address"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                required
              />
              {errors.email && (
                <small className="error-text">{errors.email}</small>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Please enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                required
              />
              {errors.password && (
                <small className="error-text">{errors.password}</small>
              )}
            </div>
            <button type="submit" className="login-btn">
              {t("Login")}
            </button>
          </form>
          <p>
            {t("NoAccount")}{" "}
            <a href="/signup" className="create-link">
              {t("CreateNew")}
            </a>
          </p>
        </div>
        <div className="login-right">
          <h2>{t("WelcomeBack")}</h2>
          <p>{t("LoginWelcome")}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
