import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Package, ShoppingBag, Users, Loader2, ArrowRight } from "lucide-react";
import API from "../../api/axios.js";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();

  const [results, setResults] = useState({ products: [], orders: [], customers: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await API.get(`/vendor/search?q=${encodeURIComponent(query)}`);
        if (response.data.success) {
          setResults(response.data.data);
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const val = e.target.search.value;
    if (val) {
      setSearchParams({ q: val });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Search Results</h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing matches for <span className="font-semibold text-slate-800">"{query}"</span>
          </p>
        </div>
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            name="search"
            defaultValue={query}
            placeholder="Search again..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
          />
        </form>
      </div>

      {isLoading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-sm font-medium text-slate-500">Searching global store registry...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Products */}
          {results.products.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <Package className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-slate-900">Products ({results.products.length})</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.products.map((product) => (
                  <div key={product._id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">₦{product.price.toLocaleString()} • Stock: {product.stock}</p>
                    </div>
                    <button onClick={() => navigate("/admin/products")} className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders */}
          {results.orders.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">Orders ({results.orders.length})</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.orders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
                    <div>
                      <p className="font-semibold text-sm text-slate-900">#{order.trackingId}</p>
                      <p className="text-xs text-slate-500">{order.customerName} • ₦{order.totalAmount.toLocaleString()}</p>
                    </div>
                    <button onClick={() => navigate("/admin/orders")} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customers */}
          {results.customers.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <Users className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-slate-900">Customers ({results.customers.length})</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.customers.map((customer) => (
                  <div key={customer._id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{customer.name}</p>
                      <p className="text-xs text-slate-500">{customer.phoneNumber}</p>
                    </div>
                    <button onClick={() => navigate("/admin/customers")} className="text-purple-600 hover:bg-purple-50 p-2 rounded-lg">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.products.length === 0 && results.orders.length === 0 && results.customers.length === 0 && query && (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium text-sm">No results found for "{query}".</p>
              <p className="text-slate-400 text-xs mt-1">Try checking for typos or using broader terms.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
