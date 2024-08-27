import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchProduct, products]);

  return (
    <div className="product-container">
      <input
        type="text"
        placeholder="Search products..."
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
      />
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.title} />
              <div className="product-details">
                <p>{product.title}</p>
                <p>${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
