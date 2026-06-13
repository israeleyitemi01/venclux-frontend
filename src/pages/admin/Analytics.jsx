import React, { useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Calendar, Download } from "lucide-react";

/* ─── Static mock data ─── */
const revenueData = [
  { date: "May 1", value: 180000 }, { date: "May 5", value: 320000 },
  { date: "May 10", value: 260000 }, { date: "May 15", value: 490000 },
  { date: "May 20", value: 380000 }, { date: "May 25", value: 540000 },
  { date: "May 30", value: 620000 },
];

const categoryData = [
  { name: "Clothing", value: 45, color: "#10B981" },
  { name: "Jewelry", value: 28, color: "#F59E0B" },
  { name: "Bags", value: 18, color: "#0F172A" },
  { name: "Other", value: 9, color: "#CBD5E1" },
];

const ordersPerDay = [
  { day: "Mon", orders: 14 }, { day: "Tue", orders: 22 }, { day: "Wed", orders: 18 },
  { day: "Thu", orders: 31 }, { day: "Fri", orders: 26 }, { day: "Sat", orders: 40 },
  { day: "Sun", orders: 35 },
];

const topProducts = [
  { name: "Ankara Silk Gown", revenue: 420000, bar: 95 },
  { name: "Leather Tote Bag", revenue: 285000, bar: 65 },
  { name: "Beaded Statement Necklace", revenue: 168000, bar: 40 },
  { name: "Gold Hoop Earrings", revenue: 132000, bar: 30 },
  { name: "Beaded Summer Hat", revenue: 97000, bar: 22 },
];

/* Cohort rows — months × weeks retention % */
const cohortMonths = ["Jan 24th", "Feb 14th", "Mar 13th", "Apr 13th", "May 13th", "Jun 14th", "Jan 14th"];
const cohortData = [
  [100, 85, 72, 61, 50, 42, 38],
  [100, 80, 68, 55, 44, 37],
  [100, 78, 63, 52, 40],
  [100, 82, 69, 57],
  [100, 76, 64],
  [100, 79],
  [100],
];

/* ─── Reusable Metric Card ─── */
function MetricCard({ label, value, sub, trend, color = "emerald" }) {
  const isUp = trend >= 0;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
      <div className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md mb-2 bg-${color}-50 text-${color}-700`}>
        {label}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <div className="flex items-center gap-1 text-xs">
        {isUp ? <ArrowUpRight className="w-3 h-3 text-emerald-600" /> : <ArrowDownRight className="w-3 h-3 text-rose-500" />}
        <span className={isUp ? "text-emerald-600" : "text-rose-500"}>{Math.abs(trend)}%</span>
        <span className="text-slate-400">{sub}</span>
      </div>
    </div>
  );
}

/* ─── Cohort cell colour helper ─── */
function cohortBg(pct) {
  if (pct >= 90) return "bg-emerald-600 text-white";
  if (pct >= 70) return "bg-emerald-400 text-white";
  if (pct >= 50) return "bg-emerald-200 text-emerald-900";
  if (pct >= 30) return "bg-emerald-100 text-emerald-800";
  return "bg-slate-100 text-slate-500";
}

/* ─────────────────────────────────────────────
   Analytics 
───────────────────────────────────────────── */
export default function Analytics() {
  const [range, setRange] = useState("Last 7 Days");
  const ranges = ["Last 7 Days", "Last 30 Days", "Last 90 Days"];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Track your store's performance and growth</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Date range pill */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="text-sm font-medium text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              {ranges.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          {/* Export */}
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Revenue" value="₦1.24M" sub="vs last week" trend={12.4} color="emerald" />
        <MetricCard label="Orders" value="84" sub="vs last week" trend={8} color="blue" />
        <MetricCard label="Customers" value="23" sub="new this period" trend={3.4} color="amber" />
        <MetricCard label="Avg Order" value="3.4%" sub="conversion rate" trend={-1.2} color="rose" />
      </div>

      {/* Revenue Over Time + Sales by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Revenue Over Time</h3>
            <p className="text-xs text-slate-500">Daily revenue for the selected period</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} stroke="#94A3B8" tick={{ fontSize: 11 }} tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`₦${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fill="url(#aGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart — Sales by Category */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Sales by Category</h3>
            <p className="text-xs text-slate-500">Revenue breakdown</p>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                  {categoryData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-slate-600">{c.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders by Day + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Orders by Day of Week</h3>
            <p className="text-xs text-slate-500">Understand your busiest days</p>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersPerDay} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="#C3ECD7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top performing products */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Top Performing Products</h3>
            <p className="text-xs text-slate-500">By total revenue this period</p>
          </div>
          <div className="space-y-4">
            {topProducts.map((p) => (
              <div key={p.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700 font-medium truncate">{p.name}</span>
                  <span className="font-bold text-slate-900 shrink-0 ml-2">₦{(p.revenue / 1000).toFixed(0)}k</span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C3ECD7] rounded-full" style={{ width: `${p.bar}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Retention Cohort */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Customer Retention Cohort</h3>
          <p className="text-xs text-slate-500">% of customers who returned each week after first purchase</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 pr-4 font-semibold text-slate-500 whitespace-nowrap">Cohort</th>
                {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"].map((w) => (
                  <th key={w} className="py-2 px-2 font-semibold text-slate-500 whitespace-nowrap">{w}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortMonths.map((month, ri) => (
                <tr key={month}>
                  <td className="py-1.5 pr-4 font-medium text-slate-600 whitespace-nowrap">{month}</td>
                  {cohortData[ri].map((pct, ci) => (
                    <td key={ci} className="py-1 px-1">
                      <div className={`rounded-md px-2 py-1.5 text-center font-semibold ${cohortBg(pct)}`}>
                        {pct}%
                      </div>
                    </td>
                  ))}
                  {/* Fill empty cells */}
                  {Array.from({ length: 7 - cohortData[ri].length }).map((_, ei) => (
                    <td key={`e-${ei}`} className="py-1 px-1" />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
