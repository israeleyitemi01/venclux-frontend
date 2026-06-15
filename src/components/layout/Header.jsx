import React from "react";
import { Search, Bell, Plus, Menu, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Header({ setIsSidebarOpen }) {
  const { user } = useAuth();
  
  // Extract initials
  const rawName = user?.name || user?.businessName || "Vendor";
  const initials = rawName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <header className="h-16 border-b border-slate-200 bg-white fixed top-0 left-0 md:left-64 right-0 z-10 px-4 md:px-8 flex items-center justify-between">
      {/* Mobile Menu Toggle & Search */}
      <div className="flex items-center gap-3 w-full max-w-xs md:max-w-md">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search orders, products, customers..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent hidden sm:block"
          />
          {/* Mobile search icon only */}
          <button className="sm:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors shrink-0">
             <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Actions Block */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Notification Bell */}
        <button className="relative text-slate-500 hover:bg-slate-100 p-1 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full border-2 border-white">
            0
          </span>
        </button>

        {/* Quick Action Button */}
        <button className="hidden sm:flex items-center gap-1.5 bg-[#C3ECD7] text-emerald-900 hover:bg-[#a9dbc0] text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
          <span>Quick Actions</span>
        </button>
        <button className="sm:hidden p-2 bg-[#C3ECD7] text-emerald-900 hover:bg-[#a9dbc0] rounded-xl transition-colors">
           <Plus className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-tight">{rawName}</p>
            <p className="text-xs text-slate-500 leading-tight">Vendor</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#C3ECD7] flex items-center justify-center font-bold text-slate-700 overflow-hidden border border-slate-300">
            {user?.profilePicture ? (
               <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <span className="text-xs">{initials}</span>
            )}
          </div>
          {/* <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" /> */}
        </div>
      </div>
    </header>
  );
}