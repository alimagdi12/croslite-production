import React, { useState, useEffect } from "react";
import "./ProductDetails.css"; // Custom styling
import getProductDetails from "../../services/productDetails/proudctDetails";
import { useParams } from "react-router-dom";
import ImageLoader from "../../Components/ImageLoader/ImageLoader"; // Importing ImageLoader component
import { useTranslation } from "react-i18next"; // Import useTranslation

const ProductDetails = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0); // For custom slider
  const { t } = useTranslation(); // Initialize translation

  useEffect(() => {
    const fetchProductDetails = async () => {
      const res = await getProductDetails(productId);
      if (res) {
        setProductData(res.product);
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Handle slide navigation (for custom slider)
  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === productData.imageUrl.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? productData.imageUrl.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="product-details-container">
      <div className="image-slider-wrapper">
        {isLoading ? (
          <div className="custom-skeleton" style={{ height: "300px" }} />
        ) : (
          <div className="custom-slider">
            <div className="slider-wrapper">
              {/* Apply ImageLoader component here */}
              <ImageLoader
                src={productData.imageUrl.images[currentSlide]}
                alt={`Product ${currentSlide}`}
              />
              <button className="prev-slide" onClick={handlePrevSlide}>
                &#10094;
              </button>
              <button className="next-slide" onClick={handleNextSlide}>
                &#10095;
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="product-info">
        {isLoading ? (
          <div
            className="custom-skeleton"
            style={{ width: "200px", height: "30px" }}
          />
        ) : (
          <h2 className="product-title">{productData.name}</h2>
        )}

        <div className="product-rating">
          {isLoading ? (
            <div
              className="custom-skeleton"
              style={{ width: "100px", height: "20px" }}
            />
          ) : (
            <span>{"⭐".repeat(productData.rating)}</span>
          )}
        </div>

        {isLoading ? (
          <div className="custom-skeleton" style={{ height: "80px" }} />
        ) : (
          <>
            <p className="product-description">{productData.description}</p>
            <p className="product-category">Category: {productData.category}</p>
          </>
        )}
      </div>
      <div className="review-section">
        <h3>{t("LeaveReview")}</h3>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Review" required />
          <label>{t("PleaseRate")}: ⭐⭐⭐⭐⭐</label>
          <button type="submit">{t("PostComment")}</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
