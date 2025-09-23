"use client";

import dynamic from "next/dynamic";

const ScoreSaver = dynamic(() => import("./ScoreSaver"), { ssr: false });

export default function Page() {
  return (
    <div>
      <ScoreSaver />
    </div>
  );
}
