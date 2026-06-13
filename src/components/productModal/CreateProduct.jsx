// import React, { useState, useEffect } from 'react';
// import { X } from 'lucide-react';

// export default function CreateProduct({ isOpen, onClose, onSave, initialData }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     stock: '',
//     image: '',
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         name: initialData.name,
//         // Remove symbols like '₦' and commas for the number input
//         price: initialData.price.replace(/[^0-9.-]+/g, ''),
//         stock: initialData.stock.toString(),
//         image: initialData.image || '',
//       });
//     } else {
//       setFormData({
//         name: '',
//         price: '',
//         stock: '',
//         image: '',
//       });
//     }
//   }, [initialData, isOpen]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData(prev => ({ ...prev, image: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formattedPrice = `₦${Number(formData.price).toLocaleString()}`;
//     const stockNum = parseInt(formData.stock, 10);
    
//     const newProduct = {
//       id: initialData ? initialData.id : Date.now(),
//       name: formData.name,
//       price: formattedPrice,
//       stock: stockNum,
//       image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
//       lowStock: stockNum < 10,
//     };
    
//     onSave(newProduct);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
//       <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl transform transition-all">
//         <div className="flex items-center justify-between p-5 border-b border-slate-100">
//           <h2 className="text-xl font-bold text-slate-900">{initialData ? 'Edit Product' : 'Create New Product'}</h2>
//           <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
//             <X className="w-5 h-5" />
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} className="p-5 space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Product Name</label>
//             <input 
//               type="text" 
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all"
//               placeholder="e.g. Minimalist Field Watch"
//             />
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-1">Price (₦)</label>
//               <input 
//                 type="number" 
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//                 min="0"
//                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all"
//                 placeholder="0"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-1">Stock</label>
//               <input 
//                 type="number" 
//                 name="stock"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 required
//                 min="0"
//                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all"
//                 placeholder="0"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Product Image</label>
//             <input 
//               type="file" 
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#C3ECD7] file:text-emerald-900 hover:file:bg-[#a9dbc0]"
//             />
//             {formData.image && (
//               <div className="mt-3 relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200">
//                 <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
//               </div>
//             )}
//           </div>

//           <div className="pt-4 flex items-center justify-end gap-3">
//             <button 
//               type="button" 
//               onClick={onClose}
//               className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               className="px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
//             >
//               {initialData ? 'Save Changes' : 'Create Product'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { createProductApi, updateProductApi } from '../../api/productApi.js';

export default function CreateProduct({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    category: 'Uncategorized',
  });
  
  const [imageFile, setImageFile] = useState(null); // Stores raw binary file for Cloudinary
  const [imagePreview, setImagePreview] = useState(''); // Stores preview URL string
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Sync state cleanly when modal mounts or toggles open/close
  useEffect(() => {
    if (isOpen) {
      setSubmitError('');
      setImageFile(null);
      
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          // Ensure price displays cleanly as a numeric string for input typing
          price: initialData.price ? initialData.price.toString() : '',
          stock: initialData.stock ? initialData.stock.toString() : '0',
          description: initialData.description || '',
          category: initialData.category || 'Uncategorized',
        });
        setImagePreview(initialData.image || '');
      } else {
        setFormData({
          name: '',
          price: '',
          stock: '0',
          description: '',
          category: 'Uncategorized',
        });
        setImagePreview('');
      }
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a quick local URL preview string without choking memory blocks
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    // Package fields inside standard Multipart Form Data payload architecture
    const dataPayload = new FormData();
    dataPayload.append('name', formData.name.trim());
    dataPayload.append('price', Number(formData.price));
    dataPayload.append('stock', Number(formData.stock));
    dataPayload.append('description', formData.description.trim());
    dataPayload.append('category', formData.category);

    // --- CLOUDINARY IMAGE FIELD SAFEGUARD INSERTION ---
    // ONLY append if imageFile actually holds a selected binary file object
    if (imageFile) {
      dataPayload.append('image', imageFile);
    } else if (initialData && initialData.image) {
      // If editing and keeping the existing image, pass the current URL string
      dataPayload.append('image', initialData.image);
    }
    // If creating a new product without an image, do NOT append 'image' at all!
    // --------------------------------------------------

    try {
      let response;
      if (initialData) {
        // Run update path
        response = await updateProductApi(initialData._id, dataPayload);
      } else {
        // Run creation path
        response = await createProductApi(dataPayload);
      }

      if (response.success) {
        onSave(); // Refreshes state array within Products.jsx view context instantly!
        onClose(); // Shut container drawer cleanly
      }
    } catch (err) {
      console.error("API Integration Error: ", err);
      setSubmitError(err.response?.data?.message || 'Failed to sync product data parameters with backend engine.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">
            {initialData ? 'Edit Product' : 'Create New Product'}
          </h2>
          <button 
            type="button"
            onClick={onClose} 
            disabled={isSubmitting}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {submitError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
              {submitError}
            </div>
          )}

          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Product Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all disabled:opacity-60"
              placeholder="e.g. Vintage Leather Jacket"
            />
          </div>

          {/* Pricing & Inventory Stock Layout Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Price (₦)</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all disabled:opacity-60"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Stock</label>
              <input 
                type="number" 
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all disabled:opacity-60"
                placeholder="0"
              />
            </div>
          </div>

          {/* Category Dropdown Selection Panel */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all disabled:opacity-60"
            >
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Electronics">Electronics</option>
              <option value="Uncategorized">Uncategorized</option>
            </select>
          </div>

          {/* Description Block */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all resize-none disabled:opacity-60"
              placeholder="Provide a brief context or description for buyers..."
            />
          </div>

          {/* Cloud Binary Image File Attachment Picker */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Product Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#C3ECD7] file:text-emerald-900 hover:file:bg-[#a9dbc0] disabled:opacity-60"
            />
            
            {imagePreview && (
              <div className="mt-3 relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 group bg-slate-50">
                <img 
                  src={imagePreview} 
                  alt="Catalog item snapshot preview" 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </div>

          {/* Action Event Triggers Footer Panel */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 mt-2">
            <button 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-2 disabled:opacity-75"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-[#C3ECD7]" />}
              <span>{initialData ? 'Save Changes' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}