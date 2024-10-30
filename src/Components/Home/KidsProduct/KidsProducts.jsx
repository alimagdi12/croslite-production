import React from "react";
import "./KidsProducts.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const KidsProducts = () => {
  const { t } = useTranslation(); // Initialize translation
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      name: "Baty Babuchi",
      image: "/images/disney/batman.JPG",
      rating: 4,
    },
    {
      id: 2,
      name: "Spidey Babuchi",
      image: "/images/disney/spiderman3.JPG",
      rating: 4,
    },
    {
      id: 2,
      name: "Spidey Babuchi",
      image: "/images/disney/batman2.JPG",
      rating: 4,
    },
    {
      id: 2,
      name: "Spidey Babuchi",
      image: "/images/disney/spiderman.JPG",
      rating: 4,
    },
  ];

  function handleNavigate() {
    navigate("/shop");
  }
  const renderRating = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="products-container">
      <h2>{t("KidsProducts")}</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <div className="rating">{renderRating(product.rating)}</div>
            <button className="shop-now" onClick={handleNavigate}>
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KidsProducts;