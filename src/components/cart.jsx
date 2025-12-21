import React from "react";

export default function Cart({ cartItems, removeFromCart }) {
  return (
    <>
      <h1>🛒 Shopping Cart</h1>

      {cartItems.length === 0 && (
        <div className="cart-message">
          <p>Your added items will appear here.</p>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="cart-display">
          {cartItems.map((item, index) => (
            <div className="cart-cards" key={item.id}>
              <div className="quantity-badge">{item.quantity}</div>
              <img src={item.thumbnail} alt={item.title} />
              <h3>{item.title}</h3>
              <p>${item.price}</p>

              <button
                className="remove-from-cart"
                onClick={() => removeFromCart(index)}
              >
                🗑 Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <h2 className="total-price">
        🧾 Total Cost: $
        {cartItems
          .reduce((total, item) => total + item.price * item.quantity, 0)

          .toFixed(2)}
      </h2>
    </>
  );
}
