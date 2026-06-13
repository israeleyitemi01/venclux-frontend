import React, { useState } from "react";
import { Bell, Check } from "lucide-react";
import { SectionCard, ToggleRow } from "./Shared";

export default function Notifications() {
  const [notifs, setNotifs] = useState({
    newOrder:      true,
    orderPaid:     true,
    lowStock:      true,
    customerMsg:   false,
    weeklyReport:  true,
    promotions:    false,
  });

  const toggleNotif = (key) => setNotifs((p) => ({ ...p, [key]: !p[key] }));
  const saveToast = (msg = "Changes saved") => alert(msg);

  return (
    <div className="space-y-6">
      <SectionCard icon={Bell} title="Email notifications" description="Choose what Venclux emails you about.">
        <ToggleRow
          label="New order received"
          description="Get notified instantly when a customer places an order."
          enabled={notifs.newOrder}
          onToggle={() => toggleNotif("newOrder")}
        />
        <ToggleRow
          label="Order payment confirmed"
          description="Alert when a payment clears and the order is paid."
          enabled={notifs.orderPaid}
          onToggle={() => toggleNotif("orderPaid")}
        />
        <ToggleRow
          label="Low stock alert"
          description="Remind me when a product drops below 10 units."
          enabled={notifs.lowStock}
          onToggle={() => toggleNotif("lowStock")}
        />
        <ToggleRow
          label="Customer WhatsApp message"
          description="Notify me when a customer sends a message via your storefront."
          enabled={notifs.customerMsg}
          onToggle={() => toggleNotif("customerMsg")}
        />
        <ToggleRow
          label="Weekly performance report"
          description="Receive a summary of sales every Monday morning."
          enabled={notifs.weeklyReport}
          onToggle={() => toggleNotif("weeklyReport")}
        />
        <ToggleRow
          label="Venclux product updates & tips"
          description="Occasional emails about new features and best practices."
          enabled={notifs.promotions}
          onToggle={() => toggleNotif("promotions")}
        />

        <div className="flex justify-end pt-2">
          <button
            onClick={() => saveToast("Notification preferences saved!")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
          >
            <Check className="w-4 h-4 text-[#C3ECD7]" /> Save preferences
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
