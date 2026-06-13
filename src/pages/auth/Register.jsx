// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Store, Mail, Lock, Phone, User, Eye, EyeOff, ShieldCheck } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// export default function Register() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [form, setForm] = useState({
//     storeName: "",
//     businessNiche: "",
//     email: "",
//     phone: "",
//     password: "",
//     agreed: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login({ email: form.email, name: "New Vendor", storeName: form.storeName });
//     navigate("/admin/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* ── Left: Dark Marketing Panel ── */}
//       <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] flex-col justify-between p-12 relative overflow-hidden">
//         {/* Background texture dots */}
//         <div className="absolute inset-0 opacity-5"
//           style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
//         />

//         {/* Logo */}
//         <div className="flex items-center gap-2 relative z-10">
//           <div className="w-8 h-8 rounded-lg bg-[#C3ECD7] flex items-center justify-center font-bold text-slate-900 text-sm">V</div>
//           <span className="text-xl font-bold text-white tracking-tight">Venclux</span>
//         </div>

//         {/* Hero copy */}
//         <div className="relative z-10 space-y-6">
//           <div className="inline-flex items-center gap-2 bg-[#C3ECD7]/10 border border-[#C3ECD7]/20 text-[#C3ECD7] text-xs font-medium px-3 py-1.5 rounded-full">
//             <Store className="w-3.5 h-3.5" />
//             Join 2,000+ Nigerian merchants
//           </div>
//           <h1 className="text-4xl font-bold text-white leading-tight">
//             Start selling in 5<br />minutes.
//           </h1>
//           <p className="text-slate-400 text-base leading-relaxed max-w-sm">
//             WhatsApp-powered commerce built for Nigerian vendors. Accept Paystack payments, automate replies, and grow your store — all from one dashboard.
//           </p>

//           {/* Feature chips */}
//           <div className="flex flex-wrap items-center gap-4 pt-4">
//             {["WhatsApp Native", "Auto Replies", "Live Analytics"].map((tag) => (
//               <span key={tag} className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#C3ECD7]" />
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Rating */}
//         <div className="flex items-center gap-3 relative z-10">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <span key={i} className="text-amber-400 text-sm">★</span>
//             ))}
//           </div>
//           <span className="text-slate-400 text-xs">4.9/5 from 800+ reviews</span>
//         </div>
//       </div>

//       {/* ── Right: Registration Form Panel ── */}
//       <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-white overflow-y-auto">
//         {/* Mobile logo */}
//         <div className="flex items-center gap-2 mb-8 lg:hidden">
//           <div className="w-8 h-8 rounded-lg bg-[#C3ECD7] flex items-center justify-center font-bold text-slate-900 text-sm">V</div>
//           <span className="text-xl font-bold text-slate-900 tracking-tight">Venclux</span>
//         </div>

//         <div className="w-full max-w-sm">
//           <h2 className="text-2xl font-bold text-slate-900">Create your store</h2>
//           <p className="text-sm text-slate-500 mt-1 mb-8">Free forever. No credit card required.</p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Store Name */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1.5">Store name</label>
//               <div className="relative">
//                 <Store className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
//                 <input
//                   type="text"
//                   name="storeName"
//                   value={form.storeName}
//                   onChange={handleChange}
//                   placeholder="Adaeze Boutique"
//                   required
//                   className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Business Niche */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1.5">Business niche</label>
//               <div className="relative">
//                 <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
//                 <select
//                   name="businessNiche"
//                   value={form.businessNiche}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent bg-white appearance-none"
//                 >
//                   <option value="">Select your niche</option>
//                   <option>Fashion & Clothing</option>
//                   <option>Electronics & Gadgets</option>
//                   <option>Food & Beverages</option>
//                   <option>Beauty & Skincare</option>
//                   <option>Home & Living</option>
//                   <option>Jewelry & Accessories</option>
//                   <option>Other</option>
//                 </select>
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1.5">Business email</label>
//               <div className="relative">
//                 <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="hello@yourbiz.com"
//                   required
//                   className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* WhatsApp Phone */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1.5">WhatsApp number</label>
//               <div className="relative">
//                 <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   placeholder="+234 703 375 4937"
//                   required
//                   className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1.5">Create password</label>
//               <div className="relative">
//                 <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="At least 8 characters"
//                   required
//                   minLength={8}
//                   className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent"
//                 />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//               <p className="text-xs text-slate-400 mt-1">Must include at least 8 characters</p>
//             </div>

//             {/* Terms */}
//             <div className="flex items-start gap-2">
//               <input type="checkbox" id="agreed" name="agreed" checked={form.agreed} onChange={handleChange}
//                 required className="w-4 h-4 mt-0.5 rounded accent-emerald-600" />
//               <label htmlFor="agreed" className="text-xs text-slate-500 leading-relaxed">
//                 By creating an account I agree to the{" "}
//                 <a href="#" className="font-medium text-slate-900 hover:underline">Terms</a> and{" "}
//                 <a href="#" className="font-medium text-slate-900 hover:underline">Privacy Policy</a>
//               </label>
//             </div>

//             {/* Submit */}
//             <button type="submit"
//               className="w-full bg-[#0F172A] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 mt-2">
//               <ShieldCheck className="w-4 h-4 text-[#C3ECD7]" />
//               Create my store →
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-5">
//             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
//             <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-slate-400">or</span></div>
//           </div>

//           {/* Google sign up */}
//           <button className="w-full flex items-center justify-center gap-2 border border-slate-200 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
//             <svg className="w-4 h-4" viewBox="0 0 24 24">
//               <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//               <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
//               <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//             </svg>
//             Sign up with Google
//           </button>

//           <p className="text-center text-sm text-slate-500 mt-6">
//             Already have an account?{" "}
//             <Link to="/login" className="font-semibold text-slate-900 hover:underline">Sign in</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, Mail, Lock, Phone, User, Eye, EyeOff, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { registerVendor } from "../../api/authApi.js";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", 
    storeName: "",
    businessNiche: "",
    email: "",
    phone: "",
    password: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const generatedSlug = form.storeName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const normalizedEmail = form.email.trim().toLowerCase();
    const cleanedPhone = form.phone.trim().replace(/[\s()-]/g, "");
    const normalizedPhone = cleanedPhone.startsWith("+")
      ? cleanedPhone
      : `+234${cleanedPhone.replace(/^0+/, "")}`;

    const payload = {
      name: form.name.trim() || "New Vendor",
      email: normalizedEmail,
      password: form.password,
      businessName: form.storeName.trim(),
      storeSlug: generatedSlug,
      whatsappNumber: normalizedPhone,
      businessNiche: form.businessNiche
    };

    try {
      const response = await registerVendor(payload);
      if (response.success) {
        localStorage.setItem("venclux_pending_email", normalizedEmail);
        localStorage.setItem("venclux_pending_business", form.storeName.trim());

        // Sync state engine cleanly matching updated key expectations
        if (response.user) {
          login(response.user, response.token || null);
        }
        
        navigate("/verify-otp", { 
          state: { 
            email: normalizedEmail,
            businessName: form.storeName.trim()
          } 
        });
      }
    } catch (err) {
      setError(err.message || "Registration channel blocked. Check infrastructure logs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left: Dark Marketing Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background texture dots */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />

        {/* Logo */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-[#C3ECD7] flex items-center justify-center font-bold text-slate-900 text-sm">V</div>
          <span className="text-xl font-bold text-white tracking-tight">Venclux</span>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#C3ECD7]/10 border border-[#C3ECD7]/20 text-[#C3ECD7] text-xs font-medium px-3 py-1.5 rounded-full">
            <Store className="w-3.5 h-3.5" />
            Join 2,000+ Nigerian merchants
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            Start selling in 5<br />minutes.
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">
            WhatsApp-powered commerce built for Nigerian vendors. Accept Paystack payments, automate replies, and grow your store — all from one dashboard.
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {["WhatsApp Native", "Auto Replies", "Live Analytics"].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C3ECD7]" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-amber-400 text-sm">★</span>
            ))}
          </div>
          <span className="text-slate-400 text-xs">4.9/5 from 800+ reviews</span>
        </div>
      </div>

      {/* ── Right: Registration Form Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-white overflow-y-auto">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-[#C3ECD7] flex items-center justify-center font-bold text-slate-900 text-sm">V</div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Venclux</span>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-slate-900">Create your store</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6">Free forever. No credit card required.</p>

          {/* API Error Notification */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-xs font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent disabled:opacity-60"
                />
              </div>
            </div>

            {/* Store Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Store name</label>
              <div className="relative">
                <Store className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="storeName"
                  value={form.storeName}
                  onChange={handleChange}
                  placeholder="Adaeze Boutique"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent disabled:opacity-60"
                />
              </div>
            </div>

            {/* Business Niche */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Business niche</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  name="businessNiche"
                  value={form.businessNiche}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent bg-white appearance-none disabled:opacity-60"
                >
                  <option value="">Select your niche</option>
                  <option>Fashion & Clothing</option>
                  <option>Electronics & Gadgets</option>
                  <option>Food & Beverages</option>
                  <option>Beauty & Skincare</option>
                  <option>Home & Living</option>
                  <option>Jewelry & Accessories</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Business email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hello@yourbiz.com"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent disabled:opacity-60"
                />
              </div>
            </div>

            {/* WhatsApp Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">WhatsApp number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+234 703 375 4937"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Create password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  disabled={isLoading}
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent disabled:opacity-60"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Must include at least 8 characters</p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input type="checkbox" id="agreed" name="agreed" checked={form.agreed} onChange={handleChange}
                required disabled={isLoading} className="w-4 h-4 mt-0.5 rounded accent-emerald-600" />
              <label htmlFor="agreed" className="text-xs text-slate-500 leading-relaxed">
                By creating an account I agree to the{" "}
                <a href="#" className="font-medium text-slate-900 hover:underline">Terms</a> and{" "}
                <a href="#" className="font-medium text-slate-900 hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0F172A] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C3ECD7]" />
                  <span>Create my store →</span>
                </                >
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-slate-400">or</span></div>
          </div>

          {/* Google sign up */}
          <button className="w-full flex items-center justify-center gap-2 border border-slate-200 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-slate-900 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}