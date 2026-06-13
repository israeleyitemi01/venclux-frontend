import React, { useState } from "react";
import { Lock, Shield, Smartphone, Mail, Check, LogOut, Globe } from "lucide-react";
import { SectionCard, FormField } from "./Shared";

export default function Security() {
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [twoFA, setTwoFA] = useState(false);
  const [sessions] = useState([
    { device: "Chrome · macOS", location: "Lagos, NG", time: "Active now",   current: true },
    { device: "Safari · iPhone",  location: "Abuja, NG",  time: "2 hrs ago",   current: false },
    { device: "Firefox · Windows",location: "Lagos, NG",  time: "3 days ago",  current: false },
  ]);

  const handlePassword = (e) => setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }));
  const saveToast = (msg = "Changes saved") => alert(msg);

  return (
    <div className="space-y-6">
      {/* Change password */}
      <SectionCard icon={Lock} title="Change password" description="Use a strong password you don't reuse elsewhere.">
        <div className="space-y-4 max-w-sm">
          <FormField label="Current password"  name="current" value={passwords.current} onChange={handlePassword} type="password" placeholder="Current password" />
          <FormField label="New password"       name="newPass" value={passwords.newPass} onChange={handlePassword} type="password" placeholder="At least 8 characters" hint="Min 8 chars, include a number and a symbol." />
          <FormField label="Confirm new password" name="confirm" value={passwords.confirm} onChange={handlePassword} type="password" placeholder="Repeat new password" />
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={() => saveToast("Password updated!")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
          >
            <Check className="w-4 h-4 text-[#C3ECD7]" /> Update password
          </button>
        </div>
      </SectionCard>

      {/* Two-factor auth */}
      <SectionCard icon={Shield} title="Two-factor authentication" description="Add an extra layer of security to your account.">
        <div className="flex items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <Smartphone className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Authenticator app</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {twoFA ? "Enabled — using Google Authenticator" : "Not enabled — your account is less secure."}
              </p>
            </div>
          </div>
          <button
            onClick={() => setTwoFA((v) => !v)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              twoFA
                ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-100"
                : "bg-[#C3ECD7] text-emerald-900 hover:bg-[#a9dbc0]"
            }`}
          >
            {twoFA ? "Disable" : "Enable 2FA"}
          </button>
        </div>

        <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
            <Mail className="w-4 h-4 text-slate-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800">Email verification</p>
            <p className="text-xs text-slate-500 mt-0.5">adaeze@luxe-boutique.com</p>
          </div>
          <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
            <Check className="w-3 h-3" /> Verified
          </span>
        </div>
      </SectionCard>

      {/* Active sessions */}
      <SectionCard icon={Globe} title="Active sessions" description="Devices currently signed into your account.">
        <div className="divide-y divide-slate-100">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{s.device}</p>
                  <p className="text-xs text-slate-500">{s.location} · {s.time}</p>
                </div>
              </div>
              {s.current ? (
                <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">This device</span>
              ) : (
                <button className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors">
                  <LogOut className="w-3.5 h-3.5" /> Revoke
                </button>
              )}
            </div>
          ))}
        </div>
        <button className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1 pt-2">
          <LogOut className="w-3.5 h-3.5" /> Sign out all other sessions
        </button>
      </SectionCard>
    </div>
  );
}
