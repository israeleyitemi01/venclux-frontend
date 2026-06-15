// import React, { useState } from "react";
// import { Search, Filter, Download, MoreHorizontal } from "lucide-react";
// import Table from "../../components/shared/Table";
// import StatusBadge from "../../components/shared/StatusBadge";
// import Pagination from "../../components/shared/Pagination";

// const mockCustomers = [
//   { id: 1, name: "Chisom N.", email: "chisom.n@gmail.com", initial: "CN", phone: "+234 803 123 4567", orders: 7, spent: "₦325,000", lastOrder: "2 days ago", status: "Active" },
//   { id: 2, name: "Tunde Adebayo", email: "tunde.ade@yahoo.com", initial: "TA", phone: "+234 706 987 6543", orders: 3, spent: "₦85,500", lastOrder: "5 days ago", status: "Active" },
//   { id: 3, name: "Ngozi Okafor", email: "ngozi99@gmail.com", initial: "NO", phone: "+234 812 345 6789", orders: 1, spent: "₦25,000", lastOrder: "12 days ago", status: "Active" },
//   { id: 4, name: "Bisi Komolafe", email: "bisi.k@outlook.com", initial: "BK", phone: "+234 905 111 2233", orders: 5, spent: "₦142,500", lastOrder: "1 month ago", status: "Inactive" },
//   { id: 5, name: "Fatima Aliyu", email: "fati.aliyu@gmail.com", initial: "FA", phone: "+234 802 444 5566", orders: 2, spent: "₦48,000", lastOrder: "2 days ago", status: "Active" },
//   { id: 6, name: "Louis Adeyemi", email: "louis.ade@gmail.com", initial: "LA", phone: "+234 701 999 8877", orders: 8, spent: "₦412,000", lastOrder: "24 hours ago", status: "Active" },
//   { id: 7, name: "Kamsiyochukwu E.", email: "kamsi.e@yahoo.com", initial: "KE", phone: "+234 814 777 6655", orders: 1, spent: "₦18,500", lastOrder: "45 days ago", status: "Inactive" },
// ];

// export default function Customers() {
//   const [currentPage, setCurrentPage] = useState(1);

//   const columns = [
//     { 
//       header: "CUSTOMER", 
//       accessor: "customer",
//       render: (row) => (
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">
//             {row.initial}
//           </div>
//           <div>
//             <p className="font-semibold text-slate-900">{row.name}</p>
//             <p className="text-xs text-slate-500">{row.email}</p>
//           </div>
//         </div>
//       )
//     },
//     { header: "WHATSAPP", accessor: "phone", cellClassName: "text-slate-500 font-mono text-xs" },
//     { header: "ORDERS", accessor: "orders", cellClassName: "font-medium" },
//     { header: "SPENT", accessor: "spent", cellClassName: "font-semibold text-slate-900" },
//     { header: "LAST ORDER", accessor: "lastOrder", cellClassName: "text-slate-500 text-xs" },
//     { header: "STATUS", accessor: "status", render: (row) => <StatusBadge status={row.status} /> },
//     { header: "", accessor: "action", render: () => (
//       <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
//         <MoreHorizontal className="w-5 h-5" />
//       </button>
//     )}
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
//           <p className="text-sm text-slate-500 mt-1">37 active customers across your store.</p>
//         </div>
        
//         <div className="flex items-center gap-2">
//            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-sm transition-colors">
//             <Download className="w-4 h-4" />
//             <span className="hidden sm:inline">Export</span>
//           </button>
//         </div>
//       </div>

//       {/* Toolbar */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
//         {/* Filters */}
//         <div className="flex items-center gap-6 text-sm overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
//           <button className="flex items-center gap-2 bg-[#0F172A] text-white px-4 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap">
//             All <span className="bg-slate-700/80 px-1.5 py-0.5 rounded-md text-[10px] font-bold">37</span>
//           </button>
//           <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors whitespace-nowrap">
//             Active <span className="text-slate-400 text-xs">28</span>
//           </button>
//           <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors whitespace-nowrap">
//             New <span className="text-slate-400 text-xs">8</span>
//           </button>
//           <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors whitespace-nowrap">
//             Returning <span className="text-slate-400 text-xs">14</span>
//           </button>
//           <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors whitespace-nowrap">
//             At Risk <span className="text-slate-400 text-xs">5</span>
//           </button>
//         </div>
        
//         {/* Search & Actions */}
//         <div className="flex items-center gap-2 w-full sm:w-auto">
//           <div className="relative w-full sm:w-64">
//             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
//             <input 
//               type="text" 
//               placeholder="Search customers..." 
//               className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent bg-white shadow-sm"
//             />
//           </div>
//           <button className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl bg-white shadow-sm transition-colors shrink-0">
//             <Filter className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* Main Table Card */}
//       <div className="bg-white border border-slate-200 rounded-b-2xl overflow-hidden shadow-sm">
//         <Table columns={columns} data={mockCustomers} />
//         <Pagination 
//           currentPage={currentPage} 
//           totalPages={3} 
//           onPageChange={setCurrentPage} 
//         />
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { Search, Filter, Download, MoreHorizontal, Loader2, Trash2 } from "lucide-react";
import Table from "../../components/shared/Table";
import StatusBadge from "../../components/shared/StatusBadge";
import Pagination from "../../components/shared/Pagination";
import API from "../../api/axios.js";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [counts, setCounts] = useState({ ALL: 0, ACTIVE: 0, NEW: 0, RETURNING: 0, AT_RISK: 0 });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 1. Fetch consumers data array from the database
  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        setIsLoading(true);
        const response = await API.get("/customers");
        if (response.data.success) {
          setCustomers(response.data.data.customers || []);
          setCounts(response.data.data.counts || { ALL: 0, ACTIVE: 0, NEW: 0, RETURNING: 0, AT_RISK: 0 });
        }
      } catch (err) {
        console.error("Customer processing pipeline error:", err);
        setError("Failed to sync client profile metrics with live datastore cluster.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomersData();
  }, []);

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer? This action cannot be undone.")) return;
    try {
      const response = await API.delete(`/customers/${id}`);
      if (response.data.success) {
        setCustomers((prev) => prev.filter(c => c.id !== id));
        alert("Customer deleted successfully.");
      }
    } catch (err) {
      console.error("Failed to delete customer:", err);
      alert("Failed to delete customer.");
    }
  };

  // 2. Client Side Search filtering loop execution 
  useEffect(() => {
    let result = [...customers];

    // Filter by category pill selection state
    if (activeFilter !== "ALL") {
      const matchKey = activeFilter === "AT_RISK" ? "At Risk" : 
                       activeFilter.charAt(0) + activeFilter.slice(1).toLowerCase();
      result = result.filter(c => c.status === matchKey);
    }

    // Filter by text search string (Name or Whatsapp phone numbers)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name?.toLowerCase().includes(query) || 
        c.phone?.includes(query)
      );
    }

    setFilteredCustomers(result);
    setCurrentPage(1); // Snap back to page one upon searching
  }, [customers, activeFilter, searchQuery]);

  // Pagination parameters logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTableData = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    { 
      header: "CUSTOMER", 
      accessor: "customer",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">
            {row.initial}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{row.name}</p>
            <p className="text-xs text-slate-400 font-medium">{row.email}</p>
          </div>
        </div>
      )
    },
    { header: "WHATSAPP", accessor: "phone", cellClassName: "text-slate-500 font-mono text-xs" },
    { header: "ORDERS", accessor: "orders", cellClassName: "font-medium text-center" },
    { header: "SPENT", accessor: "spent", cellClassName: "font-semibold text-slate-900" },
    { header: "LAST ORDER", accessor: "lastOrder", cellClassName: "text-slate-500 text-xs" },
    { header: "STATUS", accessor: "status", render: (row) => <StatusBadge status={row.status} /> },
    { header: "", accessor: "action", render: (row) => (
      <button 
        onClick={() => handleDeleteCustomer(row.id)}
        className="p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded transition-colors"
        title="Delete Customer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    )}
  ];

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Retrieving secure merchant client directories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-sm text-slate-500 mt-1">{counts.ACTIVE} active customers across your store.</p>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-sm transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        {/* Dynamic Category Count Filter Tabs */}
        <div className="flex items-center gap-6 text-sm overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {[
            { key: "ALL", label: "All", count: counts.ALL },
            { key: "ACTIVE", label: "Active", count: counts.ACTIVE },
            { key: "NEW", label: "New", count: counts.NEW },
            { key: "RETURNING", label: "Returning", count: counts.RETURNING },
            { key: "AT_RISK", label: "At Risk", count: counts.AT_RISK }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`flex items-center gap-2 font-medium transition-all whitespace-nowrap px-3 py-1.5 rounded-full ${
                activeFilter === tab.key 
                  ? "bg-[#0F172A] text-white" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                activeFilter === tab.key ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-600"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        
        {/* Search Input Box */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or number..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent bg-white shadow-sm"
            />
          </div>
          <button className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl bg-white shadow-sm transition-colors shrink-0">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Table Interface Element */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {error ? (
          <div className="p-8 text-center text-sm text-red-500 font-medium">{error}</div>
        ) : filteredCustomers.length > 0 ? (
          <>
            <Table columns={columns} data={currentTableData} />
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            )}
          </>
        ) : (
          <div className="p-12 text-center text-sm text-slate-400">
            No customers match the active filters or search queries.
          </div>
        )}
      </div>
    </div>
  );
}