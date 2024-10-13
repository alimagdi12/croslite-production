import React from "react";
import "./HomeCard.css";
function HomeCard({product}) {
  return (
    <li>
      <a href="" className="card">
        <img
          src={product.imageUrl.images[0]}
          className="card__image"
          alt=""
        />
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
            <span className="card__tagline">
              Lorem ipsum dolor sit amet consectetur
            </span>{" "}
          </p>
        </div>
      </a>
    </li>
  );
}

export default HomeCard;
