import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../storefront/CartDrawer";

export default function StoreLayout() {
  const { totalItems, totalPrice } = useCart();
  const location = useLocation();
  const isCheckout = location.pathname.includes("/checkout");
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 relative flex flex-col">
      {/* The main content (VendorStore or Checkout) */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Floating Cart Widget - Only show if not on checkout and cart has items */}
      {!isCheckout && totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md bg-white border border-[#C3ECD7] shadow-xl p-3 rounded-2xl flex items-center justify-between z-40">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5 text-slate-700" />
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-slate-900 text-white text-[10px] font-bold rounded-full border-2 border-white">
                {totalItems}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Your cart</p>
              <p className="text-sm font-bold text-slate-900">₦{totalPrice.toLocaleString()}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-[#C3ECD7] hover:bg-[#a9dbc0] text-emerald-900 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
          >
            View Cart →
          </button>
        </div>
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
