// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import { usePaystackPayment } from "react-paystack";
// import { getCatalogData, executeStorefrontCheckout } from "../../api/vendorApi.js";
// import { ShieldCheck, Lock, AlertCircle } from "lucide-react";

// export default function Checkout() {
//   const { storeSlug } = useParams();
//   const navigate = useNavigate();
//   const { items, totalPrice, clearCart } = useCart();

//   // Dynamic store state pulled from the vendor's actual database profile
//   const [storeMeta, setStoreMeta] = useState({
//     businessName: "Storefront",
//     subaccountCode: "",
//     deliveryFee: 0
//   });
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Customer Form Inputs
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     notes: ""
//   });

//   // Dynamic calculations utilizing vendor-specific delivery definitions
//   const deliveryFee = storeMeta.deliveryFee;
//   const grandTotal = totalPrice + deliveryFee;

//   // Lifecycle Hook: Fetch merchant data and delivery rules dynamically on mount
//   useEffect(() => {
//     const loadStoreMeta = async () => {
//       try {
//         const data = await getCatalogData(storeSlug);
//         setStoreMeta({
//           businessName: data.businessName || "Our Storefront",
//           subaccountCode: data.paystackSubaccountCode || "",
//           deliveryFee: data.deliveryFee || 0
//         });
//       } catch (err) {
//         console.error("Failed to load vendor identity specifications:", err);
//         setErrorMessage("Could not resolve merchant store registry details.");
//       }
//     };
//     if (storeSlug) loadStoreMeta();
//   }, [storeSlug]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Paystack SDK Engine Configuration
//   const paystackConfig = {
//     reference: `WEB-${Math.floor(100000 + Math.random() * 900000)}-${Date.now()}`,
//     email: form.email || "customer@venclux.com",
//     amount: grandTotal * 100, // Total calculated amount (Products + Delivery) converted to Kobo
//     publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
//     // Splitting payments automatically to vendor subaccount if available
//     ...(storeMeta.subaccountCode && storeMeta.subaccountCode.startsWith("ACCT_") && { subaccount: storeMeta.subaccountCode }),
//     metadata: {
//       custom_fields: [
//         {
//           display_name: "Customer WhatsApp",
//           variable_name: "customer_whatsapp",
//           value: form.phone,
//         },
//         {
//           display_name: "Delivery Notes",
//           variable_name: "delivery_notes",
//           value: form.notes,
//         }
//       ],
//     },
//   };

//   const initializePayment = usePaystackPayment(paystackConfig);

//   // Executed only upon verified payment confirmation from Paystack
//   const handlePaystackSuccessAction = async (reference) => {
//     setIsProcessing(true);
//     setErrorMessage("");

//     try {
//       const checkoutPayload = {
//         customerName: form.name,
//         customerEmail: form.email,
//         customerWhatsapp: form.phone.startsWith("+234") ? form.phone : `+234${form.phone.trim()}`,
//         deliveryAddress: form.address,
//         paymentReference: reference.reference,
//         items: items.map((item) => ({
//           productId: item.id || item._id,
//           quantity: item.qty || item.quantity || 1,
//         })),
//       };

//       console.log("Sending checkout payload to Venclux backend architecture...", checkoutPayload);
//       const result = await executeStorefrontCheckout(storeSlug, checkoutPayload);

//       if (result.success) {
//         clearCart();
//         navigate(`/shop/${storeSlug}/confirmation?trackingId=${result.trackingId}`);
//       }
//     } catch (error) {
//       console.error("Backend checkout persistence loop exception:", error);
//       setErrorMessage(error.response?.data?.message || error.message || "Payment verified, but saving your order record failed.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handlePaystackCloseAction = () => {
//     setIsProcessing(false);
//     setErrorMessage("The secure payment interface was closed before completing checkout.");
//   };

//   const handleCheckoutSubmit = (e) => {
//     e.preventDefault();
//     setErrorMessage("");

//     if (items.length === 0) {
//       setErrorMessage("Your shopping cart session contains no items.");
//       return;
//     }

//     setIsProcessing(true);
//     initializePayment(handlePaystackSuccessAction, handlePaystackCloseAction);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col">
//       {/* Checkout Header */}
//       <header className="bg-white border-b border-slate-200">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-lg bg-[#C3ECD7] flex items-center justify-center font-bold text-slate-900 text-sm">V</div>
//             <span className="text-xl font-bold text-slate-900 tracking-tight">Venclux</span>
//           </div>
//           <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
//             <Lock className="w-3.5 h-3.5 text-slate-400" />
//             Secure Checkout
//           </div>
//         </div>
//       </header>

//       <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//         {/* Breadcrumbs */}
//         <div className="mb-8">
//           <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
//             <Link to=".." className="hover:text-slate-900 transition-colors">Cart</Link>
//             <span>/</span>
//             <span className="text-slate-900">Checkout</span>
//             <span>/</span>
//             <span className="text-slate-400">Confirmation</span>
//           </div>
//           <h1 className="text-3xl font-bold text-slate-900">Complete your order</h1>
//         </div>

//         {errorMessage && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2.5 text-sm font-medium">
//             <AlertCircle className="w-4 h-4 flex-shrink-0" />
//             {errorMessage}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
//           {/* ── Left Column: Form Info ── */}
//           <div className="lg:col-span-7 space-y-8">
//             <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h2 className="text-lg font-bold text-slate-900">Your Details</h2>
//                   <p className="text-xs text-slate-500 mt-1">Receipts and confirmation updates deliver straight via WhatsApp.</p>
//                 </div>
//                 <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">Secure</div>
//               </div>

//               <form onSubmit={handleCheckoutSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
//                   <input
//                     type="text" name="name" required value={form.name} onChange={handleInputChange}
//                     placeholder="Adaeze Enyinnaya"
//                     className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
//                   <input
//                     type="email" name="email" required value={form.email} onChange={handleInputChange}
//                     placeholder="adaeze@gmail.com"
//                     className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1.5">WhatsApp Phone Number</label>
//                   <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#C3ECD7]">
//                     <span className="bg-slate-50 px-3 py-2.5 text-sm text-slate-500 border-r border-slate-200">+234</span>
//                     <input
//                       type="tel" name="phone" required value={form.phone} onChange={handleInputChange}
//                       placeholder="803 345 6789"
//                       className="flex-1 px-3 py-2.5 text-sm bg-slate-50 focus:outline-none"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1.5">Shipping Address</label>
//                   <input
//                     type="text" name="address" required value={form.address} onChange={handleInputChange}
//                     placeholder="28 Admiralty Way, Lekki Phase 1, Lagos"
//                     className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-700 mb-1.5">Delivery Notes <span className="text-slate-400 font-normal">(optional)</span></label>
//                   <textarea
//                     name="notes" rows={2} value={form.notes} onChange={handleInputChange}
//                     placeholder="Gate code, landmarks, or special instructions..."
//                     className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] resize-none"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={items.length === 0 || isProcessing}
//                   className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Lock className="w-4 h-4" />
//                   {isProcessing ? "Opening Secure Payment Portal..." : `Pay ₦${items.length > 0 ? grandTotal.toLocaleString() : 0}`}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* ── Right Column: Totals Summary ── */}
//           <div className="lg:col-span-5 space-y-6">
//             <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
//               <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
//               <p className="text-xs text-slate-500 mt-1 mb-6">{items.length} items from {storeMeta.businessName}</p>

//               <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-1">
//                 {items.length === 0 && <p className="text-sm text-slate-500">Your cart is empty.</p>}
//                 {items.map((item) => (
//                   <div key={item.id || item._id} className="flex gap-4">
//                     {item.image && (
//                       <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-slate-100" />
//                     )}
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start">
//                         <p className="text-sm font-semibold text-slate-900">{item.name}</p>
//                         <p className="text-sm font-bold text-slate-900">₦{item.price.toLocaleString()}</p>
//                       </div>
//                       <p className="text-xs text-slate-500 mt-1">Qty: {item.qty || item.quantity}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
//                 <div className="flex justify-between text-slate-500">
//                   <span>Subtotal</span>
//                   <span className="font-medium text-slate-900">₦{totalPrice.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-slate-500">
//                   <span>Delivery fee ({storeMeta.businessName})</span>
//                   <span className="font-medium text-slate-900">₦{deliveryFee.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-slate-500">
//                   <span>VAT</span>
//                   <span className="font-medium text-slate-900">₦0</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-100 mt-2">
//                   <span>Total</span>
//                   <span>₦{items.length > 0 ? grandTotal.toLocaleString() : 0}</span>
//                 </div>
//               </div>

//               <div className="mt-6 bg-[#f0f9ff] px-4 py-3 rounded-xl flex items-center justify-between border border-blue-100">
//                 <div className="flex items-center gap-2">
//                   <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center font-bold text-[10px]">P</div>
//                   <span className="text-[11px] font-medium text-blue-900">Secured via Paystack Engine</span>
//                 </div>
//                 <ShieldCheck className="w-4 h-4 text-blue-600" />
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
  getCatalogData,
  executeStorefrontCheckout,
} from "../../api/vendorApi.js";
import { ShieldCheck, Lock, AlertCircle } from "lucide-react";

let paystackScriptPromise;

const loadPaystackScript = () => {
  if (window.PaystackPop) return Promise.resolve(window.PaystackPop);

  if (!paystackScriptPromise) {
    paystackScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[src="https://js.paystack.co/v1/inline.js"]',
      );

      if (existingScript) {
        existingScript.addEventListener("load", () =>
          resolve(window.PaystackPop),
        );
        existingScript.addEventListener("error", reject);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => resolve(window.PaystackPop);
      script.onerror = () =>
        reject(new Error("Unable to load the Paystack payment portal."));
      document.body.appendChild(script);
    });
  }

  return paystackScriptPromise;
};

export default function Checkout() {
  const { storeSlug } = useParams();
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  const [storeMeta, setStoreMeta] = useState({
    businessName: "Storefront",
    subaccountCode: "",
    deliveryFee: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const deliveryFee = storeMeta.deliveryFee;
  const grandTotal = totalPrice + deliveryFee;

  useEffect(() => {
    const loadStoreMeta = async () => {
      try {
        const data = await getCatalogData(storeSlug);
        setStoreMeta({
          businessName: data.businessName || "Our Storefront",
          subaccountCode: data.paystackSubaccountCode || "",
          deliveryFee: data.deliveryFee || 0,
        });
      } catch (err) {
        console.error("Failed to load vendor identity specifications:", err);
        setErrorMessage("Could not resolve merchant store registry details.");
      }
    };
    if (storeSlug) loadStoreMeta();
  }, [storeSlug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const savePaidOrder = useCallback(async (paymentResponse) => {
    setIsProcessing(true);
    setErrorMessage("");

    try {
      const cleanedPhone = form.phone.trim().replace(/\s+/g, "");
      const customerWhatsapp = cleanedPhone.startsWith("+")
        ? cleanedPhone
        : `+234${cleanedPhone.replace(/^0+/, "")}`;

      const checkoutPayload = {
        customerName: form.name,
        customerEmail: form.email,
        customerWhatsapp,
        deliveryAddress: form.address,
        deliveryNotes: form.notes,
        paymentReference: paymentResponse.reference || paymentResponse.trxref,
        items: items.map((item) => ({
          productId: item.id || item._id,
          quantity: item.qty || item.quantity || 1,
        })),
      };

      console.log(
        "Sending checkout payload to Venclux backend architecture...",
        checkoutPayload,
      );
      const result = await executeStorefrontCheckout(
        storeSlug,
        checkoutPayload,
      );
      console.log("Backend transaction execution result:", result);

      // Robust conditional execution check that avoids Axios data nest formatting drops
      if (
        result &&
        (result.success || result.trackingId || result.data?.trackingId)
      ) {
        const finalTrackingId =
          result.trackingId ||
          result.data?.trackingId ||
          paymentResponse.reference;
        clearCart();
        navigate(
          `/shop/${storeSlug}/confirmation?trackingId=${encodeURIComponent(
            finalTrackingId,
          )}`,
          { replace: true },
        );
      } else {
        setErrorMessage(
          "Order routing confirmed, but tracking parameter was missing.",
        );
      }
    } catch (error) {
      console.error("Backend checkout persistence loop exception:", error);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Payment verified, but saving your order record failed.",
      );
    } finally {
      setIsProcessing(false);
    }
  }, [clearCart, form.address, form.email, form.name, form.notes, form.phone, items, navigate, storeSlug]);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage("Your shopping cart session contains no items.");
      return;
    }

    if (!form.name || !form.email || !form.phone || !form.address) {
      setErrorMessage(
        "Please fill out all required customer information fields.",
      );
      return;
    }

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      setErrorMessage("Payment setup is incomplete. Please contact the store owner.");
      return;
    }

    if (grandTotal <= 0) {
      setErrorMessage("Your order total is invalid. Please refresh your cart.");
      return;
    }

    setIsProcessing(true);

    try {
      const PaystackPop = await loadPaystackScript();
      const paymentReference = `WEB-${Math.floor(
        100000 + Math.random() * 900000,
      )}-${Date.now()}`;

      const popup = PaystackPop.setup({
        key: publicKey,
        email: form.email,
        amount: Math.round(grandTotal * 100),
        currency: "NGN",
        ref: paymentReference,
        ...(storeMeta.subaccountCode &&
          storeMeta.subaccountCode.startsWith("ACCT_") && {
            subaccount: storeMeta.subaccountCode,
          }),
        metadata: {
          customerName: form.name,
          deliveryAddress: form.address,
          custom_fields: [
            {
              display_name: "Customer WhatsApp",
              variable_name: "customer_whatsapp",
              value: form.phone,
            },
            {
              display_name: "Delivery Notes",
              variable_name: "delivery_notes",
              value: form.notes,
            },
          ],
        },
        callback: (response) => {
          savePaidOrder(response);
        },
        onClose: () => {
          setIsProcessing(false);
          setErrorMessage(
            "The secure payment interface was closed before completing checkout.",
          );
        },
      });

      popup.openIframe();
    } catch (error) {
      console.error("Paystack portal launch exception:", error);
      setIsProcessing(false);
      setErrorMessage(
        error.message ||
          "Could not open the secure payment portal. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C3ECD7] flex items-center justify-center font-bold text-slate-900 text-sm">
              V
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Venclux
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
            <Link to=".." className="hover:text-slate-900 transition-colors">
              Cart
            </Link>
            <span>/</span>
            <span className="text-slate-900">Checkout</span>
            <span>/</span>
            <span className="text-slate-400">Confirmation</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Complete your order
          </h1>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2.5 text-sm font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Your Details
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Receipts and confirmation updates deliver straight via
                    WhatsApp.
                  </p>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                  Secure
                </div>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Adaeze Enyinnaya"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="adaeze@gmail.com"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    WhatsApp Phone Number
                  </label>
                  <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#C3ECD7]">
                    <span className="bg-slate-50 px-3 py-2.5 text-sm text-slate-500 border-r border-slate-200">
                      +234
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="803 345 6789"
                      className="flex-1 px-3 py-2.5 text-sm bg-slate-50 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleInputChange}
                    placeholder="28 Admiralty Way, Lekki Phase 1, Lagos"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Delivery Notes{" "}
                    <span className="text-slate-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    value={form.notes}
                    onChange={handleInputChange}
                    placeholder="Gate code, landmarks, or special instructions..."
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={items.length === 0 || isProcessing}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock className="w-4 h-4" />
                  {isProcessing
                    ? "Opening Secure Payment Portal..."
                    : `Pay ₦${items.length > 0 ? grandTotal.toLocaleString() : 0}`}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
              <h2 className="text-lg font-bold text-slate-900">
                Order Summary
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                {items.length} items from {storeMeta.businessName}
              </p>

              <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-1">
                {items.length === 0 && (
                  <p className="text-sm text-slate-500">Your cart is empty.</p>
                )}
                {items.map((item) => (
                  <div key={item.id || item._id} className="flex gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-100"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-semibold text-slate-900">
                          {item.name}
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Qty: {item.qty || item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery fee ({storeMeta.businessName})</span>
                  <span className="font-medium text-slate-900">
                    ₦{deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>VAT</span>
                  <span className="font-medium text-slate-900">₦0</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-100 mt-2">
                  <span>Total</span>
                  <span>
                    ₦{items.length > 0 ? grandTotal.toLocaleString() : 0}
                  </span>
                </div>
              </div>

              <div className="mt-6 bg-[#f0f9ff] px-4 py-3 rounded-xl flex items-center justify-between border border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center font-bold text-[10px]">
                    P
                  </div>
                  <span className="text-[11px] font-medium text-blue-900">
                    Secured via Paystack Engine
                  </span>
                </div>
                <ShieldCheck className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
