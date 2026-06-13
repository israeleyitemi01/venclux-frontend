import React, { useEffect, useState } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { CheckCircle2, MessageSquare, Copy, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import axios from "axios"; 

export default function SuccessConfirmation() {
  const { storeSlug } = useParams();
  const [searchParams] = useSearchParams();
  
  // 1. Core State for holding dynamically fetched MongoDB vendor data
  const [vendorData, setVendorData] = useState({
    businessName: storeSlug ? storeSlug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "The Merchant",
    whatsappNumber: "", 
    isLoading: true
  });
  
  // FIXED: Parameter name aligned to trackingId to read from Checkout query parameters perfectly
  const trackingId = searchParams.get("trackingId") || "VX-TRACK-UNKNOWN";

  // 2. Fetch the Vendor's stored WhatsApp information from MongoDB storefront profile on mount
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchVendorDetails = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5010/api";
        const response = await axios.get(`${API_BASE_URL}/storefront/${storeSlug}`);
        
        if (response.data.success) {
          setVendorData({
            businessName: response.data.businessName,      
            whatsappNumber: response.data.whatsappNumber,  
            isLoading: false
          });
        } else {
          setVendorData(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error("Error fetching vendor data from MongoDB storefront index:", error);
        setVendorData(prev => ({ ...prev, isLoading: false }));
      }
    };

    if (storeSlug) {
      fetchVendorDetails();
    }
  }, [storeSlug]);

  // 3. Dynamic Link Generation: Addressing the Vendor directly, NOT Venclux Engine
  const targetWhatsappNumber = vendorData.whatsappNumber ? vendorData.whatsappNumber.replace(/\+/g, "") : "";
  
  const whatsappMessage = encodeURIComponent(
    `Hello ${vendorData.businessName}, I just completed a payment on your store.\n\nPlease verify my Order Tracking ID: #VX-${trackingId}`
  );
  
  const whatsappLink = `https://wa.me/${targetWhatsappNumber}?text=${whatsappMessage}`;

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    alert("Tracking ID copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Structural Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C3ECD7] flex items-center justify-center font-bold text-slate-900 text-sm">V</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Venclux</span>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Secured Payment
          </span>
        </div>
      </header>

      {/* Main Content Card Container */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-12 flex flex-col justify-center">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-center space-y-6">
          
          {/* Success Badge */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

          {/* Heading Text dynamically referencing the specific Vendor */}
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payment Confirmed!</h1>
            <p className="text-sm text-slate-500">
              Your transaction was successfully validated. Your funds have been securely processed for <span className="font-semibold text-slate-800">{vendorData.businessName}</span>.
            </p>
          </div>

          {/* Unique Tracking ID */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
              Vendor Order Tracking ID
            </span>
            <div className="flex items-center justify-center gap-3">
              <code className="text-xl font-mono font-bold text-slate-800 tracking-md bg-white border border-slate-100 px-3 py-1 rounded-lg shadow-inner">
                #VX-{trackingId}
              </code>
              <button 
                onClick={copyTrackingId}
                className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-all"
                title="Copy Tracking ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Clarified Direct-to-Vendor WhatsApp Interaction */}
          <div className="space-y-4 text-left bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-600 rounded-xl text-white mt-0.5 shadow-sm">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Chat Directly With {vendorData.businessName}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Click below to instantly open WhatsApp and send your secure tracking token directly to the vendor's business chat line to complete your delivery arrangements.
                </p>
              </div>
            </div>

            {/* If backend data hasn't loaded yet, disable button safely */}
            {vendorData.isLoading ? (
              <div className="w-full bg-slate-200 text-slate-400 py-3 text-center rounded-xl text-sm font-bold animate-pulse">
                Loading Vendor Chat Gateway...
              </div>
            ) : (
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                <span>Send Tracking ID to Vendor</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Return to specific vendor shop */}
          <div className="pt-2">
            <Link 
              to={`/shop/${storeSlug}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors group"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Return to {vendorData.businessName} Catalog
            </Link>
          </div>

        </div>
      </main>

      {/* Trust Footer */}
      <footer className="py-6 border-t border-slate-200 bg-white">
        <p className="text-center text-[11px] font-medium text-slate-400 tracking-tight">
          Powered by Venclux Architecture • Multi-tenant Secure Checkout Engine
        </p>
      </footer>
    </div>
  );
}