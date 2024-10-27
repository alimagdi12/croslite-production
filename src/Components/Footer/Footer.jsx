import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"; // Correct import path
import { useTranslation } from "react-i18next"; // Import useTranslation

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-top">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/croslite.appspot.com/o/images%2FFooter_Logo.png?alt=media&token=b68cf46c-dd5f-4e6a-8851-c77edfd1dbb1"
            alt="Croslite Logo"
            className="footer-logo"
          />
          <div className="footer-subscribe">
            <input
              type="email"
              placeholder="Your Email"
              className="footer-input"
            />
            <button>{t("SubscribeNow")}</button>
          </div>
          <div className="footer-icons">
            <a href="/" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="/" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="/" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="/" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">
          <div className="footer-column">
            <h3 style={{ color: "#fff" }}>{t("WhyPeople")}</h3>
            <p>{t("WhyPeopleDesc")}</p>
            <button>{t("ReadMore")}</button>
          </div>
          <div className="footer-column">
            <h3 style={{ color: "#fff" }}>{t("Accounts")}</h3>
            <ul>
              <li>
                <a href="/">{t("LinkedIn")}</a>
              </li>
              <li>
                <a href="/">{t("Instagram")}</a>
              </li>
              <li>
                <a href="/">{t("Facebook")}</a>
              </li>
              <li>
                <a href="/">{t("TikTok")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 style={{ color: "#fff" }}>{t("Contact")}</h3>
            <p>{t("Address")}</p>
            <p>Email: info@croslite.com.eg</p>
            <p>Phone 1: +20 1205712221</p>
            <p>Phone 2: +20 1001557902</p>
            <p>LandLine: +20 0663759300</p>
          </div>
        </div>
        <div className="footer-bottom-bar">
          <p>© Active Group, All rights reserved.</p>
          <p>
            Designed By <a href="/">Active Group</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
