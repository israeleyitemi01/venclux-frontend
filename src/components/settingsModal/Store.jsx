import React, { useState, useEffect } from "react";
import { Store as StoreIcon, Globe, Check, Loader2 } from "lucide-react";
import API from "../../api/axios"; 
import { SectionCard, FormField } from "./Shared";

export default function Store() {
  const [store, setStore] = useState({
    storeName: "",
    storeSlug: "",
    currency: "NGN",
    language: "en",
    timezone: "Africa/Lagos",
    country: "Nigeria",
  });
  const [loading, setLoading] = useState(true);
  const [savingIdentity, setSavingIdentity] = useState(false);
  const [savingLocale, setSavingLocale] = useState(false);

  // Sync initial configuration states from backend User model on mount
  useEffect(() => {
    API.get("/vendor/settings")
      .then((res) => {
        if (res.data && res.data.data) {
          const userObj = res.data.data;
          setStore({
            storeName: userObj.businessName || "", 
            storeSlug: userObj.storeSlug || "",
            currency: userObj.currency || "NGN",
            language: userObj.language || "en",
            timezone: userObj.timezone || "Africa/Lagos",
            country: userObj.country || "Nigeria",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching store configurations via Axios pipeline:", err);
        setLoading(false);
      });
  }, []);

  const handleStore = (e) => setStore((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const saveSettings = async (setSavingState) => {
    setSavingState(true);
    try {
      const response = await API.put("/vendor/settings/store", store);
      const resBody = response.data;
      
      alert(resBody.message || "Store layout parameters synchronized successfully!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to finalize configurations";
      alert(errorMessage);
    } finally {
      setSavingState(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Store identity form block */}
      <SectionCard icon={StoreIcon} title="Store identity" description="How your store appears across Venclux.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Store name" name="storeName" value={store.storeName} onChange={handleStore} placeholder="e.g. Luxe Boutique" />
          <FormField label="Store URL" name="storeSlug" value={store.storeSlug} onChange={handleStore} placeholder="your-store" prefix="venclux.site/shop/" hint="Only lowercase letters, numbers and hyphens." />
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={() => saveSettings(savingIdentity)}
            disabled={savingIdentity}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 disabled:bg-slate-400 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
          >
            {savingIdentity ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 text-[#C3ECD7]" />} 
            {savingIdentity ? "Saving..." : "Save changes"}
          </button>
        </div>
      </SectionCard>

      {/* Locale settings card */}
      <SectionCard icon={Globe} title="Locale & regional" description="Currency, language, and time settings for your store.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Currency</label>
            <select name="currency" value={store.currency} onChange={handleStore} className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]">
              <option value="NGN">NGN — Nigerian Naira (₦)</option>
              <option value="USD">USD — US Dollar ($)</option>
              <option value="GBP">GBP — British Pound (£)</option>
              <option value="GHS">GHS — Ghanaian Cedi (₵)</option>
              <option value="KES">KES — Kenyan Shilling (KSh)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Language</label>
            <select name="language" value={store.language} onChange={handleStore} className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]">
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="yo">Yorùbá</option>
              <option value="ig">Igbo</option>
              <option value="ha">Hausa</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Timezone</label>
            <select name="timezone" value={store.timezone} onChange={handleStore} className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]">
              <option value="Africa/Lagos">Africa/Lagos (WAT, UTC+1)</option>
              <option value="Africa/Accra">Africa/Accra (GMT, UTC+0)</option>
              <option value="Africa/Nairobi">Africa/Nairobi (EAT, UTC+3)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Country</label>
            <select name="country" value={store.country} onChange={handleStore} className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]">
              <option>Nigeria</option>
              <option>Ghana</option>
              <option>Kenya</option>
              <option>South Africa</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => saveSettings(setSavingLocale)}
            disabled={savingLocale}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 disabled:bg-slate-400 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
          >
            {savingLocale ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 text-[#C3ECD7]" />} 
            {savingLocale ? "Saving changes..." : "Save changes"}
          </button>
        </div>
      </SectionCard>
    </div>
  );
}