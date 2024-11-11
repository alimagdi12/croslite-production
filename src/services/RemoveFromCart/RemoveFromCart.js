import axios from "axios";
const removeFromCart = async (productId) => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    const response = await axios.post(
      "https://api.croslite.com.eg:3001/cart-delete-item",
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
        },
      }
    );

    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    console.error("Error removing product from cart", err);
    return false;
  }
};

export default removeFromCart;
