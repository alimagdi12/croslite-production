import React from "react";
import ImageLoader from "../../../Components/ImageLoader/ImageLoader";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../Context/Login/LoginContext";
import addToCart from "../../../services/AddToCart/AddToCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useLogin();

  const productName =
    i18n.language === "ar" ? product.arabicTitle : product.title;

  function details() {
    navigate(`/product/${product._id}`);
  }

  async function handleAddToCart() {
    const added = await addToCart(product._id);
    if (added) {
      toast.success(t("Product added to cart successfully"));
    } else {
      toast.error(t("Failed to add product to cart"));
    }
  }

  return (
    <div className="products-card" onClick={details}>
      <ImageLoader src={product.imageUrl.images[0]} alt={productName} />

      <div className="product-thumbnails">
        {product.imageUrl.images.slice(1).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${productName} - variant ${index + 1}`}
            className="thumbnail-image"
          />
        ))}
      </div>

      <div className="product-details">
        <h3 className="product-name">{productName}</h3>
        <div className="button-container">
          <button
            className="product-details-button"
            onClick={(e) => {
              e.stopPropagation(); // prevent bubbling
              details();
            }}
          >
            {t("Details")}
          </button>

          {isLoggedIn && (
            <button
              className="add-to-cart-button"
              onClick={(e) => {
                e.stopPropagation(); // ✅ stop bubbling so only add-to-cart works
                handleAddToCart();
              }}
            >
              {t("AddToCart")}
              <FontAwesomeIcon icon={faBagShopping} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
