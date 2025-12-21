import React, { useState, useEffect } from "react";
import ItemCard from "./itemCard";
import ItemCardDetails from "./itemCardDetails";

export default function Main({ searchTerm, selectedCategory, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ================= LOAD ALL PRODUCTS ================= */
  useEffect(() => {
    if (selectedCategory !== "") return;

    async function loadAll() {
      setLoading(true);
      setNoResults(false);

      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      setProducts(data.products);
      setLoading(false);
    }

    loadAll();
  }, [selectedCategory]);

  /* ================= LOAD BY CATEGORY ================= */
  useEffect(() => {
    if (selectedCategory === "") return;

    async function loadCategory() {
      setLoading(true);
      setNoResults(false);

      const res = await fetch(
        `https://dummyjson.com/products/category/${selectedCategory}`
      );
      const data = await res.json();

      setProducts(data.products);
      setLoading(false);
    }

    loadCategory();
  }, [selectedCategory]);

  /* ================= SEARCH ================= */
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setNoResults(false);
      return;
    }

    async function search() {
      setLoading(true);
      setNoResults(false);

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}`
        );
        const data = await res.json();

        setProducts(data.products);
        setNoResults(data.products.length === 0);
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [searchTerm]);

  /* ================= PRODUCT CLICK ================= */
  async function handleProductClick(id) {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const item = await res.json();
    setSelectedProduct(item);
  }

  function closeModal() {
    setSelectedProduct(null);
  }

  return (
    <>
      {loading && <h2 style={{ textAlign: "center" }}>Loading...</h2>}

      {!loading && noResults && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h2> Sorry, no product found ❌</h2>
          <p style={{ color: "#666" }}>
            Try checking your spelling or searching something else.
          </p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="products-grid">
          {products.map((p) => (
            <ItemCard
              key={p.id}
              title={p.title}
              price={p.price}
              image={p.thumbnail}
              onClick={() => handleProductClick(p.id)}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ItemCardDetails
          product={selectedProduct}
          onClose={closeModal}
          addToCart={addToCart}
        />
      )}
    </>
  );
}
