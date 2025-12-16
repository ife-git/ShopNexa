import React, { useState } from "react";
import ItemCard from "./itemCard";
import ItemCardDetails from "./itemCardDetails";

export default function Main({ searchTerm, selectedCategory, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load all products
  React.useEffect(() => {
    async function loadAll() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
    }
    if (selectedCategory === "") {
      loadAll();
    }
  }, [selectedCategory]);

  // Load products by category
  React.useEffect(() => {
    if (selectedCategory === "") return;

    async function loadCategory() {
      const res = await fetch(
        `https://dummyjson.com/products/category/${selectedCategory}`
      );
      const data = await res.json();
      setProducts(data.products);
    }

    loadCategory();
  }, [selectedCategory]);

  // Search logic
  React.useEffect(() => {
    if (searchTerm.trim() === "") return;

    async function search() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}`
        );
        const data = await res.json();
        setProducts(data.products);
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [searchTerm]);

  // Handle clicking a product
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
      {loading && <h2>Loading...</h2>}

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
