"use client";

import { useState } from "react";
import OutlineEditor from "./OutlineEditor";
import DayEditor from "./DayEditor";
import MetaEditor from "./MetaEditor";

export default function ClientTabs({
  planId,
  initialOutline,
}: {
  planId: string;
  initialOutline: any;
}) {
  const [activeTab, setActiveTab] = useState<"meta" | "outline" | "day">(
    "meta"
  );

  return (
    <div>
      {/* Tabs header */}
      <div className="flex space-x-6 border-b mb-6">
        <button
          onClick={() => setActiveTab("meta")}
          className={`pb-2 ${
            activeTab === "meta"
              ? "border-b-2 border-black font-medium"
              : "text-neutral-500"
          }`}
        >
          Meta
        </button>
        <button
          onClick={() => setActiveTab("outline")}
          className={`pb-2 ${
            activeTab === "outline"
              ? "border-b-2 border-black font-medium"
              : "text-neutral-500"
          }`}
        >
          Outline
        </button>
        <button
          onClick={() => setActiveTab("day")}
          className={`pb-2 ${
            activeTab === "day"
              ? "border-b-2 border-black font-medium"
              : "text-neutral-500"
          }`}
        >
          Day
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "meta" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Meta Editor</h2>
          <MetaEditor planId={planId} />
        </div>
      )}

      {activeTab === "outline" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Outline Editor</h2>
          <OutlineEditor planId={planId} initialOutline={initialOutline} />
        </div>
      )}

      {activeTab === "day" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Day Editor</h2>
          <DayEditor planId={planId} />
        </div>
      )}
    </div>
  );
}
