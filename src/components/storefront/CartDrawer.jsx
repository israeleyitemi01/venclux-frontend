import React from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer({ isOpen, onClose }) {
  const { items, addItem, removeItem, clearCart, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">Your Cart</h2>
            {items.length > 0 && (
              <button 
                onClick={clearCart} 
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 bg-rose-50 px-2 py-1 rounded-md transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-slate-500 mt-10">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-slate-100" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 line-clamp-1">{item.name}</h3>
                    <p className="text-sm font-semibold text-emerald-700 mt-1">₦{item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-slate-500 hover:text-slate-900 disabled:opacity-50"
                      >
                        {item.qty === 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-500" /> : <Minus className="w-3.5 h-3.5" />}
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                      <button 
                        onClick={() => addItem(item)}
                        className="text-slate-500 hover:text-slate-900"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-slate-500">Subtotal</span>
              <span className="text-xl font-bold text-slate-900">₦{totalPrice.toLocaleString()}</span>
            </div>
            <Link 
              to="checkout" 
              onClick={onClose}
              className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
