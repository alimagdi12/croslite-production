import React from "react";
import "./HomeCard.css";
import { useNavigate } from "react-router-dom";
function HomeCard({ product }) {
  const navigate = useNavigate();
  function getDetails() {
    navigate(`/product/${product._id}`);
  }
  return (
    <li onClick={getDetails}>
      <a href="" className="card">
        <img src={product.imageUrl.images[0]} className="card__image" alt="" />
        <div className="card__overlay">
          <div className="card__header">
            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
              <path />
            </svg>
            <img
              className="card__thumb"
              src={product.imageUrl.images[1]}
              alt=""
            />
            <div className="card__header-text">
              <h3 className="card__title">COCO CLOG</h3>
            </div>
          </div>
          <p className="card__description">
            <span className="card__tagline">{product.description}</span>{" "}
          </p>
        </div>
      </a>
    </li>
  );
}

export default HomeCard;
