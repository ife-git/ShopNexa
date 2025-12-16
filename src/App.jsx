import React from "react";
import "./App.css";
import Main from "./components/main";
import Contact from "./components/contact";
import Cart from "./components/cart";
import Logo from "./assets/logo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [cart, setCart] = React.useState([]);

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }

      return [...prev, item];
    });
  }

  function removeFromCart(indexToRemove) {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove)
    );
  }

  // Fetch categories on load
  React.useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <Router>
      <div className="button-container">
        <div className="left-nav">
          <div className="home-icon">
            <img src={Logo} alt="Shop Nexa" className="logo-img" />
          </div>

          <Link to="/" className="button">
            Home
          </Link>
          <Link to="/Contact" className="button">
            Contact
          </Link>
          <Link to="/Cart" className="button">
            Cart
          </Link>
        </div>

        {/* Categories Hover Button */}
        <div className="category-menu">
          <button className="category-btn">
            {selectedCategory
              ? categories.find((c) => c.slug === selectedCategory)?.name
              : "Categories"}
            ▾
          </button>

          <div className="category-dropdown">
            <div
              className="category-item"
              onClick={() => setSelectedCategory("")}
            >
              All Products
            </div>

            {categories.map((cat) => (
              <div
                key={cat.slug}
                className="category-item"
                onClick={() => setSelectedCategory(cat.slug)}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>

        {/* Search bar */}

        <input
          type="text"
          placeholder="🔎 Search products…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Main
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              cart={cart}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/Contact" element={<Contact />} />
        <Route
          path="/Cart"
          element={<Cart cartItems={cart} removeFromCart={removeFromCart} />}
        />
      </Routes>
    </Router>
  );
}
