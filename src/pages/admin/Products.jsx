// import React, { useState } from "react";
// import { Search, Plus, Pencil, Trash2 } from "lucide-react";
// import CreateProduct from "../../components/productModal/CreateProduct";

// const initialProducts = [
//   { id: 1, name: "Retro Court Sneakers", price: "₦65,000", stock: 24, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", lowStock: false },
//   { id: 2, name: "Minimalist Field Watch", price: "₦82,000", stock: 12, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", lowStock: false },
//   { id: 3, name: "Studio Wireless Pro", price: "₦120,000", stock: 5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", lowStock: true },
//   { id: 4, name: "Tan Leather Tote", price: "₦68,000", stock: 18, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&h=400&fit=crop", lowStock: false },
//   { id: 5, name: "Aviator Shades", price: "₦28,000", stock: 45, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop", lowStock: false },
//   { id: 6, name: "Oversized Bomber Jacket", price: "₦62,000", stock: 8, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop", lowStock: true },
//   { id: 7, name: "Series 7 Smart Watch", price: "₦85,000", stock: 32, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop", lowStock: false },
//   { id: 8, name: "Amber Noir Cologne", price: "₦38,000", stock: 60, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop", lowStock: false },
// ];

// function ProductCard({ product, onEdit, onDelete }) {
//   return (
//     <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-[#C3ECD7] hover:shadow-sm transition-all">
//       {/* Product Image */}
//       <div className="aspect-square bg-slate-100 w-full relative">
//         <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
//         <div className="absolute top-3 right-3 flex gap-2">
//           <button onClick={() => onEdit(product)} className="bg-white p-1.5 rounded-lg shadow-sm text-slate-400 hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" title="Edit Product">
//             <Pencil className="w-4 h-4" />
//           </button>
//           <button onClick={() => onDelete(product.id)} className="bg-white p-1.5 rounded-lg shadow-sm text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" title="Delete Product">
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//         {product.lowStock && (
//           <div className="absolute top-3 left-3">
//              <span className="px-2 py-1 bg-rose-50 text-rose-700 text-[10px] font-bold rounded-md">Low Stock</span>
//           </div>
//         )}
//       </div>
      
//       {/* Product Info */}
//       <div className="p-4 space-y-1">
//         <p className="text-sm font-medium text-slate-900 truncate" title={product.name}>
//           {product.name}
//         </p>
//         <div className="flex items-center justify-between mt-2">
//           <p className="font-bold text-slate-900">{product.price}</p>
//           <p className={`text-xs ${product.lowStock ? 'text-rose-500 font-semibold' : 'text-slate-500'}`}>
//             {product.stock} left
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Products() {
//   const [products, setProducts] = useState(initialProducts);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [productToEdit, setProductToEdit] = useState(null);

//   const handleOpenCreate = () => {
//     setProductToEdit(null);
//     setIsModalOpen(true);
//   };

//   const handleOpenEdit = (product) => {
//     setProductToEdit(product);
//     setIsModalOpen(true);
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(prev => prev.filter(p => p.id !== id));
//   };

//   const handleSaveProduct = (newProduct) => {
//     if (productToEdit) {
//       setProducts(prev => prev.map(p => p.id === newProduct.id ? newProduct : p));
//     } else {
//       setProducts(prev => [newProduct, ...prev]);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Products</h1>
//           <p className="text-sm text-slate-500 mt-1">48 active products across 4 categories.</p>
//         </div>
        
//         <button onClick={handleOpenCreate} className="bg-[#0F172A] text-white hover:bg-slate-800 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 w-full sm:w-auto justify-center shadow-sm">
//           <Plus className="w-4 h-4 text-[#C3ECD7]" />
//           <span>New product</span>
//         </button>
//       </div>

//       {/* Toolbar */}
//       <div className="flex items-center gap-3">
//         {/* Search */}
//         <div className="relative flex-1">
//           <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
//           <input 
//             type="text" 
//             placeholder="Search products" 
//             className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent bg-white shadow-sm"
//           />
//         </div>
        
//         {/* View Toggle: Grid / List */}
//         <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm shrink-0">
//           <button className="p-2.5 bg-[#0F172A] text-white transition-colors" title="Grid view">
//             {/* 2x2 grid icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
//               <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
//             </svg>
//           </button>
//           <button className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors" title="List view">
//             {/* List icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
//               <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//         {products.map(product => (
//           <ProductCard key={product.id} product={product} onEdit={handleOpenEdit} onDelete={handleDeleteProduct} />
//         ))}
//       </div>

//       <CreateProduct 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         onSave={handleSaveProduct} 
//         initialData={productToEdit} 
//       />
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { Search, Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import CreateProduct from "../../components/productModal/CreateProduct";
import { fetchVendorProductsApi, deleteProductApi } from "../../api/productApi.js";

function ProductCard({ product, onEdit, onDelete }) {
  // Safe format checker for numeric prices vs fallback strings
  const displayPrice = typeof product.price === "number" 
    ? `₦${product.price.toLocaleString()}` 
    : product.price;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-[#C3ECD7] hover:shadow-sm transition-all">
      {/* Product Image */}
      <div className="aspect-square bg-slate-100 w-full relative">
        <img 
          src={product.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={() => onEdit(product)} 
            className="bg-white p-1.5 rounded-lg shadow-sm text-slate-400 hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" 
            title="Edit Product"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(product._id)} 
            className="bg-white p-1.5 rounded-lg shadow-sm text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" 
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        {product.lowStock && (
          <div className="absolute top-3 left-3">
             <span className="px-2 py-1 bg-rose-50 text-rose-700 text-[10px] font-bold rounded-md">Low Stock</span>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 space-y-1">
        <p className="text-sm font-medium text-slate-900 truncate" title={product.name}>
          {product.name}
        </p>
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold text-slate-900">{displayPrice}</p>
          <p className={`text-xs ${product.lowStock ? 'text-rose-500 font-semibold' : 'text-slate-500'}`}>
            {product.stock} left
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // Load the real backend product array
  const loadProducts = async () => {
    try {
      setError("");
      const resData = await fetchVendorProductsApi();
      if (resData.success) {
        setProducts(resData.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your catalog collection.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenCreate = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this product?")) return;
    try {
      const resData = await deleteProductApi(id);
      if (resData.statusCode === 200) {
        setProducts(prev => prev.filter(p => p._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error dropping item from database collection context.");
    }
  };

  const handleSaveProduct = () => {
    loadProducts();
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Status Alert Notification */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-sm text-slate-500 mt-1">
            {products.length} active {products.length === 1 ? "product" : "products"} loaded inside your catalog inventory.
          </p>
        </div>
        
        <button onClick={handleOpenCreate} className="bg-[#0F172A] text-white hover:bg-slate-800 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 w-full sm:w-auto justify-center shadow-sm">
          <Plus className="w-4 h-4 text-[#C3ECD7]" />
          <span>New product</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products" 
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent bg-white shadow-sm"
          />
        </div>
        
        {/* View Toggle (Restored exactly from original design mockup) */}
        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm shrink-0">
          <button className="p-2.5 bg-[#0F172A] text-white transition-colors" title="Grid view">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          </button>
          <button className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors" title="List view">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Grid Display Conditional Core Engine */}
      {products.length === 0 ? (
        <div className="text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl py-20 px-4">
          <div className="w-12 h-12 text-slate-300 mx-auto mb-3 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-800">No items created yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto mb-6">
            Your catalog environment pipeline is empty. Let's create your first retail storefront item.
          </p>
          <button onClick={handleOpenCreate} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C3ECD7] text-emerald-900 rounded-xl text-xs font-bold hover:bg-[#a9dbc0] transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add First Product
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-sm text-slate-400">
          No catalog assets matched your current search parameters.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onEdit={handleOpenEdit} 
              onDelete={handleDeleteProduct} 
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <CreateProduct 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveProduct} 
          initialData={productToEdit} 
        />
      )}
    </div>
  );
}