// import React, { useState } from "react";
// import { Search, Filter, Download, MoreHorizontal } from "lucide-react";
// import Table from "../../components/shared/Table";
// import StatusBadge from "../../components/shared/StatusBadge";
// import Pagination from "../../components/shared/Pagination";

// const mockOrders = [
//   { id: "#VCX-0061", customer: "Chisom N.", phone: "+234 803 123 4567", amount: "₦32,500", status: "Pending", shipping: "Out 3/5", date: "2 mins ago" },
//   { id: "#VCX-0060", customer: "Tunde A.", phone: "+234 706 987 6543", amount: "₦18,000", status: "Paid", shipping: "Pending", date: "12 mins ago" },
//   { id: "#VCX-0059", customer: "Bisi K.", phone: "+234 812 345 6789", amount: "₦14,250", status: "Paid", shipping: "Out 2/5", date: "34 mins ago" },
//   { id: "#VCX-0058", customer: "Amaka J.", phone: "+234 905 111 2233", amount: "₦65,000", status: "Delivered", shipping: "Delivered", date: "1 hour ago" },
//   { id: "#VCX-0057", customer: "David E.", phone: "+234 802 444 5566", amount: "₦12,500", status: "Processing", shipping: "Pending", date: "2 hours ago" },
//   { id: "#VCX-0056", customer: "Sarah M.", phone: "+234 701 999 8877", amount: "₦24,000", status: "Canceled", shipping: "-", date: "3 hours ago" },
//   { id: "#VCX-0055", customer: "Emeka O.", phone: "+234 814 777 6655", amount: "₦42,000", status: "Pending", shipping: "Out 1/5", date: "5 hours ago" },
// ];

// const filters = ["All Orders 84", "Pending 12", "Paid 24", "Processing 10", "Dispatched 15", "Delivered 18", "Canceled 5"];

// export default function Orders() {
//   const [activeFilter, setActiveFilter] = useState("All Orders 84");
//   const [currentPage, setCurrentPage] = useState(1);

//   const columns = [
//     { header: "ORDER ID", accessor: "id", className: "w-24", cellClassName: "font-medium" },
//     { header: "CUSTOMER", accessor: "customer" },
//     { header: "WHATSAPP", accessor: "phone", cellClassName: "text-slate-500 font-mono text-xs" },
//     { header: "AMOUNT", accessor: "amount", cellClassName: "font-semibold" },
//     { header: "PAYMENT", accessor: "status", render: (row) => <StatusBadge status={row.status} /> },
//     { header: "DELIVERY", accessor: "shipping", cellClassName: "text-emerald-600 text-xs font-semibold" },
//     { header: "DATE", accessor: "date", cellClassName: "text-slate-500 text-xs" },
//     { header: "ACTIONS", accessor: "action", render: () => (
//       <button className="flex items-center gap-1 p-1 text-slate-500 hover:text-slate-900 rounded text-xs font-medium">
//         Update <MoreHorizontal className="w-3 h-3" />
//       </button>
//     )}
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
//           <p className="text-sm text-slate-500 mt-1">All storefront and WhatsApp orders in one place</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="relative">
//             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
//             <input
//               type="text"
//               placeholder="Search orders..."
//               className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent w-full sm:w-64"
//             />
//           </div>
//           <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-2 text-sm font-medium">
//             Oct 1 - Oct 31
//           </button>
//         </div>
//       </div>

//       {/* Filters List */}
//       <div className="flex items-center gap-1 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
//         {filters.map((filter) => {
//           const isActive = activeFilter === filter;
//           return (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 isActive
//                   ? "bg-[#C3ECD7] text-emerald-900"
//                   : "text-slate-600 hover:bg-slate-100"
//               }`}
//             >
//               {filter}
//             </button>
//           );
//         })}
//       </div>

//       {/* Main Table Card */}
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
//         <Table columns={columns} data={mockOrders} />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={5}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Table from "../../components/shared/Table";
import StatusBadge from "../../components/shared/StatusBadge";
import Pagination from "../../components/shared/Pagination";
import { orderApi } from "../../api/orderApi";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const ordersPerPage = 10;

  // 1. Fetch data on initialization mount
  const fetchLiveOrders = async () => {
    try {
      setIsLoading(true);
      const data = await orderApi.getAllOrders();
      if (data.success) {
        setOrders(data.orders || []);
        setError("");
      }
    } catch (err) {
      console.error("Order engine fetch crash:", err);
      setError(
        "Failed to stream live transaction ledgers from the Venclux cloud pipeline.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveOrders();
  }, []);

  // 2. Action handler to update status fields inline
  const handleStatusChange = async (trackingId, currentStatus) => {
    const nextStatusMap = {
      PENDING: "PROCESSING",
      PROCESSING: "SHIPPED",
      SHIPPED: "DELIVERED",
      DELIVERED: "PENDING",
    };

    const targetStatus =
      nextStatusMap[currentStatus.toUpperCase()] || "PENDING";

    try {
      const response = await orderApi.updateStatus(trackingId, targetStatus);
      if (response.success) {
        // Optimistically update local array state
        setOrders((prev) =>
          prev.map((o) =>
            o.trackingId === trackingId ? { ...o, status: targetStatus } : o,
          ),
        );
        alert(`Order #${trackingId} advanced safely to ${targetStatus}!`);
      }
    } catch (err) {
      console.error("Failed to cycle order pipeline step:", err);
      alert("Pipeline modification dropped. Verify cloud endpoint status.");
    }
  };

  // Process calculations for query criteria inputs
  useEffect(() => {
    let result = [...orders];

    // Text Search Filter (Tracking ID, Customer Name, or WhatsApp Number)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.trackingId?.toLowerCase().includes(query) ||
          o.customerName?.toLowerCase().includes(query) ||
          o.customerWhatsapp?.includes(query),
      );
    }

    // Status Pill Filter Selection
    if (activeFilter !== "ALL") {
      if (activeFilter === "PAID") {
        // Look inside the payment status field
        result = result.filter(
          (o) => o.paymentStatus?.toUpperCase() === "PAID",
        );
      } else {
        // Look inside the order shipping status field
        result = result.filter((o) => o.status?.toUpperCase() === activeFilter);
      }
    }

    setFilteredOrders(result);
    setCurrentPage(1);
  }, [orders, activeFilter, searchQuery]);

  // Calculate dynamic category count totals for display pills
  const getFilterCount = (statusKey) => {
    if (statusKey === "ALL") return orders.length;

    // If we are evaluating the payment checkouts tab, parse paymentStatus
    if (statusKey === "PAID") {
      return orders.filter((o) => o.paymentStatus?.toUpperCase() === "PAID")
        .length;
    }

    // Otherwise, filter against fulfillment tracking states
    return orders.filter((o) => o.status?.toUpperCase() === statusKey).length;
  };

  const filterTabs = [
    { label: `All Orders ${getFilterCount("ALL")}`, value: "ALL" },
    { label: `Pending ${getFilterCount("PENDING")}`, value: "PENDING" },
    { label: `Paid ${getFilterCount("PAID")}`, value: "PAID" },
    {
      label: `Processing ${getFilterCount("PROCESSING")}`,
      value: "PROCESSING",
    },
    { label: `Shipped ${getFilterCount("SHIPPED")}`, value: "SHIPPED" },
    { label: `Delivered ${getFilterCount("DELIVERED")}`, value: "DELIVERED" },
    { label: `Canceled ${getFilterCount("CANCELLED")}`, value: "CANCELLED" },
  ];

  // 5. Paginate final computed dataset slices
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentTableData = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage) || 1;

  // 6. Define layout mappings matched with database attributes
  const columns = [
    {
      header: "ORDER ID",
      accessor: "trackingId",
      className: "w-24",
      render: (row) => (
        <span className="font-mono font-bold text-slate-700">
          #{row.trackingId}
        </span>
      ),
    },
    { header: "CUSTOMER", accessor: "customerName" },
    {
      header: "WHATSAPP",
      accessor: "customerWhatsapp",
      cellClassName: "text-slate-500 font-mono text-xs",
    },
    {
      header: "AMOUNT",
      accessor: "totalAmount",
      render: (row) => (
        <span className="font-semibold text-slate-900">
          ₦{(row.totalAmount || 0).toLocaleString()}
        </span>
      ),
    },
    {
      header: "PAYMENT",
      accessor: "paymentStatus",
      render: (row) => <StatusBadge status={row.paymentStatus || "PENDING"} />,
    },
    {
      header: "DELIVERY",
      accessor: "status",
      render: (row) => (
        <span
          className={`text-xs font-semibold uppercase ${row.status === "DELIVERED" ? "text-emerald-600" : "text-amber-600"}`}
        >
          {row.status || "PENDING"}
        </span>
      ),
    },
    {
      header: "DATE",
      accessor: "createdAt",
      render: (row) => {
        if (!row.createdAt) return "-";
        return new Date(row.createdAt).toLocaleDateString("en-NG", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      header: "ACTIONS",
      accessor: "action",
      render: (row) => (
        <button
          onClick={() => handleStatusChange(row.trackingId, row.status)}
          className="flex items-center gap-1 p-1 text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-xs font-semibold transition-colors"
        >
          Cycle Status <MoreHorizontal className="w-3 h-3" />
        </button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        <p className="text-sm font-medium text-slate-500">
          Mapping live operational transaction vectors...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3 max-w-xl mx-auto mt-12">
        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-sm">Synchronizer Disrupted</h4>
          <p className="text-xs mt-1 text-red-600 leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="text-sm text-slate-500 mt-1">
            All storefront and WhatsApp orders in one place
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, name, phone..."
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Filters List */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-[#C3ECD7] text-emerald-900"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Table Card Component */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <Table columns={columns} data={currentTableData} />
        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-sm text-slate-400">
            No matching orders found inside this classification matrix.
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
