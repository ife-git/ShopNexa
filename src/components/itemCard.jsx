import React from "react";

export default function ItemCard({ title, price, image, onClick }) {
  return (
    <div className="item-cards" onClick={onClick}>
      <img src={image} />
      <h3>{title}</h3>
      <p>${price}</p>
    </div>
  );
}
