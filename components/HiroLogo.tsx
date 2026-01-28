import { View, Text } from "react-native";

export default function HiroLogo() {
  return (
    <View className="items-center">
      <View className="h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900">
        <Text className="text-xl font-bold text-white">H</Text>
      </View>
      <Text className="mt-3 text-2xl font-semibold text-neutral-900">Hiro</Text>
    </View>
  );
}
