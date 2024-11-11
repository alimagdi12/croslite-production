import axios from "axios";
const getProductDetails = async (productId) => {
  try {
    const res = await axios.get(`https://api.croslite.com.eg:3001//product/${productId}`);
    if (!res.status === 200) return null;
    return res.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

export default getProductDetails;
