"use client";

import { useState } from "react";
import OutlineEditor from "./OutlineEditor";
import DayEditor from "./DayEditor";
import MetaEditor from "./MetaEditor";
import { Outline } from "@/types/plans";
import { Id } from "@/../convex/_generated/dataModel";

export default function ClientTabs({
  planId,
  initialOutline,
}: {
  planId: Id<"plans">;
  initialOutline: Outline | null;
}) {
  const [activeTab, setActiveTab] = useState<"meta" | "outline" | "day">("meta");

  const tabs = [
    { id: "meta", label: "Plan Details", icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { id: "outline", label: "Program Structure", icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )},
    { id: "day", label: "Day Content", icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )}
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-neutral-200 p-1 flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "meta" | "outline" | "day")}
            className={`flex-1 min-w-[100px] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-black text-white shadow-sm"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[60vh]">
        {activeTab === "meta" && <MetaEditor planId={planId} />}
        {activeTab === "outline" && <OutlineEditor planId={planId} initialOutline={initialOutline} />}
        {activeTab === "day" && <DayEditor planId={planId} />}
      </div>
    </div>
  );
}