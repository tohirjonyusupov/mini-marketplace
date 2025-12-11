import React from "react";
import CartItem from "./CartItem";

export default function CartList({ items, onRemove, onChangeQty }) {
  if (items.length === 0) return <div>Cart is empty</div>;
  return (
     <div className="cart-list">
      {items.map((it) => (
        <CartItem
          key={it.id}
          item={it}
          onRemove={onRemove}
          onChangeQty={onChangeQty}
        />
      ))}
    </div>  );
}
