import React, { useState, useEffect } from "react";
import { CreditCard, ShieldCheck, Zap, ArrowUpRight, Loader2 } from "lucide-react";
import API from "../../api/axios";
import { SectionCard } from "./Shared";

export default function Billing() {
  const [billingData, setBillingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/vendor/settings/billing")
      .then((res) => {
        if (res.data && res.data.data) {
          setBillingData(res.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error retrieving dashboard billing metrics:", err);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  const { subscription, usage } = billingData || {
    subscription: { plan: "Free", status: "Active", renewsAt: new Date() },
    usage: { productsCount: 0, productsLimit: 7, revenueTracked: 0 }
  };

  const isPro = subscription.plan === "Pro";
  
  // Dynamic scaling math calculated cleanly against a maximum of 7 items
  const percentageOfLimit = isPro ? 100 : Math.min((usage.productsCount / usage.productsLimit) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Active Subscription Overview Card */}
      <SectionCard icon={CreditCard} title="Current Plan" description="Manage your billing cycle and tier level access features.">
        <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-slate-900">{subscription.plan} Tier</span>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {subscription.status}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {isPro 
                ? `Your subscription automatically renews on ${new Date(subscription.renewsAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`
                : "You are exploring Venclux via our standard base access plan limits."}
            </p>
          </div>

          {!isPro && (
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors group">
              Upgrade to Pro <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </SectionCard>

      {/* Real-time Usage Meter Metrics Card */}
      <SectionCard icon={Zap} title="Usage & Limits" description="Live tracking of your storefront capacity utilization rules.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Inventory Count Track */}
          <div className="p-4 border border-slate-100 rounded-xl space-y-3 bg-white">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-500">Active Storefront Inventory</span>
              <span className="text-sm font-bold text-slate-800">
                {usage.productsCount} / {isPro ? "∞" : usage.productsLimit} products
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${percentageOfLimit > 85 ? "bg-amber-500" : "bg-[#0F172A]"}`}
                style={{ width: `${percentageOfLimit}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              {isPro ? "Unlimited product listings active." : `${Math.max(0, usage.productsLimit - usage.productsCount)} catalog slot listings remaining before cap restrictions.`}
            </p>
          </div>

          {/* Sales Volume Aggregation Track */}
          <div className="p-4 border border-slate-100 rounded-xl flex flex-col justify-between bg-white space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-500">Total Tracked Sales Volume</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900">
                {formatCurrency(usage.revenueTracked)}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Processed successfully via automated checkout configurations.</p>
            </div>
          </div>

        </div>
      </SectionCard>
    </div>
  );
}