import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";
import removeFromCart from "./../../services/RemoveFromCart/RemoveFromCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Cart Items from the Server
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found in localStorage.");
        }

        // Send token in headers (Authorization) as bearer token
        const response = await axios.get("http://127.0.0.1:3000/cart", {
          headers: {
            Authorization: `Bearer ${token}`, // Using token from localStorage
            token: token, // Manually sending it in Cookie
          },
        });
        console.log(response);

        setCartItems(response.data.cartItems);
      } catch (err) {
        setError("An error occurred while fetching the cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Remove Product from Cart
  async function handleRemoveFromCart(productId) {
    const res = await removeFromCart(productId);
    if (res) {
      toast.success("Product removed from cart successfully!");
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } else {
      toast.error("Error removing product from cart.");
    }
  }

  // Loading and Error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.productId}>
              <img
                src={item.imageUrl.images[0]}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromCart(item.productId)} // Pass function reference
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
