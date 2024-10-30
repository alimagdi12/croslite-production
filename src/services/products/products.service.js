import axios from "axios";
const getProducts = async (setProducts, setLoading) => {
  try {
    const res = await axios.get("http://127.0.0.1:3001/products");
    setProducts(res.data.products); // Access the products array
    console.log(res.data.products); // Log the products to verify
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
};

export default  getProducts;
