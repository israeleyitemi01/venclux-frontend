// import React from "react";
// import { 
//   ArrowUpRight, 
//   ShoppingBag, 
//   Clock, 
//   CheckCircle2, 
//   Users, 
//   Copy, 
//   ExternalLink,
//   MessageSquare,
//   Store,
//   Shirt,
//   ShoppingBag as BagIcon,
//   Sparkles,
//   Diamond,
//   ChevronRight
// } from "lucide-react";
// import { 
//   ResponsiveContainer, 
//   AreaChart, 
//   Area, 
//   XAxis, 
//   YAxis, 
//   Tooltip, 
//   CartesianGrid 
// } from "recharts";

// const salesData = [
//   { day: "Mon", revenue: 120000 },
//   { day: "Tue", revenue: 190000 },
//   { day: "Wed", revenue: 150000 },
//   { day: "Thu", revenue: 310000 },
//   { day: "Fri", revenue: 240000 },
//   { day: "Sat", revenue: 380000 },
//   { day: "Sun", revenue: 340000 },
// ];

// const recentOrders = [
//   { id: "#VX-1042", customer: "Chioma N.", amount: "₦32,500", status: "Pending", statusColor: "bg-amber-100 text-amber-800" },
//   { id: "#VX-1041", customer: "Tunde A.", amount: "₦18,000", status: "Paid", statusColor: "bg-emerald-100 text-emerald-800" },
//   { id: "#VX-1040", customer: "Bisi K.", amount: "₦64,200", status: "Delivered", statusColor: "bg-blue-100 text-blue-800" },
//   { id: "#VX-1039", customer: "Ifeoma E.", amount: "₦9,750", status: "Paid", statusColor: "bg-emerald-100 text-emerald-800" },
// ];

// const realTimeActivity = [
//   { id: 1, initial: "CN", color: "bg-emerald-100 text-emerald-800", text: "Chioma N. placed an order via WhatsApp", time: "2 min ago" },
//   { id: 2, initial: "TA", color: "bg-amber-100 text-amber-800", text: "Tunde A. completed payment of ₦18,000", time: "12 min ago" },
//   { id: 3, initial: "BK", color: "bg-blue-100 text-blue-800", text: "Order #VX-1040 marked as delivered", time: "34 min ago" },
//   { id: 4, initial: "IE", color: "bg-pink-100 text-pink-800", text: "Ifeoma E. visited your storefront from Instagram", time: "1 hr ago" },
// ];

// const topProducts = [
//   { id: 1, icon: Shirt, bgColor: "bg-pink-100", iconColor: "text-pink-600", name: "Ankara Silk Gown", sold: "28 sold", price: "₦420,000" },
//   { id: 2, icon: BagIcon, bgColor: "bg-amber-100", iconColor: "text-amber-600", name: "Leather Tote Bag", sold: "19 sold", price: "₦285,000" },
//   { id: 3, icon: Sparkles, bgColor: "bg-emerald-100", iconColor: "text-emerald-600", name: "Beaded Statement Necklace", sold: "14 sold", price: "₦168,000" },
//   { id: 4, icon: Diamond, bgColor: "bg-blue-100", iconColor: "text-blue-600", name: "Gold Hoop Earrings", sold: "11 sold", price: "₦132,000" },
// ];

// export default function Dashboard() {
//   const handleCopyLink = () => {
//     navigator.clipboard.writeText("venclux.com/shop/adaeze-enyinnaya");
//     alert("Storefront link copied to clipboard!");
//   };

//   return (
//     <div className="space-y-8">
//       {/* 1. Welcome & Storefront Link Banner */}
//       <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//             Welcome back, Adaeze 👋
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">Here's what's happening with your store today.</p>
//         </div>
//         <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100 h-fit">
//           <CheckCircle2 className="w-3.5 h-3.5" />
//           <span>All systems operational</span>
//         </div>
//       </div>

//       {/* Storefront Link Widget */}
//       <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
//         <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">Your Storefront Link</p>
//         <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//           <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-xl">
//             <div className="w-8 h-8 bg-[#C3ECD7] rounded-lg flex items-center justify-center shrink-0">
//               <Store className="w-4 h-4 text-emerald-900" />
//             </div>
//             <span className="text-sm font-medium text-slate-700 truncate">
//               venclux.com/shop/adaeze-enyinnaya
//             </span>
//             <button 
//               onClick={handleCopyLink}
//               className="ml-auto bg-[#C3ECD7] text-emerald-900 hover:bg-[#a9dbc0] px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
//             >
//               <Copy className="w-3.5 h-3.5" />
//               Copy Link
//             </button>
//           </div>
          
//           <div className="flex items-center gap-3 text-sm text-slate-500">
//             <span className="font-medium">Share to:</span>
//             <div className="flex gap-2">
//                <button className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors">
//                  <ExternalLink className="w-4 h-4" />
//                </button>
//                <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
//                  <MessageSquare className="w-4 h-4" />
//                </button>
//                <button className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center hover:bg-sky-100 transition-colors">
//                  <ExternalLink className="w-4 h-4" />
//                </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. Top Metric Cards Row */}
//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
//         {/* Total Revenue */}
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 col-span-2 lg:col-span-1 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Total Revenue</span>
//             <ShoppingBag className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">₦1,240,000</p>
//           <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
//             <ArrowUpRight className="w-3 h-3" />
//             <span>+12.4% this week</span>
//           </div>
//         </div>

//         {/* Total Orders */}
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Total Orders</span>
//             <ShoppingBag className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">84</p>
//           <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
//             <ArrowUpRight className="w-3 h-3" />
//             <span>+8 today</span>
//           </div>
//         </div>

//         {/* Pending Orders */}
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Pending Orders</span>
//             <Clock className="w-4 h-4 text-amber-500" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">12</p>
//           <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
//             <span>Pending action</span>
//           </div>
//         </div>

//         {/* Paid Orders */}
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Paid Orders</span>
//             <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">58</p>
//           <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
//             <ArrowUpRight className="w-3 h-3" />
//             <span>+12%</span>
//           </div>
//         </div>

//         {/* Active Customers */}
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Active Customers</span>
//             <Users className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">37</p>
//           <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
//             <ArrowUpRight className="w-3 h-3" />
//             <span>+3 new</span>
//           </div>
//         </div>
//       </div>

//       {/* 3. Main Analytics Chart & Recent Orders Split Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Sales Overview Area Chart */}
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 lg:col-span-2 space-y-4 shadow-sm">
//           <div>
//             <h3 className="text-lg font-bold text-slate-900">Sales Overview</h3>
//             <p className="text-sm text-slate-500 mb-4">Revenue across the last 7 days</p>
//             <div className="flex gap-1 bg-slate-50 p-1 rounded-lg text-xs font-semibold text-slate-500 w-fit border border-slate-100">
//               <button className="px-3 py-1.5 bg-white rounded-md shadow-sm text-slate-900">7D</button>
//               <button className="px-3 py-1.5 hover:text-slate-900">30D</button>
//               <button className="px-3 py-1.5 hover:text-slate-900">90D</button>
//             </div>
//           </div>

//           <div className="h-64 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                 <defs>
//                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
//                     <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
//                 <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#94A3B8" className="text-xs" />
//                 <YAxis tickLine={false} axisLine={false} stroke="#94A3B8" className="text-xs" />
//                 <Tooltip />
//                 <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Recent Orders Panel */}
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
//           <div>
//             <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
//             <p className="text-sm text-slate-500">Latest 4 transactions</p>
//             <ArrowUpRight className="w-4 h-4 text-slate-400 mt-2" />
//           </div>

//           <div className="divide-y divide-slate-100 pt-2">
//             {recentOrders.map((order) => (
//               <div key={order.id} className="py-4 flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-slate-400 mb-0.5">{order.id}</p>
//                   <p className="font-semibold text-slate-900 text-sm">{order.customer}</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <p className="font-bold text-slate-900 text-sm">{order.amount}</p>
//                   <span className={`inline-flex items-center justify-center text-[10px] font-bold px-2.5 py-1 rounded-md ${order.statusColor}`}>
//                     {order.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 4. Bottom Activity Log Split Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Realtime Activity Stream */}
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
//           <div>
//             <h3 className="text-lg font-bold text-slate-900">Realtime Activity</h3>
//             <p className="text-sm text-slate-500">Live feed from your storefront</p>
//             <div className="flex items-center gap-1.5 mt-3">
//                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
//                <span className="text-xs font-semibold text-emerald-600">Live</span>
//             </div>
//           </div>

//           <div className="space-y-6">
//             {realTimeActivity.map((activity) => (
//               <div key={activity.id} className="flex items-start gap-4">
//                 <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activity.color}`}>
//                   {activity.initial}
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-slate-700 text-sm">{activity.text}</p>
//                   <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Top Selling Products List */}
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
//           <div>
//             <h3 className="text-lg font-bold text-slate-900">Top Products</h3>
//             <p className="text-sm text-slate-500 mb-3">Best sellers this month</p>
//             <button className="text-xs font-semibold text-slate-700 flex items-center gap-1 hover:text-slate-900 transition-colors">
//               View all <ChevronRight className="w-3.5 h-3.5" />
//             </button>
//           </div>

//           <div className="space-y-5">
//             {topProducts.map((product) => {
//                const Icon = product.icon;
//                return (
//                 <div key={product.id} className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${product.bgColor}`}>
//                        <Icon className={`w-5 h-5 ${product.iconColor}`} />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-slate-900">{product.name}</p>
//                       <p className="text-xs text-slate-500">{product.sold}</p>
//                     </div>
//                   </div>
//                   <span className="font-bold text-slate-900">{product.price}</span>
//                 </div>
//                );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// // src/pages/admin/Dashboard.jsx
// import React, { useState, useEffect } from "react";
// import { 
//   ArrowUpRight, ShoppingBag, Clock, CheckCircle2, Users, 
//   Copy, MessageSquare, Store, Shirt, Loader2,
//   ChevronRight, AlertCircle, Sparkles, Diamond
// } from "lucide-react";
// import { 
//   ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
// } from "recharts";
// import { useAuth } from "../../context/AuthContext";
// import API from "../../api/axios.js";

// export default function Dashboard() {
//   const { user } = useAuth(); // Reads live database profile parameters from context
  
//   const [dashboardData, setDashboardData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Dynamically captures 'http://localhost:5173' (or production URL) + the backend routing parameter slug
//   const storefrontUrl = `${window.location.origin}/shop/${user?.storeSlug || ""}`;

//   useEffect(() => {
//     const fetchDashboardMetrics = async () => {
//       try {
//         setIsLoading(true);
//         const response = await API.get("/dashboard/summary");
//         if (response.data.success) {
//           setDashboardData(response.data.data);
//         }
//       } catch (err) {
//         setError("Failed to fetch live operational data from the Venclux backend engine.");
//         console.error("Dashboard data fetch error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardMetrics();
//   }, []);

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(storefrontUrl);
//     alert("Multi-tenant storefront layout hyperlink copied to clipboard!");
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
//         <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
//         <p className="text-sm font-medium text-slate-500">Synchronizing live store environment configurations...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3 max-w-xl mx-auto mt-12">
//         <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
//         <div>
//           <h4 className="font-bold text-sm">System Pipeline Aborted</h4>
//           <p className="text-xs mt-1 text-red-600 leading-relaxed">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   // Destructure real collection matrices from database payload
//   const { cards, salesData, recentOrders, realTimeActivity, topProducts } = dashboardData || {};

//   return (
//     <div className="space-y-8">
//       {/* 1. Dynamic Greeting & Status Banner */}
//       <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//             Welcome back, {user?.name || "Merchant"} 👋
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">Here's what's happening with your store today.</p>
//         </div>
//         <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100 h-fit">
//           <CheckCircle2 className="w-3.5 h-3.5" />
//           <span>All systems operational</span>
//         </div>
//       </div>

//       {/* Storefront Link Widget */}
//       <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
//         <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">Your Storefront Link</p>
//         <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//           <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-xl overflow-hidden">
//             <div className="w-8 h-8 bg-[#C3ECD7] rounded-lg flex items-center justify-center shrink-0">
//               <Store className="w-4 h-4 text-emerald-900" />
//             </div>
//             <span className="text-sm font-medium text-slate-700 truncate select-all">
//               {storefrontUrl}
//             </span>
//             <button 
//               onClick={handleCopyLink}
//               className="ml-auto bg-[#C3ECD7] text-emerald-900 hover:bg-[#a9dbc0] px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
//             >
//               <Copy className="w-3.5 h-3.5" />
//               Copy Link
//             </button>
//           </div>
          
//           <div className="flex items-center gap-3 text-sm text-slate-500">
//             <span className="font-medium">Share to:</span>
//             <div className="flex gap-2">
//                <a 
//                  href={`https://wa.me/?text=${encodeURIComponent("Check out my shop on Venclux: " + storefrontUrl)}`}
//                  target="_blank" 
//                  rel="noreferrer"
//                  className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors"
//                >
//                  <MessageSquare className="w-4 h-4" />
//                </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. Top Metric Cards Row */}
//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
//         {/* Total Revenue */}
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 col-span-2 lg:col-span-1 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Total Revenue</span>
//             <ShoppingBag className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">₦{(cards?.totalRevenue || 0).toLocaleString()}</p>
//           <div className="text-[10px] text-slate-400 font-medium">Live processing metric</div>
//         </div>

//         {/* Total Orders */}
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Total Orders</span>
//             <ShoppingBag className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.totalOrders || 0}</p>
//           <div className="text-[10px] text-slate-400 font-medium">Total lifespan sum</div>
//         </div>

//         {/* Pending Orders */}
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Pending Orders</span>
//             <Clock className="w-4 h-4 text-amber-500" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.pendingOrders || 0}</p>
//           <div className="text-[10px] text-amber-600 font-semibold">Awaiting delivery</div>
//         </div>

//         {/* Paid Orders */}
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Paid Orders</span>
//             <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.paidOrders || 0}</p>
//           <div className="text-[10px] text-emerald-600 font-semibold">Settled checkouts</div>
//         </div>

//         {/* Active Customers */}
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Active Customers</span>
//             <Users className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.activeCustomers || 0}</p>
//           <div className="text-[10px] text-slate-400 font-medium">Unique consumer nodes</div>
//         </div>
//       </div>

//       {/* 3. Main Analytics Chart & Recent Orders Split Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Sales Overview Area Chart */}
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 lg:col-span-2 space-y-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">Sales Overview</h3>
//               <p className="text-sm text-slate-500">Revenue across the last 7 days</p>
//             </div>
//           </div>

//           <div className="h-64 w-full">
//             {salesData && salesData.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                   <defs>
//                     <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
//                       <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
//                   <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#94A3B8" className="text-xs" />
//                   <YAxis tickLine={false} axisLine={false} stroke="#94A3B8" className="text-xs" tickFormatter={(v) => `₦${v >= 1000 ? (v/1000) + 'k' : v}`} />
//                   <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, "Revenue"]} />
//                   <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="h-full w-full bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 text-center p-4">
//                 No revenue telemetry logged over the current evaluation timeline.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Recent Orders Panel */}
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
//           <div>
//             <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
//             <p className="text-sm text-slate-500">Latest transactions stream</p>
//           </div>

//           <div className="divide-y divide-slate-100 pt-2 h-[260px] overflow-y-auto pr-1">
//             {recentOrders && recentOrders.length > 0 ? (
//               recentOrders.map((order) => (
//                 <div key={order.id} className="py-3.5 flex items-center justify-between gap-2">
//                   <div>
//                     <p className="text-[10px] text-slate-400 font-mono">{order.id}</p>
//                     <p className="font-semibold text-slate-900 text-sm truncate max-w-[120px]">{order.customer}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <p className="font-bold text-slate-900 text-sm shrink-0">{order.amount}</p>
//                     <span className={`inline-flex items-center justify-center text-[9px] font-extrabold px-2 py-0.5 rounded ${order.statusColor}`}>
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
//                 No product checkouts registered yet. Your storefront is live and ready for traffic.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 4. Bottom Activity Log Split Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Realtime Activity Stream */}
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">Realtime Activity</h3>
//               <p className="text-sm text-slate-500">Live feed from your storefront</p>
//             </div>
//             <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
//                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
//                <span className="text-[10px] font-bold text-emerald-700 uppercase">Live</span>
//             </div>
//           </div>

//           <div className="space-y-5 h-[280px] overflow-y-auto pr-1">
//             {realTimeActivity && realTimeActivity.length > 0 ? (
//               realTimeActivity.map((activity) => (
//                 <div key={activity.id} className="flex items-start gap-4">
//                   <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activity.color}`}>
//                     {activity.initial}
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-slate-700 text-sm leading-snug">{activity.text}</p>
//                     <p className="text-[11px] text-slate-400 mt-0.5">{activity.time}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
//                 No ambient real-time storefront notifications captured yet.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Top Selling Products List */}
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">Top Products</h3>
//               <p className="text-sm text-slate-500">Best sellers this month</p>
//             </div>
//             <button className="text-xs font-semibold text-slate-600 flex items-center gap-1 hover:text-slate-900 transition-colors">
//               View all <ChevronRight className="w-3.5 h-3.5" />
//             </button>
//           </div>

//           <div className="space-y-4 h-[280px] overflow-y-auto pr-1">
//             {topProducts && topProducts.length > 0 ? (
//               topProducts.map((product) => {
//                  // Dynamic check fallback to prevent mapping failure on custom icon text handles
//                  const IconComponent = product.icon || Shirt;
//                  return (
//                   <div key={product.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors">
//                     <div className="flex items-center gap-4">
//                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${product.bgColor || 'bg-emerald-50'}`}>
//                          <IconComponent className={`w-5 h-5 ${product.iconColor || 'text-emerald-600'}`} />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-slate-900 truncate max-w-[160px]">{product.name}</p>
//                         <p className="text-xs text-slate-500">{product.sold}</p>
//                       </div>
//                     </div>
//                     <span className="font-bold text-slate-900 text-sm">{product.price}</span>
//                   </div>
//                  );
//               })
//             ) : (
//               <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
//                 Product sales metrics will map automatically once distribution cycles run.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { 
//   ArrowUpRight, ShoppingBag, Clock, CheckCircle2, Users, 
//   Copy, MessageSquare, Store, Shirt, Loader2,
//   ChevronRight, AlertCircle, Sparkles, Diamond
// } from "lucide-react";
// import { 
//   ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
// } from "recharts";
// import { useAuth } from "../../context/authContext"; // ✅ FIXED: Path changed to lowercase 'authContext'
// import API from "../../api/axios.js";

// export default function Dashboard() {
//   const { user } = useAuth(); // Reads live database profile parameters from context
  
//   const [dashboardData, setDashboardData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   const rawName = user?.name || user?.businessName || "Merchant";
//   const firstName = rawName.trim().split(" ")[0];

//   const vendorStoreSlug = user?.storeSlug || user?.vendor?.storeSlug || user?.store?.slug || (user?.businessName 
//     ? user.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
//     : "");

//   const storefrontUrl = `${window.location.origin}/shop/${vendorStoreSlug}`;

//   useEffect(() => {
//     const fetchDashboardMetrics = async () => {
//       try {
//         setIsLoading(true);
//         const response = await API.get("/dashboard/summary");
//         if (response.data.success) {
//           setDashboardData(response.data.data);
//         }
//       } catch (err) {
//         setError("Failed to fetch live operational data from the Venclux backend engine.");
//         console.error("Dashboard data fetch error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardMetrics();
//   }, []);

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(storefrontUrl);
//     alert("Storefront link copied to clipboard!");
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
//         <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
//         <p className="text-sm font-medium text-slate-500">Synchronizing live store environment configurations...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3 max-w-xl mx-auto mt-12">
//         <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
//         <div>
//           <h4 className="font-bold text-sm">System Pipeline Aborted</h4>
//           <p className="text-xs mt-1 text-red-600 leading-relaxed">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   const { cards, salesData, recentOrders, realTimeActivity, topProducts } = dashboardData || {};

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//             Welcome back, {firstName} 👋
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">Here's what's happening with your store today.</p>
//         </div>
//         <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100 h-fit">
//           <CheckCircle2 className="w-3.5 h-3.5" />
//           <span>All systems operational</span>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
//         <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">Your Storefront Link</p>
//         <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//           <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-xl overflow-hidden">
//             <div className="w-8 h-8 bg-[#C3ECD7] rounded-lg flex items-center justify-center shrink-0">
//               <Store className="w-4 h-4 text-emerald-900" />
//             </div>
//             <span className="text-sm font-medium text-slate-700 truncate select-all">
//               {storefrontUrl}
//             </span>
//             <button 
//               onClick={handleCopyLink}
//               className="ml-auto bg-[#C3ECD7] text-emerald-900 hover:bg-[#a9dbc0] px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
//             >
//               <Copy className="w-3.5 h-3.5" />
//               Copy Link
//             </button>
//           </div>
          
//           <div className="flex items-center gap-3 text-sm text-slate-500">
//             <span className="font-medium">Share to:</span>
//             <div className="flex gap-2">
//                <a 
//                  href={`https://wa.me/?text=${encodeURIComponent("Check out my shop on Venclux: " + storefrontUrl)}`}
//                  target="_blank" 
//                  rel="noreferrer"
//                  className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors"
//                >
//                  <MessageSquare className="w-4 h-4" />
//                </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 col-span-2 lg:col-span-1 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Total Revenue</span>
//             <ShoppingBag className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">₦{(cards?.totalRevenue || 0).toLocaleString()}</p>
//           <div className="text-[10px] text-slate-400 font-medium">Live processing metric</div>
//         </div>

//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Total Orders</span>
//             <ShoppingBag className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.totalOrders || 0}</p>
//           <div className="text-[10px] text-slate-400 font-medium">Total lifespan sum</div>
//         </div>

//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Pending Orders</span>
//             <Clock className="w-4 h-4 text-amber-500" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.pendingOrders || 0}</p>
//           <div className="text-[10px] text-amber-600 font-semibold">Awaiting delivery</div>
//         </div>

//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Paid Orders</span>
//             <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.paidOrders || 0}</p>
//           <div className="text-[10px] text-emerald-600 font-semibold">Settled checkouts</div>
//         </div>

//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Active Customers</span>
//             <Users className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.activeCustomers || 0}</p>
//           <div className="text-[10px] text-slate-400 font-medium">Unique consumer nodes</div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 lg:col-span-2 space-y-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">Sales Overview</h3>
//               <p className="text-sm text-slate-500">Revenue across the last 7 days</p>
//             </div>
//           </div>

//           <div className="h-64 w-full">
//             {salesData && salesData.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                   <defs>
//                     <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
//                       <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
//                   <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#94A3B8" className="text-xs" />
//                   <YAxis tickLine={false} axisLine={false} stroke="#94A3B8" className="text-xs" tickFormatter={(v) => `₦${v >= 1000 ? (v/1000) + 'k' : v}`} />
//                   <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, "Revenue"]} />
//                   <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="h-full w-full bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 text-center p-4">
//                 No revenue telemetry logged over the current evaluation timeline.
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
//           <div>
//             <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
//             <p className="text-sm text-slate-500">Latest transactions stream</p>
//           </div>

//           <div className="divide-y divide-slate-100 pt-2 h-[260px] overflow-y-auto pr-1">
//             {recentOrders && recentOrders.length > 0 ? (
//               recentOrders.map((order, idx) => (
//                 <div key={order.id || idx} className="py-3.5 flex items-center justify-between gap-2">
//                   <div>
//                     <p className="text-[10px] text-slate-400 font-mono">{order.id}</p>
//                     <p className="font-semibold text-slate-900 text-sm truncate max-w-[120px]">{order.customer}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <p className="font-bold text-slate-900 text-sm shrink-0">{order.amount}</p>
//                     <span className={`inline-flex items-center justify-center text-[9px] font-extrabold px-2 py-0.5 rounded ${order.statusColor}`}>
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
//                 No product checkouts registered yet. Your storefront is live and ready for traffic.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">Realtime Activity</h3>
//               <p className="text-sm text-slate-500">Live feed from your storefront</p>
//             </div>
//             <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
//                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
//                <span className="text-[10px] font-bold text-emerald-700 uppercase">Live</span>
//             </div>
//           </div>

//           <div className="space-y-5 h-[280px] overflow-y-auto pr-1">
//             {realTimeActivity && realTimeActivity.length > 0 ? (
//               realTimeActivity.map((activity, idx) => (
//                 <div key={activity.id || idx} className="flex items-start gap-4">
//                   <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activity.color}`}>
//                     {activity.initial}
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-slate-700 text-sm leading-snug">{activity.text}</p>
//                     <p className="text-[11px] text-slate-400 mt-0.5">{activity.time}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
//                 No ambient real-time storefront notifications captured yet.
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">Top Products</h3>
//               <p className="text-sm text-slate-500">Best sellers this month</p>
//             </div>
//             <button className="text-xs font-semibold text-slate-600 flex items-center gap-1 hover:text-slate-900 transition-colors">
//               View all <ChevronRight className="w-3.5 h-3.5" />
//             </button>
//           </div>

//           <div className="space-y-4 h-[280px] overflow-y-auto pr-1">
//             {topProducts && topProducts.length > 0 ? (
//               topProducts.map((product, idx) => {
//                  const IconComponent = product.icon || Shirt;
//                  return (
//                   <div key={product.id || idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors">
//                     <div className="flex items-center gap-4">
//                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${product.bgColor || 'bg-emerald-50'}`}>
//                          <IconComponent className={`w-5 h-5 ${product.iconColor || 'text-emerald-600'}`} />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-slate-900 truncate max-w-[160px]">{product.name}</p>
//                         <p className="text-xs text-slate-500">{product.sold}</p>
//                       </div>
//                     </div>
//                     <span className="font-bold text-slate-900 text-sm">{product.price}</span>
//                   </div>
//                  );
//               })
//             ) : (
//               <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
//                 Product sales metrics will map automatically once distribution cycles run.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   TrendingUp,
//   ShoppingBag,
//   Clock,
//   Users,
//   CheckCircle,
//   ArrowRight,
//   Loader2,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import MetricCard from "../../components/dashboard/MetricCard";
// import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
// import TopProductsList from "../../components/dashboard/TopProductsList";
// import ActivityFeed from "../../components/dashboard/ActivityFeed";
// import API from "../../api/axios.js";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [dashboardData, setDashboardData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDashboardMetrics = async () => {
//       try {
//         setIsLoading(true);
//         const response = await API.get("/dashboard");
//         if (response.data.success) {
//           setDashboardData(response.data.data);
//         }
//       } catch (err) {
//         console.error("Dashboard metric resolution failure:", err);
//         setError("Failed to stream analytical database summaries.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardMetrics();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
//         <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
//         <p className="text-sm font-medium text-slate-500">
//           Syncing transactional ledger calculations...
//         </p>
//       </div>
//     );
//   }

//   if (error || !dashboardData) {
//     return (
//       <div className="p-8 text-center text-sm text-red-500 font-medium">
//         {error || "An error occurred fetching system data summaries."}
//       </div>
//     );
//   }

//   const { cards, salesData, recentOrders, realTimeActivity, topProducts } =
//     dashboardData;

//   // Custom currency formatting function for Y-Axis numbers (e.g., 50000 -> ₦50k)
//   const formatYAxis = (value) => {
//     if (value >= 1000000) {
//       return `₦${(value / 1000000).toFixed(1)}M`;
//     }
//     if (value >= 1000) {
//       return `₦${(value / 1000).toFixed(0)}k`;
//     }
//     return `₦${value}`;
//   };

//   return (
//     <div className="space-y-6">
//       {/* Top Welcome Title */}
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
//         <p className="text-sm text-slate-500 mt-1">
//           Here's what's happening with your store today.
//         </p>
//       </div>

//       {/* Analytics Summary Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//         <MetricCard
//           title="Total Revenue"
//           value={`₦${(cards?.totalRevenue || 0).toLocaleString()}`}
//           icon={TrendingUp}
//           iconColor="text-emerald-600"
//           iconBg="bg-emerald-50"
//         />
//         <MetricCard
//           title="Total Orders"
//           value={cards?.totalOrders || 0}
//           icon={ShoppingBag}
//           iconColor="text-blue-600"
//           iconBg="bg-blue-50"
//         />
//         <MetricCard
//           title="Pending Orders"
//           value={cards?.pendingOrders || 0}
//           icon={Clock}
//           iconColor="text-amber-600"
//           iconBg="bg-amber-50"
//         />
//         <MetricCard
//           title="Paid Orders"
//           value={cards?.paidOrders || 0}
//           icon={CheckCircle}
//           iconColor="text-indigo-600"
//           iconBg="bg-indigo-50"
//         />
//         <MetricCard
//           title="Active Customers"
//           value={cards?.activeCustomers || 0}
//           icon={Users}
//           iconColor="text-purple-600"
//           iconBg="bg-purple-50"
//         />
//       </div>

//       {/* Main Charts & Top Products Layout Split Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Sales Chart Analytics Container */}
//         <div className="lg:col-span-2 bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
//           <div className="mb-6">
//             <h3 className="font-bold text-slate-900 text-base">Sales Overview</h3>
//             <p className="text-xs text-slate-500">
//               Revenue movement tracking across a rolling 7-day period
//             </p>
//           </div>
//           <div className="h-72 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={salesData || []} barSize={32}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
//                 <XAxis
//                   dataKey="day"
//                   axisLine={false}
//                   tickLine={false}
//                   stroke="#64748B"
//                   fontSize={12}
//                   dy={10}
//                 />
//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   stroke="#64748B"
//                   fontSize={12}
//                   dx={-10}
//                   tickFormatter={formatYAxis}
//                 />
//                 <Tooltip
//                   cursor={{ fill: "#F8FAFC" }}
//                   formatter={(value) => [`₦${value.toLocaleString()}`, "Revenue"]}
//                   contentStyle={{
//                     background: "#fff",
//                     borderRadius: "12px",
//                     border: "1px solid #E2E8F0",
//                   }}
//                 />
//                 <Bar
//                   dataKey="revenue"
//                   fill="#10B981"
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Top Performing Catalog Items List Panel */}
//         <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
//           <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
//             <div>
//               <h3 className="font-bold text-slate-900 text-base">Top Products</h3>
//               <p className="text-xs text-slate-500">Most preferred merchandise</p>
//             </div>
//             <button
//               onClick={() => navigate("/admin/products")}
//               className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
//             >
//               <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>
//           <TopProductsList products={topProducts || []} />
//         </div>
//       </div>

//       {/* Secondary Dashboard Row Block: Orders & Activity Stream Panels */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Recent Checkout Records Panel */}
//         <div className="lg:col-span-2 bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
//           <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
//             <div>
//               <h3 className="font-bold text-slate-900 text-base">Recent Orders</h3>
//               <p className="text-xs text-slate-500">
//                 Latest updates across checkout channels
//               </p>
//             </div>
//             <button
//               onClick={() => navigate("/admin/orders")}
//               className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
//             >
//               View All
//               <ArrowRight className="w-3 h-3" />
//             </button>
//           </div>
//           <RecentOrdersTable orders={recentOrders || []} />
//         </div>

//         {/* Real-Time Infrastructure Activity Notifications Feed */}
//         <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
//           <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
//             <div>
//               <h3 className="font-bold text-slate-900 text-base">Real-time Activity</h3>
//               <p className="text-xs text-slate-500">Live system execution records</p>
//             </div>
//             <button
//               onClick={() => navigate("/admin/orders")}
//               className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
//             >
//               View Logs
//               <ArrowRight className="w-3 h-3" />
//             </button>
//           </div>
//           <ActivityFeed activities={realTimeActivity || []} />
//         </div>
//       </div>
//     </div>
//   );
// }





// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   ArrowUpRight, ShoppingBag, Clock, CheckCircle2, Users, 
//   Copy, MessageSquare, Store, Shirt, Loader2,
//   ChevronRight, AlertCircle, Sparkles, Diamond
// } from "lucide-react";
// import { 
//   ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
// } from "recharts";
// import { useAuth } from "../../context/authContext"; // ✅ FIXED: Path changed to lowercase 'authContext'
// import API from "../../api/axios.js";

// export default function Dashboard() {
//   const { user } = useAuth(); // Reads live database profile parameters from context
//   const navigate = useNavigate(); // Instantiated routing hook for scalable views
  
//   const [dashboardData, setDashboardData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   const rawName = user?.name || user?.businessName || "Merchant";
//   const firstName = rawName.trim().split(" ")[0];

//   const vendorStoreSlug = user?.storeSlug || user?.vendor?.storeSlug || user?.store?.slug || (user?.businessName 
//     ? user.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
//     : "");

//   const storefrontUrl = `${window.location.origin}/shop/${vendorStoreSlug}`;

//   useEffect(() => {
//     const fetchDashboardMetrics = async () => {
//       try {
//         setIsLoading(true);
//         const response = await API.get("/dashboard/summary");
//         if (response.data.success) {
//           setDashboardData(response.data.data);
//         }
//       } catch (err) {
//         setError("Failed to fetch live operational data from the Venclux backend engine.");
//         console.error("Dashboard data fetch error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardMetrics();
//   }, []);

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(storefrontUrl);
//     alert("Storefront link copied to clipboard!");
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
//         <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
//         <p className="text-sm font-medium text-slate-500">Synchronizing live store environment configurations...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3 max-w-xl mx-auto mt-12">
//         <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
//         <div>
//           <h4 className="font-bold text-sm">System Pipeline Aborted</h4>
//           <p className="text-xs mt-1 text-red-600 leading-relaxed">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   const { cards, salesData, recentOrders, realTimeActivity, topProducts } = dashboardData || {};

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//             Welcome back, {firstName} 👋
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">Here's what's happening with your store today.</p>
//         </div>
//         <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100 h-fit">
//           <CheckCircle2 className="w-3.5 h-3.5" />
//           <span>All systems operational</span>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
//         <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">Your Storefront Link</p>
//         <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//           <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-xl overflow-hidden">
//             <div className="w-8 h-8 bg-[#C3ECD7] rounded-lg flex items-center justify-center shrink-0">
//               <Store className="w-4 h-4 text-emerald-900" />
//             </div>
//             <span className="text-sm font-medium text-slate-700 truncate select-all">
//               {storefrontUrl}
//             </span>
//             <button 
//               onClick={handleCopyLink}
//               className="ml-auto bg-[#C3ECD7] text-emerald-900 hover:bg-[#a9dbc0] px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
//             >
//               <Copy className="w-3.5 h-3.5" />
//               Copy Link
//             </button>
//           </div>
          
//           <div className="flex items-center gap-3 text-sm text-slate-500">
//             <span className="font-medium">Share to:</span>
//             <div className="flex gap-2">
//                <a 
//                  href={`https://wa.me/?text=${encodeURIComponent("Check out my shop on Venclux: " + storefrontUrl)}`}
//                  target="_blank" 
//                  rel="noreferrer"
//                  className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors"
//                >
//                  <MessageSquare className="w-4 h-4" />
//                </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 col-span-2 lg:col-span-1 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Total Revenue</span>
//             <ShoppingBag className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">₦{(cards?.totalRevenue || 0).toLocaleString()}</p>
//           <div className="text-[10px] text-slate-400 font-medium">Live processing metric</div>
//         </div>

//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Total Orders</span>
//             <ShoppingBag className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.totalOrders || 0}</p>
//           <div className="text-[10px] text-slate-400 font-medium">Total lifespan sum</div>
//         </div>

//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Pending Orders</span>
//             <Clock className="w-4 h-4 text-amber-500" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.pendingOrders || 0}</p>
//           <div className="text-[10px] text-amber-600 font-semibold">Awaiting delivery</div>
//         </div>

//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Paid Orders</span>
//             <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.paidOrders || 0}</p>
//           <div className="text-[10px] text-emerald-600 font-semibold">Settled checkouts</div>
//         </div>

//         <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
//           <div className="flex items-center justify-between text-slate-500">
//             <span className="text-xs font-medium">Active Customers</span>
//             <Users className="w-4 h-4" />
//           </div>
//           <p className="text-xl font-bold text-slate-900">{cards?.activeCustomers || 0}</p>
//           <div className="text-[10px] text-slate-400 font-medium">Unique consumer nodes</div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 lg:col-span-2 space-y-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">Sales Overview</h3>
//               <p className="text-sm text-slate-500">Revenue across the last 7 days</p>
//             </div>
//           </div>

//           <div className="h-64 w-full">
//             {salesData && salesData.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                   <defs>
//                     <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
//                       <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
//                   <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#94A3B8" className="text-xs" />
//                   <YAxis 
//                     tickLine={false} 
//                     axisLine={false} 
//                     stroke="#94A3B8" 
//                     className="text-xs" 
//                     tickFormatter={(v) => {
//                       if (v >= 1000000) return `₦${(v / 1000000).toFixed(1)}M`;
//                       if (v >= 1000) return `₦${(v / 1000).toFixed(0)}k`;
//                       return `₦${v}`;
//                     }} 
//                   />
//                   <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, "Revenue"]} />
//                   <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="h-full w-full bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 text-center p-4">
//                 No revenue telemetry logged over the current evaluation timeline.
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
//               <p className="text-sm text-slate-500">Latest transactions stream</p>
//             </div>
//             <button 
//               onClick={() => navigate("/admin/orders")}
//               className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
//             >
//               View All <ChevronRight className="w-3.5 h-3.5" />
//             </button>
//           </div>

//           <div className="divide-y divide-slate-100 pt-2 h-[260px] overflow-y-auto pr-1">
//             {recentOrders && recentOrders.length > 0 ? (
//               recentOrders.map((order, idx) => (
//                 <div key={order.id || idx} className="py-3.5 flex items-center justify-between gap-2">
//                   <div>
//                     <p className="text-[10px] text-slate-400 font-mono">{order.id}</p>
//                     <p className="font-semibold text-slate-900 text-sm truncate max-w-[120px]">{order.customer}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <p className="font-bold text-slate-900 text-sm shrink-0">{order.amount}</p>
//                     <span className={`inline-flex items-center justify-center text-[9px] font-extrabold px-2 py-0.5 rounded ${order.statusColor}`}>
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
//                 No product checkouts registered yet. Your storefront is live and ready for traffic.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">Realtime Activity</h3>
//               <p className="text-sm text-slate-500">Live feed from your storefront</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <button 
//                 onClick={() => navigate("/admin/orders")}
//                 className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
//               >
//                 View Logs
//               </button>
//               <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
//                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
//                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Live</span>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-5 h-[280px] overflow-y-auto pr-1">
//             {realTimeActivity && realTimeActivity.length > 0 ? (
//               realTimeActivity.map((activity, idx) => (
//                 <div key={activity.id || idx} className="flex items-start gap-4">
//                   <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activity.color}`}>
//                     {activity.initial}
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-slate-700 text-sm leading-snug">{activity.text}</p>
//                     <p className="text-[11px] text-slate-400 mt-0.5">{activity.time}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
//                 No ambient real-time storefront notifications captured yet.
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">Top Products</h3>
//               <p className="text-sm text-slate-500">Best sellers this month</p>
//             </div>
//             <button 
//               onClick={() => navigate("/admin/products")}
//               className="text-xs font-semibold text-slate-600 flex items-center gap-1 hover:text-slate-900 transition-colors"
//             >
//               View all <ChevronRight className="w-3.5 h-3.5" />
//             </button>
//           </div>

//           <div className="space-y-4 h-[280px] overflow-y-auto pr-1">
//             {topProducts && topProducts.length > 0 ? (
//               topProducts.map((product, idx) => {
//                  const IconComponent = product.icon || Shirt;
//                  return (
//                   <div key={product.id || idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors">
//                     <div className="flex items-center gap-4">
//                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${product.bgColor || 'bg-emerald-50'}`}>
//                          <IconComponent className={`w-5 h-5 ${product.iconColor || 'text-emerald-600'}`} />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-slate-900 truncate max-w-[160px]">{product.name}</p>
//                         <p className="text-xs text-slate-500">{product.sold}</p>
//                       </div>
//                     </div>
//                     <span className="font-bold text-slate-900 text-sm">{product.price}</span>
//                   </div>
//                  );
//               })
//             ) : (
//               <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
//                 Product sales metrics will map automatically once distribution cycles run.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingBag, Clock, CheckCircle2, Users, 
  Copy, MessageSquare, Store, Shirt, Loader2,
  ChevronRight, AlertCircle
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from "recharts";
import { useAuth } from "../../context/AuthContext"; 
import API from "../../api/axios.js";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const rawName = user?.name || user?.businessName || "Merchant";
  const firstName = rawName.trim().split(" ")[0];

  const vendorStoreSlug = user?.storeSlug || user?.vendor?.storeSlug || user?.store?.slug || (user?.businessName 
    ? user.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "");

  const storefrontUrl = `${window.location.origin}/shop/${vendorStoreSlug}`;

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        setIsLoading(true);
        const response = await API.get("/dashboard/summary");
        if (response.data.success) {
          setDashboardData(response.data.data);
        }
      } catch (err) {
        setError("Failed to fetch live operational data from the Venclux backend engine.");
        console.error("Dashboard data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardMetrics();
  }, []);

  const { cards, salesData, recentOrders, realTimeActivity, topProducts } = dashboardData || {};

  // Clean data safely at the top level
  const cleanedSalesData = React.useMemo(() => {
    if (!salesData || !Array.isArray(salesData)) return [];
    return salesData.map(item => ({
      ...item,
      revenue: item.revenue ? Number(item.revenue) : 0
    }));
  }, [salesData]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storefrontUrl);
    alert("Storefront link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Synchronizing live store environment configurations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3 max-w-xl mx-auto mt-12">
        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-sm">System Pipeline Aborted</h4>
          <p className="text-xs mt-1 text-red-600 leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100 h-fit">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>All systems operational</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">Your Storefront Link</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-xl overflow-hidden">
            <div className="w-8 h-8 bg-[#C3ECD7] rounded-lg flex items-center justify-center shrink-0">
              <Store className="w-4 h-4 text-emerald-900" />
            </div>
            <span className="text-sm font-medium text-slate-700 truncate select-all">
              {storefrontUrl}
            </span>
            <button 
              onClick={handleCopyLink}
              className="ml-auto bg-[#C3ECD7] text-emerald-900 hover:bg-[#a9dbc0] px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Link
            </button>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="font-medium">Share to:</span>
            <div className="flex gap-2">
               <a 
                 href={`https://wa.me/?text=${encodeURIComponent("Check out my shop on Venclux: " + storefrontUrl)}`}
                 target="_blank" 
                 rel="noreferrer"
                 className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors"
               >
                 <MessageSquare className="w-4 h-4" />
               </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 col-span-2 lg:col-span-1 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Total Revenue</span>
            <ShoppingBag className="w-4 h-4" />
          </div>
          <p className="text-xl font-bold text-slate-900">₦{(cards?.totalRevenue || 0).toLocaleString()}</p>
          <div className="text-[10px] text-slate-400 font-medium">Live processing metric</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Total Orders</span>
            <ShoppingBag className="w-4 h-4" />
          </div>
          <p className="text-xl font-bold text-slate-900">{cards?.totalOrders || 0}</p>
          <div className="text-[10px] text-slate-400 font-medium">Total lifespan sum</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Pending Orders</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-slate-900">{cards?.pendingOrders || 0}</p>
          <div className="text-[10px] text-amber-600 font-semibold">Awaiting delivery</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Paid Orders</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl font-bold text-slate-900">{cards?.paidOrders || 0}</p>
          <div className="text-[10px] text-emerald-600 font-semibold">Settled checkouts</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Active Customers</span>
            <Users className="w-4 h-4" />
          </div>
          <p className="text-xl font-bold text-slate-900">{cards?.activeCustomers || 0}</p>
          <div className="text-[10px] text-slate-400 font-medium">Unique consumer nodes</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 lg:col-span-2 space-y-4 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Sales Overview</h3>
            <p className="text-sm text-slate-500">Revenue across the last 7 days</p>
          </div>

          <div className="h-64 w-full">
            {cleanedSalesData && cleanedSalesData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cleanedSalesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#94A3B8" className="text-xs" />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    stroke="#94A3B8" 
                    className="text-xs" 
                    tickFormatter={(v) => {
                      const num = Number(v);
                      if (num >= 1000000) return `₦${(num / 1000000).toFixed(1)}M`;
                      if (num >= 1000) return `₦${(num / 1000).toFixed(0)}k`;
                      return `₦${num}`;
                    }} 
                  />
                  <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 text-center p-4">
                No revenue data logged over the current timeline.
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
              <p className="text-sm text-slate-500">Latest transactions stream</p>
            </div>
            <button 
              onClick={() => navigate("/admin/orders")}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 pt-2 h-[260px] overflow-y-auto pr-1">
            {recentOrders && recentOrders.length > 0 ? (
              recentOrders.map((order, idx) => (
                <div key={order.id || idx} className="py-3.5 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-slate-400 font-mono">{order.id}</p>
                    <p className="font-semibold text-slate-900 text-sm truncate max-w-[120px]">{order.customer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900 text-sm shrink-0">{order.amount}</p>
                    <span className={`inline-flex items-center justify-center text-[9px] font-extrabold px-2 py-0.5 rounded ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
                No product checkouts registered yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Realtime Activity and Top Products Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Realtime Activity Logs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Realtime Activity</h3>
              <p className="text-sm text-slate-500">Live feed from your storefront</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/admin/orders")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                View Logs
              </button>
              <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-bold text-emerald-700 uppercase">Live</span>
              </div>
            </div>
          </div>

          <div className="space-y-5 h-[280px] overflow-y-auto pr-1">
            {realTimeActivity && realTimeActivity.length > 0 ? (
              realTimeActivity.map((activity, idx) => (
                <div key={activity.id || idx} className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activity.color}`}>
                    {activity.initial}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-700 text-sm leading-snug">{activity.text}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
                No ambient real-time storefront notifications captured yet.
              </div>
            )}
          </div>
        </div>

        {/* Top Products Log */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Top Products</h3>
              <p className="text-sm text-slate-500">Best sellers this month</p>
            </div>
            <button 
              onClick={() => navigate("/admin/products")}
              className="text-xs font-semibold text-slate-600 flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4 h-[280px] overflow-y-auto pr-1">
            {topProducts && topProducts.length > 0 ? (
              topProducts.map((product, idx) => {
                 const IconComponent = product.icon || Shirt;
                 return (
                  <div key={product.id || idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${product.bgColor || 'bg-emerald-50'}`}>
                         <IconComponent className={`w-5 h-5 ${product.iconColor || 'text-emerald-600'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 truncate max-w-[160px]">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.sold}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 text-sm">{product.price}</span>
                  </div>
                 );
              })
            ) : (
              <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 p-4">
                Product sales metrics will map automatically.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}