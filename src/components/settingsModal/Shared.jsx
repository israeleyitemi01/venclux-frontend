import React, { useState } from "react";
import { Eye, EyeOff, ToggleLeft, ToggleRight } from "lucide-react";

/* ───────────────────────
   SectionCard — consistent card wrapper
────────────────────────── */
export function SectionCard({ icon: Icon, title, description, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-slate-600" />
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">{title}</p>
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FormField — reusable labeled input
───────────────────────────────────────────── */
export function FormField({ label, name, value, onChange, placeholder, prefix, type = "text", hint }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#C3ECD7]">
        {prefix && (
          <span className="px-3 py-2.5 bg-slate-50 text-slate-500 text-xs border-r border-slate-200 whitespace-nowrap">
            {prefix}
          </span>
        )}
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 px-3 py-2.5 text-sm bg-white focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="px-3 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {hint && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ToggleRow — a labeled toggle switch row
───────────────────────────────────────────── */
export function ToggleRow({ label, description, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <button onClick={onToggle} className="shrink-0" title={enabled ? "Disable" : "Enable"}>
        {enabled
          ? <ToggleRight className="w-8 h-8 text-emerald-500" />
          : <ToggleLeft className="w-8 h-8 text-slate-300" />}
      </button>
    </div>
  );
}
