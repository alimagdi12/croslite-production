import React from "react";
import "./CartoonCard.css";
const colorMap = {
  "/public/images/Cartoon/kids1.jpg": "#d1242a", // red
  "/public/images/Cartoon/Kids2.jpg": "#f58f20", // orange
  "/public/images/Cartoon/profile1.jpg": "#809096", // gray
};

function CartoonCard({ image }) {

  const backgroundColor = colorMap[image] || "#fff"; // Fallback to white if no match

  return (
    <div className="cartoon-card">
      <img src={image} className="cartoon-img" />
      <div
        className="cartoon-card-content"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <h5>Spidey Coco Babuchi</h5>
        <p>20 %</p>
      </div>
    </div>
  );
}

export default CartoonCard;
