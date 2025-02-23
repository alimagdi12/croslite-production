import React from "react";
import { useTranslation } from "react-i18next";
import "./About.css";

function About() {
  const { t } = useTranslation();

  return (
    <div className="about-us-container">
      <h1 className="about-us-title">{t("About")}</h1>
      {/* <p className="about-us-description">{t("WhyPeopleDesc")}</p> */}

      <section className="about-us-section">
        <h2 className="section-title">{t("WhyChooseUs")}</h2>
        <div className="about-us-features">
          <div className="feature-card">
            <h3 className="feature-title">{t("FastExecution")}</h3>
            <p className="feature-description">{t("FastExecutionDesc")}</p>
          </div>
          {/* <div className="feature-card">
            <h3 className="feature-title">{t("QualityAssurance")}</h3>
            <p className="feature-description">{t("QualityAssuranceDesc")}</p>
          </div> */}
          <div className="feature-card">
            <h3 className="feature-title">{t("ProductRange")}</h3>
            <p className="feature-description">{t("ProductRangeDesc")}</p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">{t("Support")}</h3>
            <p className="feature-description">{t("SupportDesc")}</p>
          </div>
        </div>
      </section>

      <section className="about-us-section">
        <h2 className="section-title">{t("SustainabilityPractices")}</h2>
        <p className="section-description">
          {t("SustainabilityPracticesContent")}
        </p>
      </section>

      <section className="about-us-section">
        <h2 className="section-title">{t("CustomerTestimonials")}</h2>
        <p className="section-description">
          {t("CustomerTestimonialsContent")}
        </p>
      </section>

      <section className="about-us-section">
        <h2 className="section-title">{t("ContactUs")}</h2>
        <h3 className="address-title">{t("Address")}</h3>
        <p className="address-details">
          مصنع 45 - مشروع 118 وحدة - مصنع المنطقة الصناعية - جنوب الرسوة -
          بورسعيد - مصر
        </p>
      </section>

      {/* <div className="about-us-subscribe">
        <h3 className="subscribe-title">{t("SubscribeNow")}</h3>
        <p className="subscribe-description">{t("SubscribeDescription")}</p>
        <button className="subscribe-button">{t("Subscribe")}</button>
      </div> */}
    </div>
  );
}

export default About;
