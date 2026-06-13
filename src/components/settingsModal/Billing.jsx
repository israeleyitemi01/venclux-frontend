import React from "react";
import { CreditCard, ChevronRight } from "lucide-react";
import { SectionCard } from "./Shared";

export default function Billing() {
  return (
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
  );
}
