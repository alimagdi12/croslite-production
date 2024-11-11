import axios from "axios";
const getProducts = async (setProducts, setLoading) => {
  try {
<<<<<<< HEAD
    const res = await axios.get("https://api.croslite.com.eg/products");
=======
    const res = await axios.get("https://api.croslite.com.eg:3001/products");
>>>>>>> 9f908bb53345b96ba4a47ceb107ba9d087cfd181
    setProducts(res.data.products); // Access the products array
    console.log(res.data.products); // Log the products to verify
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
};

export default  getProducts;

