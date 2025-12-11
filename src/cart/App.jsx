import React, { useEffect, useState } from "react";
import CartList from "./components/CartList";

const STORAGE_KEY = "mini_market_cart_v1";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const products = localStorage.getItem(STORAGE_KEY);
    products ? setItems(JSON.parse(products)) : setItems([]);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    // Js dan kelgan eventlarni tutamiz
    function handleAdd(event) {
      const product = event.detail;
      setItems((prev) => {
        // Agar mahsulot oldin qo'shilgan bo'lsa, uning miqdorini oshiramiz
        const found = prev.find((p) => p.id === product.id);
        if (found) {
          return prev.map((p) =>
            p.id === product.id ? { ...p, qty: p.qty + 1 } : p
          );
        }
        // Aks holda, yangi mahsulotni qo'shamiz
        return [...prev, { ...product, qty: 1 }];
      });
    }
    window.addEventListener("mini-market-add", handleAdd);
    return () => window.removeEventListener("mini-market-add", handleAdd);
  }, []);

  function removeItem(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function changeQty(id, qty) {
    if (qty < 1) return;
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  }

  const totalSum = items.reduce((total, product) => total + product.price * product.qty, 0);
  const count = items.reduce((total, product) => total + product.qty, 0);

  return (
    <div>
      <div className="item-count" style={{ marginBottom: 8 }}>
        <strong>{count}</strong> items — <strong>${totalSum.toFixed(2)}</strong>
      </div>
      <CartList items={items} onRemove={removeItem} onChangeQty={changeQty} />
    </div>
  );
}
