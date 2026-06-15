import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutGrid, 
  ShoppingBag, 
  Package, 
  Users, 
  Zap, 
  Store, 
  BarChart3, 
  Settings,
  LogOut,
  Copy,
  X
} from "lucide-react"; 
import { useAuth } from "../../context/AuthContext.jsx";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // sidebar navigation items 
    const navItems = [
      { name: "Dashboard", path: "/admin/dashboard", icon: LayoutGrid },
      { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
      { name: "Products", path: "/admin/products", icon: Package },
      { name: "Customers", path: "/admin/customers", icon: Users },
      { name: "Automation", path: "/admin/automation", icon: Zap },
      { name: "Storefront", path: "/admin/storefront", icon: Store },
      { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
      { name: "Settings", path: "/admin/settings", icon: Settings },
    ];

    const [copied, setCopied] = useState(false);

    // Helper to handle copying storefront link to clipboard
  const handleCopyLink = () => {
    const storeSlug = user?.storeSlug || "shop";
    navigator.clipboard.writeText(`https://www.venclux.site/shop/${storeSlug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/auth/login");
    }
  };

  const storeName = user?.businessName || user?.name || "";
  const storeInitials = storeName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "LB";

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`w-64 bg-[#0F172A] text-slate-400 h-screen fixed left-0 top-0 flex flex-col justify-between border-r border-slate-800 z-30 transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Upper Brand & Navigation */}
        <div className="overflow-y-auto scrollbar-hide">
          {/* Brand Header */}
          <div className="p-6 flex items-center justify-between border-b border-slate-800 sticky top-0 bg-[#0F172A] z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#C3ECD7] flex items-center justify-center font-bold text-slate-900">
                V
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Venclux</span>
            </div>
            {/* Close button for mobile */}
            <button 
              className="md:hidden p-1 text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on nav click on mobile
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-slate-800 text-white" 
                      : "hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#C3ECD7]" : "text-slate-400"}`} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Storefront Widget & Profile Footer */}
        <div className="p-4 space-y-4 border-t border-slate-800 bg-[#0F172A] shrink-0">
          
          <button 
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors border border-slate-700"
          >
            {copied ? <span className="text-emerald-400 font-bold">Copied!</span> : <><Copy className="w-4 h-4" /> Copy Storefront Link</>}
          </button>

          {/* User Profile Info Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#C3ECD7] text-slate-900 font-semibold flex items-center justify-center text-sm overflow-hidden">
                {user?.profilePicture ? (
                   <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                   <span>{storeInitials}</span>
                )}
              </div>
              <div className="truncate w-28">
                <p className="text-sm font-medium text-white truncate">{storeName}</p>
                <p className="text-xs text-slate-500 truncate">Vendor Portal</p>
              </div>
            </div>
            <button onClick={handleLogout} className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-500 hover:text-rose-400 transition-colors" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}