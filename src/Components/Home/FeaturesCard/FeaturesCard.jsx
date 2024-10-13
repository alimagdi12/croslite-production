import React from "react";
import "./FeaturesCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next"; // Import useTranslation

function FeaturesCard({ icon, headKey, descriptionKey }) {
  const { t } = useTranslation(); // Initialize translation

  return (
    <div className="features-card">
      <div className="features-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3>{t(headKey)}</h3> 
      <p>{t(descriptionKey)}</p> 
    </div>
  );
}

export default FeaturesCard;
