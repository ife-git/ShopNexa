import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/main";
import Contact from "./components/contact";
import Cart from "./components/cart";
import Logo from "./assets/Shop-Nexa-logo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest(".hamburger-menu")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Fetch categories on load
  useEffect(() => {
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
        <div className="navbar">
          {/* LEFT */}
          <div className="nav-left">
            <div className="home-icon">
              <img src={Logo} alt="Shop Nexa" className="logo-img" />
            </div>
            <h1 className="site-title">ShopNexa</h1>
          </div>

          {/* CENTER */}
          <div className="nav-center">
            {/* Desktop links: Home, Contact */}
            <div className="desktop-nav">
              <Link to="/" className="button">
                Home
              </Link>
              <Link to="/Contact" className="button">
                Contact
              </Link>
            </div>

            {/* Categories (desktop only) */}
            <div className="category-menu desktop-only">
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

            {/* Cart (desktop only) */}
            <div className="desktop-nav">
              <Link to="/Cart" className="button">
                Cart
              </Link>
            </div>

            {/* Search (always visible) */}
            <input
              type="text"
              placeholder="🔎 Search products…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </div>

          {/* RIGHT */}
          <div className="nav-right">
            {/* Hamburger */}
            <div className="hamburger-menu">
              <button
                className="hamburger-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                ☰
              </button>

              {isMobileMenuOpen && (
                <div className="mobile-menu">
                  <Link
                    to="/"
                    className="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/Contact"
                    className="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    to="/Cart"
                    className="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cart
                  </Link>

                  <div className="mobile-category-menu">
                    <div className="mobile-category-header">Categories</div>
                    <div className="mobile-category-list">
                      <div
                        className="mobile-category-item"
                        onClick={() => {
                          setSelectedCategory("");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        All Products
                      </div>

                      {categories.map((cat) => (
                        <div
                          key={cat.slug}
                          className="mobile-category-item"
                          onClick={() => {
                            setSelectedCategory(cat.slug);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {cat.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
