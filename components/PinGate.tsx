import React, { useState } from "react";
import PinScreen from "./PinScreen";

// ✅ For a prototype: hardcode PIN here.
// Better: load from env/EAS secrets later.
const PIN = "1999";

export default function PinGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PinScreen pin={PIN} onSuccess={() => setUnlocked(true)} />;
  }

  return <>{children}</>;
}
