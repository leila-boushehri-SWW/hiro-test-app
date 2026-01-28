import { useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import HiroLogo from "../components/HiroLogo";

export default function Welcome() {
  useEffect(() => {
    const t = setTimeout(() => router.replace("/welcome-intro"), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <View className="w-full max-w-[420px] items-center">
        <HiroLogo />
        <Text className="mt-4 text-base text-neutral-600">Loading…</Text>
      </View>
    </View>
  );
}
