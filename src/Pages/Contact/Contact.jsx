import React, { useState } from "react";
import "./Contact.css";
import { useTranslation } from "react-i18next";
import sendContactData from "../../services/contact/contact.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const { t } = useTranslation(); // Initialize translation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await sendContactData(formData);
    res
      ? toast.success("message sent successfully")
      : toast.error("failed to send message please try again later");
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h2>{t("GetInTouch")}</h2>
        <p>{t("Question")}</p>

        {/* Google Map Section */}
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3412.0175821641333!2d32.28532747559963!3d31.220242274352707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDEzJzEyLjkiTiAzMsKwMTcnMTYuNSJF!5e0!3m2!1sen!2seg!4v1709644304460!5m2!1sen!2seg"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map Location"
          ></iframe>
        </div>

        <div className="form-details-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={t("YourName")}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("YourEmail")}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder={t("YourMessage")}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">{t("Submit")}</button>
          </form>

          <div className="contact-info">
            <div className="info-section">
              <h3>{t("AddressTitle")}</h3>
              <p>{t("Address")}</p>
            </div>

            <div className="info-section">
              <h3>{t("MailUs")}</h3>
              <p> customersupport@croslite.com.eg</p>
            </div>

            <div className="info-section">
              <h3>{t("Phone")}</h3>
              <p>+20 120-571-222-1</p>
              <p>+20 100-155-790-2</p>
              <p>+20 66-375-930-0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
