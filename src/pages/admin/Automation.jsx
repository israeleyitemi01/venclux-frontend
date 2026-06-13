import React, { useState } from "react";
import { Pencil, ToggleLeft, ToggleRight, MessageSquare, BookOpen, Zap, HelpCircle, Bot, MessageCircle } from "lucide-react";

/* ─────────────────────────────────────────────
   AutomationCard — reusable card for each feature
   Props: icon, title, description, enabled, onToggle, preview, editLabel
───────────────────────────────────────────── */
function AutomationCard({ icon: Icon, title, description, enabled, onToggle, preview, editLabel = "Edit message", onEdit }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
      {/* Header: icon + toggle */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">{title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          </div>
        </div>
        {/* Toggle */}
        <button onClick={onToggle} className="shrink-0 mt-0.5" title={enabled ? "Disable" : "Enable"}>
          {enabled
            ? <ToggleRight className="w-8 h-8 text-emerald-500" />
            : <ToggleLeft className="w-8 h-8 text-slate-300" />}
        </button>
      </div>

      {/* Message preview (shown when enabled) */}
      {enabled && preview && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 leading-relaxed">
          {preview}
        </div>
      )}

      {/* Edit button */}
      {enabled && (
        <button onClick={onEdit}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors">
          <Pencil className="w-3 h-3" />
          {editLabel}
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   EditMessageModal — inline modal for editing automation messages
───────────────────────────────────────────── */
function EditMessageModal({ title, value, onChange, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Edit: {title}</h3>
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-slate-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#C3ECD7]"
        />
        <p className="text-xs text-slate-400">
          Use <code className="bg-slate-100 px-1 rounded">{"{{name}}"}</code> for customer name,{" "}
          <code className="bg-slate-100 px-1 rounded">{"{{store}}"}</code> for your store name.
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-[#0F172A] text-white rounded-xl hover:bg-slate-800 transition-colors">Save changes</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WhatsApp automation settings for the vendor dashboard
───────────────────────────────────────────── */
export default function Automation() {
  const [modal, setModal] = useState(null); // { key, title }

  /* Automation feature states */
  const [features, setFeatures] = useState({
    welcomeMessage: {
      enabled: true,
      title: "Welcome message",
      description: "Greet customers when they first message your WhatsApp.",
      icon: MessageSquare,
      editLabel: "Edit welcome message",
      preview: "👋 Welcome to Luxe Boutique. Browse our catalog at venclux.com/shop/luxe-boutique",
      message: "👋 Welcome to Luxe Boutique. Browse our catalog at venclux.com/shop/luxe-boutique",
    },
    catalogHeader: {
      enabled: true,
      title: "Catalog header",
      description: "Auto-sends your storefront link when customers and visitors...",
      icon: BookOpen,
      editLabel: "Edit catalog header",
      preview: "Shop the latest collections → see our catalog · reply to reorder",
      message: "Shop the latest collections → see our catalog · reply to reorder",
    },
    quickReply: {
      enabled: false,
      title: "Quick replies",
      description: "Instantly reply to frequent responses for common questions.",
      icon: Zap,
      editLabel: "Manage quick replies",
      preview: "11 templates configured",
      message: "11 templates configured",
    },
    helpCommands: {
      enabled: false,
      title: "Help commands",
      description: "Auto-setup easy-to-use help that your store's clients can...",
      icon: HelpCircle,
      editLabel: "Configure commands",
      preview: "#order · #catalog · /track · #payment",
      message: "#order · #catalog · /track · #payment",
    },
    faqResponses: {
      enabled: true,
      title: "FAQ responses",
      description: "Create customer questions and respond with curated answers.",
      icon: MessageCircle,
      editLabel: "Manage FAQs",
      preview: "6 FAQs configured",
      message: "6 FAQs configured",
    },
    aiAssistant: {
      enabled: false,
      title: "AI assistant",
      description: "GPT-powered replies about your products. Beta.",
      icon: Bot,
      editLabel: "Configure AI",
      preview: "Coming soon",
      message: "Coming soon",
    },
  });

  const toggleFeature = (key) =>
    setFeatures((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }));

  const updateMessage = (key, value) =>
    setFeatures((prev) => ({
      ...prev,
      [key]: { ...prev[key], message: value, preview: value },
    }));

  const featureKeys = Object.keys(features);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">WhatsApp Automation</h1>
        <p className="text-sm text-slate-500 mt-1">Configure these that go live while you sleep.</p>
      </div>

      {/* Automation Cards Grid — 2 columns on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featureKeys.map((key) => {
          const f = features[key];
          return (
            <AutomationCard
              key={key}
              icon={f.icon}
              title={f.title}
              description={f.description}
              enabled={f.enabled}
              onToggle={() => toggleFeature(key)}
              preview={f.preview}
              editLabel={f.editLabel}
              onEdit={() => setModal({ key, title: f.title })}
            />
          );
        })}
      </div>

      {/* Edit Message Modal */}
      {modal && (
        <EditMessageModal
          title={modal.title}
          value={features[modal.key].message}
          onChange={(val) => updateMessage(modal.key, val)}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
