import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const Card = ({
    title,
    subtitle,
    icon,
  }: {
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
  }) => (
    <View className="mb-3 rounded-2xl border border-neutral-200 bg-white p-4">
      <View className="flex-row items-start">
        <View className="mr-3 mt-0.5 h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
          <Ionicons name={icon} size={20} color="#111827" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-neutral-900">{title}</Text>
          <Text className="mt-1 text-sm text-neutral-600">{subtitle}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-neutral-50" contentContainerStyle={{ padding: 24 }}>
      <Text className="text-2xl font-semibold text-neutral-900">Home</Text>
      <Text className="mt-2 text-base text-neutral-600">
        This is a React Native (Expo Go) starter port of your app. Only the Welcome flow and
        this Home screen are implemented so far.
      </Text>

      <View className="mt-6">
        <Card title="Lens basics" subtitle="Quick tips for safe, comfortable wear" icon="eye-outline" />
        <Card title="Care reminders" subtitle="Set routines for cleaning and replacing" icon="alarm-outline" />
        <Card title="Get help" subtitle="Find answers fast when something feels off" icon="chatbubbles-outline" />
      </View>

      <Pressable
        className="mt-4 w-full items-center justify-center rounded-2xl bg-neutral-900 py-4"
        onPress={() => {}}
      >
        <Text className="text-base font-semibold text-white">Continue (placeholder)</Text>
      </Pressable>
    </ScrollView>
  );
}
