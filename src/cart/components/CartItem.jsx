import React from "react";

export default function CartItem({ item, onRemove, onChangeQty }) {
  function handleRemove(id) {
    onRemove(id);
  }

  function decreaseQty(id) {
    onChangeQty(id, item.qty - 1);
  }

  function increaseQty(id) {
    onChangeQty(id, item.qty + 1);
  }

  return (
    <div key={item.id} className="cart-item">
      <div className="item-content">
        <img src={item.image} alt={item.title} className="item-image" />

        <div className="item-details">
          <h3 className="item-title">{item.title}</h3>

          <div className="item-price">
            <span className="price-total">
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </div>

          <div className="item-controls">
            <div className="qty-controls">
              <button
                onClick={() => decreaseQty(item.id)}
                className="qty-btn"
                aria-label="Kamaytirish"
              >
                −
              </button>

              <h1 className="qty-display">{item.qty}</h1>

              <button
                onClick={() => increaseQty(item.id)}
                className="qty-btn"
                aria-label="Oshirish"
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="remove-btn"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
