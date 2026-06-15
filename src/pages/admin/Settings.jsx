import React, { useState, useRef } from "react";
import {
  User,
  Store,
  Bell,
  Lock,
  CreditCard,
  Globe,
  ToggleLeft,
  ToggleRight,
  Camera,
  ChevronRight,
  Check,
  Shield,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Trash2,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import StoreSettings from "../../components/settingsModal/Store";
import NotificationsSettings from "../../components/settingsModal/Notifications";
import SecuritySettings from "../../components/settingsModal/Security";
import BillingSettings from "../../components/settingsModal/Billing";
import { SectionCard, FormField, ToggleRow } from "../../components/settingsModal/Shared";
import { useAuth } from "../../context/AuthContext.jsx";
import API from "../../api/axios.js";

/* ─────────────────────────────────────────────
   Tab pill nav
───────────────────────────────────────────── */
const TABS = [
  { key: "profile",       label: "Profile",       icon: User },
  { key: "store",         label: "Store",         icon: Store },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security",      label: "Security",      icon: Lock },
  { key: "billing",       label: "Billing",       icon: CreditCard },
];

/* ═══════════════════════════════════════════════
   Main Settings Page
═══════════════════════════════════════════════ */
export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const avatarRef = useRef(null);

  /* ── Profile state ── */
  const [profile, setProfile] = useState({
    firstName: user?.businessName?.split(" ")[0] || "Vendor",
    lastName: user?.businessName?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    avatar: user?.profilePicture || null,
  });

  const handleProfile  = (e) => setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSaveProfile = async () => {
    try {
      const res = await API.put("/settings/profile", {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone
      });
      if (res.data.statusCode === 200) {
        saveToast("Profile saved successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    }
  };

  /* Avatar via Cloudinary API */
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const res = await API.put("/settings/profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data.statusCode === 200) {
        setProfile((p) => ({ ...p, avatar: res.data.data.profilePicture }));
        alert("Profile picture updated!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload profile picture");
    }
  };

  /* ── Delete Account Modal State ── */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [isDeleting, setIsDeleting] = useState(false);

  React.useEffect(() => {
    let timer;
    if (deleteModalOpen && deleteConfirmText === "DELETE" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [deleteModalOpen, deleteConfirmText, countdown]);

  const handleDeleteAccountClick = () => {
    setDeleteModalOpen(true);
    setCountdown(10);
    setDeleteConfirmText("");
  };

  const confirmAccountDeletion = async () => {
    if (deleteConfirmText !== "DELETE" || countdown > 0) return;
    try {
      setIsDeleting(true);
      await API.delete("/settings/account");
      alert("Account deleted successfully.");
      window.location.href = "/auth/login";
    } catch (err) {
      console.error(err);
      alert("Failed to delete account.");
      setIsDeleting(false);
    }
  };

  /* ── Store state ── */
  const [store, setStore] = useState({
    storeName: "Luxe Boutique",
    storeSlug: "luxe-boutique",
    currency: "NGN",
    language: "en",
    timezone: "Africa/Lagos",
    country: "Nigeria",
  });
  const handleStore = (e) => setStore((p) => ({ ...p, [e.target.name]: e.target.value }));

  /* ── Notifications state ── */
  const [notifs, setNotifs] = useState({
    newOrder: true,
    orderPaid: true,
    lowStock: true,
    customerMsg: true,
    weeklyReport: true,
    promotions: false,
  });
  const toggleNotif = (key) => setNotifs((p) => ({ ...p, [key]: !p[key] }));

  /* ── Security state ── */
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const handlePassword = (e) => setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }));
  const [twoFA, setTwoFA] = useState(false);
  const [sessions, setSessions] = useState([
    { device: "MacBook Pro", location: "Lagos, NG", time: "Active now", current: true },
    { device: "iPhone 14", location: "Lagos, NG", time: "2 hours ago", current: false },
  ]);

  const saveToast = (msg = "Changes saved") => alert(msg); // placeholder — swap for toast lib

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account preferences and store configuration.</p>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === key
                ? "bg-[#0F172A] text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════
          TAB: PROFILE
      ══════════════════════════════════ */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <SectionCard icon={User} title="Personal information" description="Your name and contact details visible to you.">
            {/* Avatar upload */}
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full bg-[#C3ECD7] flex items-center justify-center text-2xl font-bold text-slate-900 overflow-hidden">
                  {profile.avatar
                    ? <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    : `${profile.firstName[0]}${profile.lastName[0]}`}
                </div>
                <button
                  onClick={() => avatarRef.current?.click()}
                  className="absolute bottom-0 right-0 w-7 h-7 bg-[#0F172A] rounded-full flex items-center justify-center border-2 border-white text-white hover:bg-slate-700 transition-colors"
                  title="Upload photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{profile.firstName} {profile.lastName}</p>
                <p className="text-xs text-slate-500 mt-0.5">{profile.email}</p>
                <button
                  onClick={() => avatarRef.current?.click()}
                  className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
                >
                  Change photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <FormField label="First name"    name="firstName" value={profile.firstName} onChange={handleProfile} placeholder="First name" />
              <FormField label="Last name"     name="lastName"  value={profile.lastName}  onChange={handleProfile} placeholder="Last name" />
              <FormField label="Email address" name="email"     value={profile.email}     onChange={handleProfile} placeholder="you@email.com" type="email" />
              <FormField label="Phone number"  name="phone"     value={profile.phone}     onChange={handleProfile} placeholder="+234..." />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
              >
                <Check className="w-4 h-4 text-[#C3ECD7]" /> Save changes
              </button>
            </div>
          </SectionCard>

          {/* Danger Zone */}
          <SectionCard icon={AlertTriangle} title="Danger zone" description="Irreversible account actions.">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-rose-50 border border-rose-100 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-rose-800">Delete account</p>
                <p className="text-xs text-rose-600 mt-0.5">This will permanently delete all your data and cannot be undone.</p>
              </div>
              <button 
                onClick={handleDeleteAccountClick}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" /> Delete account
              </button>
            </div>
          </SectionCard>
        </div>
      )}

      {/* Delete Account Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-rose-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Are you absolutely sure?</h3>
            <p className="text-sm text-slate-500 mb-4">
              This action cannot be undone. This will permanently delete your account, including all products, orders, and customer data.
            </p>
            <p className="text-sm text-slate-700 mb-4 font-medium">
              Please type <span className="font-bold text-rose-600 select-all">DELETE</span> to confirm.
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder=""
              className="w-full text-center px-4 py-2 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent font-bold text-slate-800"
            />
            {countdown > 0 && (
              <p className="text-xs text-rose-500 mb-4 font-bold animate-pulse">
                Action available in {countdown} seconds...
              </p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmAccountDeletion}
                disabled={deleteConfirmText !== "DELETE" || countdown > 0 || isDeleting}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm ${
                  deleteConfirmText === "DELETE" && countdown === 0 && !isDeleting
                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isDeleting ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          TAB: STORE
      ══════════════════════════════════ */}
      {activeTab === "store" && (
        <div className="space-y-6">
          <SectionCard icon={Store} title="Store identity" description="How your store appears across Venclux.">
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
      )}

      {/* ══════════════════════════════════
          TAB: NOTIFICATIONS
      ══════════════════════════════════ */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <SectionCard icon={Bell} title="Email notifications" description="Choose what Venclux emails you about.">
            <ToggleRow
              label="New order received"
              description="Get notified instantly when a customer places an order."
              enabled={notifs.newOrder}
              onToggle={() => toggleNotif("newOrder")}
            />
            <ToggleRow
              label="Order payment confirmed"
              description="Alert when a payment clears and the order is paid."
              enabled={notifs.orderPaid}
              onToggle={() => toggleNotif("orderPaid")}
            />
            <ToggleRow
              label="Low stock alert"
              description="Remind me when a product drops below 10 units."
              enabled={notifs.lowStock}
              onToggle={() => toggleNotif("lowStock")}
            />
            <ToggleRow
              label="Customer WhatsApp message"
              description="Notify me when a customer sends a message via your storefront."
              enabled={notifs.customerMsg}
              onToggle={() => toggleNotif("customerMsg")}
            />
            <ToggleRow
              label="Weekly performance report"
              description="Receive a summary of sales every Monday morning."
              enabled={notifs.weeklyReport}
              onToggle={() => toggleNotif("weeklyReport")}
            />
            <ToggleRow
              label="Venclux product updates & tips"
              description="Occasional emails about new features and best practices."
              enabled={notifs.promotions}
              onToggle={() => toggleNotif("promotions")}
            />

            <div className="flex justify-end pt-2">
              <button
                onClick={() => saveToast("Notification preferences saved!")}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
              >
                <Check className="w-4 h-4 text-[#C3ECD7]" /> Save preferences
              </button>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ══════════════════════════════════
          TAB: SECURITY
      ══════════════════════════════════ */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Change password */}
          <SectionCard icon={Lock} title="Change password" description="Use a strong password you don't reuse elsewhere.">
            <div className="space-y-4 max-w-sm">
              <FormField label="Current password"  name="current" value={passwords.current} onChange={handlePassword} type="password" placeholder="Current password" />
              <FormField label="New password"       name="newPass" value={passwords.newPass} onChange={handlePassword} type="password" placeholder="At least 8 characters" hint="Min 8 chars, include a number and a symbol." />
              <FormField label="Confirm new password" name="confirm" value={passwords.confirm} onChange={handlePassword} type="password" placeholder="Repeat new password" />
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => saveToast("Password updated!")}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
              >
                <Check className="w-4 h-4 text-[#C3ECD7]" /> Update password
              </button>
            </div>
          </SectionCard>

          {/* Two-factor auth */}
          <SectionCard icon={Shield} title="Two-factor authentication" description="Add an extra layer of security to your account.">
            <div className="flex items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <Smartphone className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Authenticator app</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {twoFA ? "Enabled — using Google Authenticator" : "Not enabled — your account is less secure."}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTwoFA((v) => !v)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  twoFA
                    ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-100"
                    : "bg-[#C3ECD7] text-emerald-900 hover:bg-[#a9dbc0]"
                }`}
              >
                {twoFA ? "Disable" : "Enable 2FA"}
              </button>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                <Mail className="w-4 h-4 text-slate-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">Email verification</p>
                <p className="text-xs text-slate-500 mt-0.5">{profile.email || user?.email}</p>
              </div>
              <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
                <Check className="w-3 h-3" /> Verified
              </span>
            </div>
          </SectionCard>

          {/* Active sessions */}
          <SectionCard icon={Globe} title="Active sessions" description="Devices currently signed into your account.">
            <div className="divide-y divide-slate-100">
              {sessions.map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <Smartphone className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{s.device}</p>
                      <p className="text-xs text-slate-500">{s.location} · {s.time}</p>
                    </div>
                  </div>
                  {s.current ? (
                    <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">This device</span>
                  ) : (
                    <button className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors">
                      <LogOut className="w-3.5 h-3.5" /> Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1 pt-2">
              <LogOut className="w-3.5 h-3.5" /> Sign out all other sessions
            </button>
          </SectionCard>
        </div>
      )}

      {/* ══════════════════════════════════
          TAB: BILLING
      ══════════════════════════════════ */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          {/* Current plan */}
          <SectionCard icon={CreditCard} title="Current plan" description="Your Venclux subscription.">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#0F172A] rounded-xl text-white">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold">Venclux Pro</span>
                  <span className="px-2 py-0.5 bg-[#C3ECD7] text-emerald-900 text-[10px] font-bold rounded-full">Active</span>
                </div>
                <p className="text-xs text-slate-400">₦15,000 / month · renews June 28, 2026</p>
              </div>
              <button className="shrink-0 px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 text-sm font-semibold rounded-xl transition-colors">
                Manage plan
              </button>
            </div>

            {/* Plan limits */}
            <div className="space-y-3 pt-2">
              {[
                { label: "Products", used: 48, total: 500 },
                { label: "Monthly orders", used: 84, total: 1000 },
                { label: "Storage", used: 2.1, total: 10, unit: "GB" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span className="font-medium">{item.label}</span>
                    <span>{item.used}{item.unit || ""} of {item.total}{item.unit || ""}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C3ECD7] rounded-full"
                      style={{ width: `${(item.used / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Payment method */}
          <SectionCard icon={CreditCard} title="Payment method" description="Card used for your subscription.">
            <div className="flex items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 bg-white border border-slate-200 rounded-md flex items-center justify-center shadow-sm">
                  <span className="text-[10px] font-bold text-slate-600">VISA</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">•••• •••• •••• 4287</p>
                  <p className="text-xs text-slate-500">Expires 09/27</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 transition-colors">
                Update <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-slate-300 rounded-xl text-sm font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-800 transition-colors w-full justify-center">
              + Add new payment method
            </button>
          </SectionCard>

          {/* Billing history */}
          <SectionCard icon={CreditCard} title="Billing history" description="Your recent invoices.">
            <div className="divide-y divide-slate-100">
              {[
                { date: "May 28, 2026",  amount: "₦15,000", status: "Paid",   inv: "INV-0024" },
                { date: "Apr 28, 2026",  amount: "₦15,000", status: "Paid",   inv: "INV-0023" },
                { date: "Mar 28, 2026",  amount: "₦15,000", status: "Paid",   inv: "INV-0022" },
                { date: "Feb 28, 2026",  amount: "₦15,000", status: "Paid",   inv: "INV-0021" },
              ].map((row) => (
                <div key={row.inv} className="flex items-center justify-between py-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{row.date}</p>
                    <p className="text-xs text-slate-500">{row.inv}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 text-sm">{row.amount}</span>
                    <span className="inline-flex items-center px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                      {row.status}
                    </span>
                    <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
