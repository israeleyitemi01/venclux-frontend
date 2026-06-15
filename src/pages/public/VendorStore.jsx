// import React, { useState } from "react";
// import { Search, ExternalLink, MessageCircle, Link2, SlidersHorizontal, Plus } from "lucide-react";
// import { useCart } from "../../context/CartContext";

// const mockProducts = [
//   { id: 1, name: "Retro Court Sneakers", description: "Premium leather, classic court...", price: 65000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", badge: "New" },
//   { id: 2, name: "Minimalist Field Watch", description: "Brushed steel, sapphire crystal", price: 82000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", badge: null },
//   { id: 3, name: "Studio Wireless Pro", description: "Active noise canceling, 40h battery", price: 120000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", badge: "-20%" },
//   { id: 4, name: "Tan Leather Tote", description: "Full-grain leather, brass hardware", price: 68000, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&h=400&fit=crop", badge: null },
//   { id: 5, name: "Aviator Shades", description: "Polarized lenses, titanium frame", price: 28000, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop", badge: null },
//   { id: 6, name: "Oversized Bomber Jacket", description: "Heavyweight nylon, ribbed cuffs", price: 62000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop", badge: "Hot" },
//   { id: 7, name: "Series 7 Smart Watch", description: "Always-on display, fitness tracking", price: 85000, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop", badge: null },
//   { id: 8, name: "Amber Noir Cologne", description: "Notes of oud, sandalwood, amber", price: 38000, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop", badge: null },
// ];

// const categories = ["All", "Clothing", "Accessories", "Electronics"];

// export default function VendorStore() {
//   const { addItem } = useCart();
//   const [activeCategory, setActiveCategory] = useState("All");

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Top Banner */}
//       <div className="h-40 sm:h-56 bg-gradient-to-r from-emerald-100 to-teal-50 relative">
//         <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-emerald-900 border border-emerald-200/50">
//           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
//           Online now
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Store Profile Area */}
//         <div className="relative -mt-16 sm:-mt-20 flex flex-col items-center text-center pb-8 border-b border-slate-100">
//           <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-900 overflow-hidden shadow-lg flex items-center justify-center mb-4">
//             {/* Avatar placeholder / initials */}
//             <span className="text-3xl font-bold text-white tracking-widest">LA</span>
//           </div>

//           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Lumière Atelier</h1>
//           <p className="text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
//             Curated everyday luxury — handcrafted apparel, accessories & tools for the modern African creative.
//           </p>

//           {/* Social Links */}
//           <div className="flex items-center gap-3 mt-5">
//             <a href="#" className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-semibold transition-colors border border-slate-200">
//               <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
//               WhatsApp
//             </a>
//             <a href="#" className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-semibold transition-colors border border-slate-200">
//               <ExternalLink className="w-3.5 h-3.5 text-pink-500" />
//               Instagram
//             </a>
//             <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-semibold transition-colors border border-slate-200">
//               <Link2 className="w-3.5 h-3.5 text-slate-400" />
//               venclux.com/shop/lumiere
//             </button>
//           </div>
//         </div>

//         {/* Toolbar: Search & Filters */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8">
//           <div className="relative w-full md:w-64">
//             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all"
//             />
//           </div>

//           <div className="flex-1 flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
//             {categories.map(cat => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
//                   activeCategory === cat
//                     ? "bg-[#C3ECD7] text-emerald-900"
//                     : "text-slate-500 hover:bg-slate-100"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center justify-end md:w-64">
//             <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
//               <SlidersHorizontal className="w-4 h-4" />
//               Sort
//               <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs ml-1">3</span>
//             </button>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {mockProducts.map((product) => (
//             <div key={product.id} className="group flex flex-col bg-white rounded-2xl hover:shadow-md border border-slate-100 transition-shadow overflow-hidden">
//               <div className="relative aspect-square bg-slate-100 overflow-hidden">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 {product.badge && (
//                   <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
//                     ${product.badge === 'New' ? 'bg-emerald-500 text-white' :
//                       product.badge === 'Hot' ? 'bg-rose-500 text-white' :
//                       'bg-amber-400 text-slate-900'}`
//                   }>
//                     {product.badge}
//                   </div>
//                 )}
//               </div>

//               <div className="flex-1 flex flex-col p-4">
//                 <h3 className="font-bold text-slate-900 line-clamp-1">{product.name}</h3>
//                 <p className="text-xs text-slate-500 mt-1 line-clamp-1">{product.description}</p>
//                 <div className="mt-3 mb-4 font-bold text-slate-900">
//                   ₦{product.price.toLocaleString()}
//                 </div>

//                 <button
//                   onClick={() => addItem(product)}
//                   className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 bg-[#C3ECD7] hover:bg-[#a9dbc0] text-emerald-900 rounded-xl text-sm font-bold transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <footer className="mt-16 pt-8 pb-8 border-t border-slate-200 text-center text-sm text-slate-500">
//           Powered by <span className="font-bold text-slate-900">Venclux</span>
//         </footer>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getCatalogData } from "../../api/vendorApi.js";
import {
  Search,
  ExternalLink,
  MessageCircle,
  Link2,
  SlidersHorizontal,
  Plus,
  Loader2,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

const categories = ["All", "Clothing", "Accessories", "Electronics"];

export default function VendorStore() {
  const { storeSlug } = useParams();
  const { addItem } = useCart();

  // 1. Data & Environment State Layers (Now including logo & banner)
  const [storeMeta, setStoreMeta] = useState({
    businessName: "",
    description: "",
    deliveryFee: 0,
    whatsapp: "",
    instagram: "",
    logo: "",
    banner: "",
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // UI Interactive States
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Lifecycle Sync: Query backend values on mount
  useEffect(() => {
    const fetchStorefrontData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getCatalogData(storeSlug);

        // 🌟 FIXED: Map logo and banner from your incoming API data response payload
        setStoreMeta({
          businessName: data.businessName || "Storefront",
          description:
            data.description || "Welcome to our customized storefront portal.",
          deliveryFee: data.deliveryFee || 0,
          whatsapp: data.whatsapp || "",
          instagram: data.instagram || "",
          logo: data.logo || "",
          banner: data.banner || "",
        });
        setProducts(data.products || []);
      } catch (err) {
        console.error("Storefront mapping error:", err);
        setError(
          err.message ||
            "Could not resolve merchant storefront catalog details.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (storeSlug) fetchStorefrontData();
  }, [storeSlug]);

  // 3. Dynamic Filtering Logic (Search & Categories combined)
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" ||
      (product.category &&
        product.category.toLowerCase() === activeCategory.toLowerCase());

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Extract store initials safely for profile avatar placeholder if no logo exists
  const storeInitials = storeMeta.businessName
    ? storeMeta.businessName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "ST";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <p className="text-sm font-semibold text-slate-500">
          Querying storefront configurations...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-sm shadow-sm space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <p className="text-sm font-medium text-slate-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* 🌟 FIXED: Dynamic Banner Image Display Container */}
      <div className="h-40 sm:h-56 bg-slate-100 relative overflow-hidden">
        {storeMeta.banner ? (
          <img
            src={storeMeta.banner}
            alt={`${storeMeta.businessName} banner`}
            className="w-full h-full object-cover"
          />
        ) : (
          // Dynamic gradient fallback frame if banner is empty
          <div className="w-full h-full bg-gradient-to-r from-emerald-100 to-teal-50" />
        )}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-emerald-900 border border-emerald-200/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Online now
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Store Profile Core Grid Identification Area */}
        <div className="relative -mt-16 sm:-mt-20 flex flex-col items-center text-center pb-8 border-b border-slate-100">
          {/* 🌟 FIXED: Dynamic Logo Display Circle Container */}
          <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-900 overflow-hidden shadow-lg flex items-center justify-center mb-4">
            {storeMeta.logo ? (
              <img
                src={storeMeta.logo}
                alt={`${storeMeta.businessName} logo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-white tracking-widest">
                {storeInitials}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {storeMeta.businessName}
          </h1>
          <p className="text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed text-sm">
            {storeMeta.description}
          </p>

          <p className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mt-2">
            Delivery Fee: ₦{storeMeta.deliveryFee.toLocaleString()}
          </p>

          {/* Action Call Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            {/* WhatsApp Link */}
            {storeMeta.whatsapp && (
              <a
                href={`https://wa.me/${storeMeta.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-semibold transition-colors border border-slate-200"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                WhatsApp
              </a>
            )}

            {/* Instagram Link */}
            {storeMeta.instagram && (
              <a
                href={`https://instagram.com/${storeMeta.instagram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-semibold transition-colors border border-slate-200"
              >
                <ExternalLink className="w-3.5 h-3.5 text-pink-500" />
                Instagram
              </a>
            )}

            {/* 🌟 ADDED: Support Email Link Display Layout */}
            {storeMeta.email && (
              <a
                href={`mailto:${storeMeta.email}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-semibold transition-colors border border-slate-200"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                Email Support
              </a>
            )}

            <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-semibold transition-colors border border-slate-200">
              <Link2 className="w-3.5 h-3.5 text-slate-400" />
              venclux.com/shop/{storeSlug}
            </button>
          </div>
        </div>

        {/* Toolbar Interactivity Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all"
            />
          </div>

          <div className="flex-1 flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#C3ECD7] text-emerald-900"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end md:w-64">
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
              <SlidersHorizontal className="w-4 h-4" />
              Sort
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs ml-1">
                {filteredProducts.length}
              </span>
            </button>
          </div>
        </div>

        {/* Product Pipeline Display Interface */}
        {products.length === 0 ? (
          <div className="text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl py-20 px-4">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              Welcome to our new storefront!
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Our curated catalog options are currently deploying. Check back
              shortly to view our published items.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            No active collection items found matching the current search
            parameters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group flex flex-col bg-white rounded-2xl hover:shadow-md border border-slate-100 transition-shadow overflow-hidden"
              >
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                  )}
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white">
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col p-4">
                  <h3 className="font-bold text-slate-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 mb-4">
                    <p className="font-bold text-slate-900">₦{product.price.toLocaleString()}</p>
                    <p className={`text-xs ${product.stock < 10 ? 'text-rose-500 font-semibold' : 'text-slate-500'}`}>
                      {product.stock || 0} left
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      addItem({
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        qty: 1,
                      })
                    }
                    className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 bg-[#C3ECD7] hover:bg-[#a9dbc0] text-emerald-900 rounded-xl text-sm font-bold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Persistent Branding Footer */}
        <footer className="mt-24 pt-8 pb-8 border-t border-slate-100 text-center text-sm text-slate-400">
          Powered by <span className="font-bold text-slate-700">Venclux</span>
        </footer>
      </div>
    </div>
  );
}
