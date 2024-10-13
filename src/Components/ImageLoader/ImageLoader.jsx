import React, { useState } from "react";
import "./ImageLoader.css";

const ImageLoader = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <div className="image-loader-wrapper">
      {loading && <div className="skeleton-loader"></div>}
      <img
        src={src}
        alt={alt}
        className={`product-image ${loading ? "hidden" : "fade-in"}`}
        onLoad={handleImageLoaded}
      />
    </div>
  );
};

export default ImageLoader;
