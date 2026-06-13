import React, { useState } from "react";
import { Store as StoreIcon, Globe, Check } from "lucide-react";
import { SectionCard, FormField } from "./Shared";

export default function Store() {
  const [store, setStore] = useState({
    storeName: "Luxe Boutique",
    storeSlug: "luxe-boutique",
    currency: "NGN",
    language: "en",
    timezone: "Africa/Lagos",
    country: "Nigeria",
  });

  const handleStore = (e) => setStore((p) => ({ ...p, [e.target.name]: e.target.value }));
  const saveToast = (msg = "Changes saved") => alert(msg);

  return (
    <div className="space-y-6">
      <SectionCard icon={StoreIcon} title="Store identity" description="How your store appears across Venclux.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Store name"  name="storeName"  value={store.storeName}  onChange={handleStore} placeholder="e.g. Luxe Boutique" />
          <FormField label="Store URL"   name="storeSlug"  value={store.storeSlug}  onChange={handleStore} placeholder="your-store" prefix="venclux.com/shop/" hint="Only lowercase letters, numbers and hyphens." />
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={() => saveToast("Store settings saved!")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
          >
            <Check className="w-4 h-4 text-[#C3ECD7]" /> Save changes
          </button>
        </div>
      </SectionCard>

      <SectionCard icon={Globe} title="Locale & regional" description="Currency, language, and time settings for your store.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Currency */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Currency</label>
            <select
              name="currency"
              value={store.currency}
              onChange={handleStore}
              className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
            >
              <option value="NGN">NGN — Nigerian Naira (₦)</option>
              <option value="USD">USD — US Dollar ($)</option>
              <option value="GBP">GBP — British Pound (£)</option>
              <option value="GHS">GHS — Ghanaian Cedi (₵)</option>
              <option value="KES">KES — Kenyan Shilling (KSh)</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Language</label>
            <select
              name="language"
              value={store.language}
              onChange={handleStore}
              className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="yo">Yorùbá</option>
              <option value="ig">Igbo</option>
              <option value="ha">Hausa</option>
            </select>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Timezone</label>
            <select
              name="timezone"
              value={store.timezone}
              onChange={handleStore}
              className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
            >
              <option value="Africa/Lagos">Africa/Lagos (WAT, UTC+1)</option>
              <option value="Africa/Accra">Africa/Accra (GMT, UTC+0)</option>
              <option value="Africa/Nairobi">Africa/Nairobi (EAT, UTC+3)</option>
              <option value="Europe/London">Europe/London (GMT, UTC+0)</option>
              <option value="America/New_York">America/New_York (EST, UTC-5)</option>
            </select>
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Country</label>
            <select
              name="country"
              value={store.country}
              onChange={handleStore}
              className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
            >
              <option>Nigeria</option>
              <option>Ghana</option>
              <option>Kenya</option>
              <option>South Africa</option>
              <option>United Kingdom</option>
              <option>United States</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => saveToast("Regional settings saved!")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
          >
            <Check className="w-4 h-4 text-[#C3ECD7]" /> Save changes
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
