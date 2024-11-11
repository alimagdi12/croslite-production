import axios from "axios";
const Order = async () => {
  try {
    // Retrieve token from localStorage

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    const response = await axios.post(
      "https://api.croslite.com.eg:3001/create-order",
      {},
      {
        headers: { token },
      }
    );

    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    console.error("Order request error:", err);
    return false;
  }
};

export default Order;
