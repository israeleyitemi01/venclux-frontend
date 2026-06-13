import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Reusable StatusBadge component for various statuses (Paid, Pending, Active, etc.)
 */
export default function StatusBadge({ status, className }) {
  // Define styles based on status keywords
  const baseClasses = "inline-block text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full";
  
  let statusClasses = "";
  switch (status?.toLowerCase()) {
    case "paid":
    case "active":
    case "delivered":
      statusClasses = "bg-emerald-50 text-emerald-700";
      break;
    case "pending":
    case "processing":
      statusClasses = "bg-amber-50 text-amber-700";
      break;
    case "inactive":
    case "canceled":
    case "failed":
      statusClasses = "bg-rose-50 text-rose-700";
      break;
    case "dispatched":
      statusClasses = "bg-blue-50 text-blue-700";
      break;
    default:
      statusClasses = "bg-slate-100 text-slate-700";
  }

  return (
    <span className={twMerge(clsx(baseClasses, statusClasses, className))}>
      {status}
    </span>
  );
}
