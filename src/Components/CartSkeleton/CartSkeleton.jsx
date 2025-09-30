import React from "react";
import "./CartSkeleton.css";

const CartSkeleton = () => {
  return (
    <div className="cart-container">
      <h1 className="skeleton skeleton-text title"></h1>

      <div className="cart-items">
        {[1].map((i) => (
          <div className="cart-item" key={i}>
            <div className="skeleton skeleton-image"></div>
            <div className="cart-item-info">
              <div className="skeleton skeleton-text name"></div>
              <div className="skeleton skeleton-text qty"></div>
            </div>
            <div className="skeleton skeleton-button"></div>
          </div>
        ))}
      </div>

      <div className="skeleton skeleton-button order"></div>
    </div>
  );
};

export default CartSkeleton;
