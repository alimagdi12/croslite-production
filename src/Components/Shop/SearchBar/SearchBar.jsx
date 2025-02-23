import React, { useState } from "react";
import "./SearchBar.css";
import { useTranslation } from "react-i18next";

const SearchBar = ({ onSearch, availableColors }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const { t } = useTranslation();

  const handleSearchClick = () => {
    onSearch({ search, category, color });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="What are you looking for?"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
     {/* <select
        className="search-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Category</option>
        <option value="shoes">Shoes</option>
        <option value="sandals">Sandals</option>
      </select>*/}
      <select
        className="search-select"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="">{t("Color")}</option>
        {availableColors.map((color, index) => (
          <option key={index} value={color}>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </option>
        ))}
      </select>
      <button className="search-button" onClick={handleSearchClick}>
        {t("Search")}
      </button>
    </div>
  );
};

export default SearchBar;
