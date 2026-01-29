import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import PinGate from "../components/PinGate";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <PinGate>
        <Stack screenOptions={{ headerShown: false }} />
      </PinGate>
    </SafeAreaProvider>
  );
}
