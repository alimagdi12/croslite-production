import React, { useState } from "react";
import "./Navbar.css";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBagShopping,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useLogin } from "../../Context/Login/LoginContext";

function Navbar() {
  const { t, i18n } = useTranslation(); // Initialize translation
  const { isLoggedIn, logout } = useLogin(); // Use the login context
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo/Nav_Logo.png" alt="Logo" className="nav-img" />
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <Link to="/">{t("Home")}</Link>
            </li>
            <li>
              <Link to="/shop">{t("Shop")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("Contact")}</Link>
            </li>
            <li>
              <Link to="/about">{t("About")}</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link onClick={logout} to="/login">
                  {t("Logout")}
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login">{t("Login")}</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link to="/signup">{t("Signup")}</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="nav-icons">
          <FontAwesomeIcon icon={faSearch} />
          <Link to="/cart">
            <FontAwesomeIcon icon={faBagShopping} />
          </Link>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
          <button className="language-toggle" onClick={changeLanguage}>
            {i18n.language === "ar" ? "EN" : "AR"}
          </button>
        </div>

        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={toggleSidebar}
          />
          <ul className="sidebar-links">
            <li>
              <Link to="/">{t("Home")}</Link>
            </li>
            <li>
              <Link to="/shop">{t("Shop")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("Contact")}</Link>
            </li>
            <li>
              <Link to="/about">{t("About")}</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link onClick={logout} to="/login">
                  {t("Logout")}
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login">{t("Login")}</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link to="/signup">{t("Signup")}</Link>
              </li>
            )}
          </ul>
          <div className="nav-icon">
            <FontAwesomeIcon icon={faSearch} />
            <Link to="/cart">
              <FontAwesomeIcon icon={faBagShopping} />
            </Link>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <button className="language-toggle-mobile" onClick={changeLanguage}>
              {i18n.language === "ar" ? "EN" : "AR"}
            </button>
          </div>
        </div>

        {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
