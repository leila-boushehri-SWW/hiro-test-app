import React, { useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";
import PinScreen from "./PinScreen";

const UNLOCK_KEY = "pin_gate_unlocked_v1";

// ✅ For a prototype: hardcode PIN here.
// Better: use an env var and EAS secrets (see note at the end).
const PIN = "1999";

export default function PinGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const v = await SecureStore.getItemAsync(UNLOCK_KEY);
        setUnlocked(v === "true");
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const onSuccess = async () => {
    setUnlocked(true);
    await SecureStore.setItemAsync(UNLOCK_KEY, "true");
  };

  // Optional: provide a way to lock again (for demos)
  const lock = async () => {
    setUnlocked(false);
    await SecureStore.deleteItemAsync(UNLOCK_KEY);
  };

  const content = useMemo(() => {
    if (!ready) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }
    if (!unlocked) {
      return <PinScreen pin={PIN} onSuccess={onSuccess} />;
    }
    return children;
  }, [ready, unlocked, children]);

  return <>{content}</>;
}

// If you want a “Lock” button somewhere later, you can export lock logic
// via context; keeping it simple for now.
