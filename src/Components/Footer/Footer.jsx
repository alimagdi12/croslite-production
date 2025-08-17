import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTiktok,
  faTelegram
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
              placeholder={t("YourEmail")}
              className="footer-input"
            />
            <button>{t("SubscribeNow")}</button>
          </div>
          <div className="footer-icons">
            <a href="https://www.facebook.com/share/1CQCmRKB7W/" target="_blank" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://www.instagram.com/croslite.eg/" target="_blank" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://t.me/cococrosliteeg" target="_blank" aria-label="Telegram">
              <FontAwesomeIcon icon={faTelegram} />
            </a>
            <a href="https://www.tiktok.com/@crosliteeg" target="_blank" aria-label="TikTok">
              <FontAwesomeIcon icon={faTiktok} />
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
                <a href="https://t.me/cococrosliteeg" target="_blank">{t("Telegram")}</a>
              </li>
              <li>
                <a href="https://www.instagram.com/croslite.eg/" target="_blank">{t("Instagram")}</a>
              </li>
              <li>
                <a href="https://www.facebook.com/share/1CQCmRKB7W/" target="_blank">{t("Facebook")}</a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@crosliteeg" target="_blank">{t("TikTok")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 style={{ color: "#fff" }}>{t("Contact")}</h3>
            <p>{t("Address")}</p>
            <p>Email: customersupport@croslite.com.eg</p>
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
