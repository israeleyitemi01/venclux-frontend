import React, { createContext, useContext, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   CartContext
   Provides cart state (items, add, remove, clear)
   to the entire public storefront subtree.
───────────────────────────────────────────── */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  /* Add a product to cart or increment qty if already present */
  const addItem = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  /* Decrease qty by 1; remove item if qty reaches 0 */
  const removeItem = useCallback((productId) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === productId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  /* Wipe the cart (called after successful checkout) */
  const clearCart = useCallback(() => setItems([]), []);

  /* Derived totals */
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* Convenience hook — use this in any child component */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
