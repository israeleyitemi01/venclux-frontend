import React, { useState, useEffect } from "react";
import { Bell, Check, Loader2 } from "lucide-react";
import API from "../../api/axios"; 
import { SectionCard, ToggleRow } from "./Shared";

export default function Notifications() {
  const [notifs, setNotifs] = useState(null);
  const [saving, setSaving] = useState(false);

  // Read current notice state configurations on view load
  useEffect(() => {
    API.get("/vendor/settings")
      .then((res) => {
        if (res.data && res.data.data && res.data.data.notifications) {
          setNotifs(res.data.data.notifications);
        } else {
          // Robust model fallback structural map
          setNotifs({
            newOrder: true,
            orderPaid: true,
            lowStock: true,
            customerMsg: false,
            weeklyReport: true,
            promotions: false,
          });
        }
      })
      .catch((err) => console.error("Error retrieving alert settings profile:", err));
  }, []);

  const toggleNotif = (key) => setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await API.put("/vendor/settings/notifications", notifs);
      const resBody = response.data;
      
      alert(resBody.message || "Notification configurations successfully updated!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to persist updated parameters";
      alert(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (!notifs) {
    return (
      <div className="flex justify-center h-64 items-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionCard icon={Bell} title="Email notifications" description="Choose what Venclux emails you about.">
        <ToggleRow label="New order received" description="Get notified instantly when a customer places an order." enabled={notifs.newOrder} onToggle={() => toggleNotif("newOrder")} />
        <ToggleRow label="Order payment confirmed" description="Alert when a payment clears and the order is paid." enabled={notifs.orderPaid} onToggle={() => toggleNotif("orderPaid")} />
        <ToggleRow label="Low stock alert" description="Remind me when a product drops below your set stock threshold." enabled={notifs.lowStock} onToggle={() => toggleNotif("lowStock")} />
        <ToggleRow label="Customer WhatsApp message" description="Notify me when a customer sends a message via your storefront." enabled={notifs.customerMsg} onToggle={() => toggleNotif("customerMsg")} />
        <ToggleRow label="Weekly performance report" description="Receive a summary of sales every Monday morning." enabled={notifs.weeklyReport} onToggle={() => toggleNotif("weeklyReport")} />
        <ToggleRow label="Venclux product updates & tips" description="Occasional emails about new features and best practices." enabled={notifs.promotions} onToggle={() => toggleNotif("promotions")} />

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 disabled:bg-slate-400 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 text-[#C3ECD7]" />} 
            {saving ? "Saving preferences..." : "Save preferences"}
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
