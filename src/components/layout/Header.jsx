import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Plus, Menu, ChevronDown, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
export default function Header({ setIsSidebarOpen }) {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  // Extract initials
  const rawName = user?.name || user?.businessName || "Vendor";
  const initials = rawName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Poll for latest notifications
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/vendor/settings`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('venclux_token')}`
          }
        });
        const data = await response.json();
        if (data.statusCode === 200 && data.data) {
          if (data.data.unreadNotifications !== user?.unreadNotifications) {
            updateUser({ unreadNotifications: data.data.unreadNotifications });
          }
        }
      } catch (err) {
        console.error("Failed to poll notifications", err);
      }
    };

    const interval = setInterval(fetchSettings, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [user?.unreadNotifications, updateUser]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) {
      navigate(`/admin/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleNotificationClick = async () => {
    navigate('/admin/orders');
    if (user?.unreadNotifications > 0) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/vendor/settings/notifications/clear`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('venclux_token')}`
          }
        });
        const data = await response.json();
        if (data.statusCode === 200) {
          updateUser({ unreadNotifications: 0 });
        }
      } catch (err) {
        console.error("Failed to clear notifications", err);
      }
    }
  };
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

        <form onSubmit={handleSearch} className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            name="search"
            placeholder="Search orders, products, customers..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent hidden sm:block"
          />
          {/* Mobile search icon only */}
          <button type="submit" className="sm:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors shrink-0">
             <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Right Actions Block */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Notification Bell */}
        <button 
          onClick={handleNotificationClick}
          className="relative text-slate-500 hover:bg-slate-100 p-1 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
          {user?.unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full border-2 border-white">
              {user.unreadNotifications}
            </span>
          )}
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
        <div className="relative" ref={profileRef}>
          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition-colors"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
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
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </div>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
              <button 
                onClick={() => { setIsProfileOpen(false); navigate("/admin/settings"); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                View Profile
              </button>
              <button 
                onClick={() => { setIsProfileOpen(false); logout(); navigate("/login"); }}
                className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}