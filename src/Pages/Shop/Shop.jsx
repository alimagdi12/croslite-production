import React, { useEffect, useState } from "react";
import SearchBar from "../../Components/Shop/SearchBar/SearchBar";
import ProductCard from "../../Components/Shop/ProductCard/ProductCard";
import "./Shop.css";
import getProducts from "../../services/products/products.service";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation(); // Initialize translation
  const productsPerPage = 20;

  useEffect(() => {
    getProducts((products) => {
      setProducts(products);
      setFilteredProducts(products);
      setLoading(false);
    }, setLoading);
  }, []);

  const uniqueColors = [
    ...new Set(products.map((product) => product.firstColor)),
  ];

  const handleSearch = ({ search, category, color }) => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category ? product.category === category : true;
      const matchesColor = color ? product.firstColor === color : true;

      return matchesSearch && matchesCategory && matchesColor;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shop-page">
      <SearchBar onSearch={handleSearch} availableColors={uniqueColors} />

      <div className="products-grid">
        {Array.isArray(currentProducts) &&
          currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          {t("Prev")}
        </button>
        <span className="pagination-info">
          {t("Page")} {currentPage} {t("Of")} {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          {t("Next")}
        </button>
      </div>
    </div>
  );
};

export default Shop;
