import React, { useState, useEffect, useRef } from "react";
import { Upload, Eye, ExternalLink, Mail, Phone, Globe, Pencil, Loader2, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx"; 
import API from "../../api/axios.js";

/* ─────────────────────────────────────────────
   SectionCard — reusable wrapper for each settings section
───────────────────────────────────────────── */
function SectionCard({ icon: Icon, title, description, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-slate-600" />
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">{title}</p>
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FormField — reusable labeled input
───────────────────────────────────────────── */
function FormField({ label, name, value, onChange, placeholder, prefix, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#C3ECD7]">
        {prefix && (
          <span className="px-3 py-2.5 bg-slate-50 text-slate-500 text-xs border-r border-slate-200 whitespace-nowrap flex items-center gap-1">
            {prefix}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 px-3 py-2.5 text-sm bg-white focus:outline-none"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Vendor configuration storefront module
───────────────────────────────────────────── */
export default function StorefrontConfig() {
  const { updateUser } = useAuth(); 
  
  const [formData, setFormData] = useState({
    storeName: "",
    tagline: "",
    storeSlug: "",
    description: "",
    whatsapp: "",
    instagram: "",
    email: "",
    logo: "",
    banner: ""
  });

  // Raw file objects staging state for backend delivery
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // Initialize store configuration settings
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setIsLoading(true);
        const response = await API.get("/vendor/storefront/config");
        if (response.data.success) {
          setFormData(response.data.data);
        }
      } catch (err) {
        console.error("Error retrieving configs:", err);
        setMessage({ type: "error", text: "Failed to load storefront data parameters safely." });
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Staging media selected files locally for direct layout visualization
  const handleImageUpload = (e, fieldType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Generate immediate browser memory render string path
    const localPreviewUrl = URL.createObjectURL(file);
    
    setFormData((prev) => ({ ...prev, [fieldType]: localPreviewUrl }));

    if (fieldType === "logo") setLogoFile(file);
    if (fieldType === "banner") setBannerFile(file);
    
    setMessage({ 
      type: "success", 
      text: `${fieldType === 'logo' ? 'Logo' : 'Banner'} staged in local preview. Save to upload.` 
    });
  };

  // Packaging everything safely as multi-form boundary binaries for Node server parsing
  const handleSaveConfig = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setMessage({ type: "", text: "" });

      const submissionData = new FormData();
      submissionData.append("storeName", formData.storeName);
      submissionData.append("tagline", formData.tagline);
      submissionData.append("storeSlug", formData.storeSlug);
      submissionData.append("description", formData.description);
      submissionData.append("whatsapp", formData.whatsapp);
      submissionData.append("instagram", formData.instagram);
      submissionData.append("email", formData.email);

      // Append binary raw structures only if they have been touched/updated
      if (logoFile) submissionData.append("logo", logoFile);
      if (bannerFile) submissionData.append("banner", bannerFile);
      
      const response = await API.put("/vendor/storefront/config", submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setMessage({ type: "success", text: "Storefront properties synchronized successfully!" });
        
        if (response.data.user) {
          updateUser(response.data.user);
        }

        // Wipe staging states on completion success
        setLogoFile(null);
        setBannerFile(null);
        setTimeout(() => setMessage({ type: "", text: "" }), 4000);
      }
    } catch (err) {
      console.error("Save configuration profile failure:", err);
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to commit node adjustments to database." 
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Mapping vendor custom profiles assets...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert Output nodes */}
      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-medium border ${
          message.type === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-100" : "bg-rose-50 text-rose-800 border-rose-100"
        }`}>
          {message.text}
        </div>
      )}

      {/* Page Header Layout items */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Storefront</h1>
          <p className="text-sm text-slate-500 mt-1">Customize what customers see when they visit.</p>
        </div>
        <a
          href={`${window.location.origin}/shop/${formData.storeSlug}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-sm"
        >
          <Eye className="w-4 h-4" />
          View live
        </a>
      </div>

      <form onSubmit={handleSaveConfig} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left form column configuration panel controls ── */}
        <div className="space-y-6">
          
          <SectionCard icon={Globe} title="Brand Identity" description="How your brand looks to customers">
            <div className="space-y-4">
              <FormField label="Store name" name="storeName" value={formData.storeName} onChange={handleChange} placeholder="Luxe Boutique" />
              <FormField label="Tagline" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="Premium essentials, made in Lagos." />
              <FormField label="Store slug" name="storeSlug" value={formData.storeSlug} onChange={handleChange} placeholder="luxe-boutique" prefix="venclux.com/shop/" />
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Store description</label>
                <div className="relative">
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe your store and what you sell..."
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
                  />
                  <div className="absolute bottom-2.5 right-2.5 p-1 text-slate-400">
                    <Pencil className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Media component module block */}
          <SectionCard icon={Upload} title="Media" description="Add your logo and banners to your store tile">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Logo Node block */}
              <div>
                <p className="text-xs font-medium text-slate-600 mb-2">Logo</p>
                <input 
                  type="file" 
                  ref={logoInputRef} 
                  onChange={(e) => handleImageUpload(e, "logo")} 
                  accept="image/*" 
                  className="hidden" 
                />
                <div 
                  onClick={() => logoInputRef.current?.click()}
                  className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-[#C3ECD7] hover:bg-emerald-50/30 transition-all overflow-hidden relative"
                >
                  {formData.logo ? (
                    <img src={formData.logo} alt="Logo preview profile" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-500">Upload Logo</span>
                    </>
                  )}
                  {logoFile && (
                    <span className="absolute bottom-1 bg-emerald-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-full">Staged Changes</span>
                  )}
                </div>
              </div>

              {/* Banner Node block */}
              <div>
                <p className="text-xs font-medium text-slate-600 mb-2">Banner</p>
                <input 
                  type="file" 
                  ref={bannerInputRef} 
                  onChange={(e) => handleImageUpload(e, "banner")} 
                  accept="image/*" 
                  className="hidden" 
                />
                <div 
                  onClick={() => bannerInputRef.current?.click()}
                  className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-[#C3ECD7] hover:bg-emerald-50/30 transition-all overflow-hidden relative"
                >
                  {formData.banner ? (
                    <img src={formData.banner} alt="Banner layout background preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-500">Upload Banner</span>
                    </>
                  )}
                  {bannerFile && (
                    <span className="absolute bottom-1 bg-emerald-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-full">Staged Changes</span>
                  )}
                </div>
              </div>

            </div>
            <p className="text-xs text-slate-400">Recommended properties: PNG/JPG formats processed securely downstream.</p>
          </SectionCard>

          <SectionCard icon={Phone} title="Contact channels" description="Add ways you go through their customer experience">
            <div className="space-y-4">
              <FormField label="WhatsApp number" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+234 703 375 4987" prefix={<Phone className="w-3.5 h-3.5 text-slate-400" />} />
              <FormField label="Instagram handle" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@yourstore" prefix={<ExternalLink className="w-3.5 h-3.5 text-slate-400" />} />
              <FormField label="Support email" name="email" value={formData.email} onChange={handleChange} placeholder="hello@yourstore.com" type="email" prefix={<Mail className="w-3.5 h-3.5 text-slate-400" />} />
            </div>
          </SectionCard>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-6 py-3 bg-[#0F172A] text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSaving ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Saving modifications...</>
              ) : (
                <><Save className="w-4 h-4" />Save Storefront changes</>
              )}
            </button>
          </div>
        </div>

        {/* ── Right Column live layout simulation rendering pane ── */}
        <div className="space-y-4">
          <div className="sticky top-24">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Live preview</p>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-24 bg-gradient-to-r from-[#C3ECD7] to-emerald-200 flex items-center justify-center relative overflow-hidden">
                {formData.banner ? (
                  <img src={formData.banner} alt="Banner dashboard display element" className="w-full h-full object-cover" />
                ) : (
                  <p className="text-xs text-slate-500 absolute bottom-2 right-3">Banner preview space</p>
                )}
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0F172A] text-white flex items-center justify-center font-bold text-lg -mt-8 border-2 border-white shadow uppercase overflow-hidden">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Store logo profile symbol" className="w-full h-full object-cover" />
                    ) : (
                      formData.storeName?.[0] ?? "V"
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{formData.storeName || "Unnamed Store Entity"}</p>
                    <p className="text-xs text-slate-500">{formData.tagline || "Your retail slogan line here."}</p>
                  </div>
                </div>
                
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {formData.description || "Provide an engaging brand background description snippet here."}
                </p>
                
                <div className="pt-3 border-t border-slate-50 space-y-2">
                  {formData.whatsapp && (
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" /> <span className="font-medium">{formData.whatsapp}</span>
                    </div>
                  )}
                  {formData.instagram && (
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <ExternalLink className="w-3.5 h-3.5 text-sky-600" /> <span className="font-medium">{formData.instagram}</span>
                    </div>
                  )}
                  {formData.email && (
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-indigo-500" /> <span className="font-medium text-slate-600">{formData.email}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between bg-slate-50/50">
                <span className="text-xs text-slate-400">Store slug target: <b className="text-slate-600 font-mono">/shop/{formData.storeSlug || "..."}</b></span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}