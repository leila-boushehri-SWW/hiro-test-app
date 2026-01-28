import { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Slide = { title: string; description: string; detail: string };

export default function WelcomeIntro() {
  const slides: Slide[] = useMemo(
    () => [
      {
        title: "Welcome to Hiro",
        description: "Your personal guide to contact lenses and eye health",
        detail: "Everything you need to know about contacts, right in your pocket.",
      },
      {
        title: "Learn at your pace",
        description: "Bite-sized guidance that fits your day",
        detail: "Quick tips, step-by-step help, and reminders when you need them.",
      },
      {
        title: "Get support fast",
        description: "Chat or find answers in seconds",
        detail: "We’ll help you troubleshoot comfort, fit, and care questions.",
      },
    ],
    [],
  );

  const [i, setI] = useState(0);
  const slide = slides[i];
  const isLast = i === slides.length - 1;

  return (
    <View className="flex-1 bg-white px-6 py-10">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-semibold text-neutral-900">{slide.title}</Text>
        <Text className="mt-4 text-lg text-neutral-700">{slide.description}</Text>
        <Text className="mt-3 text-base leading-6 text-neutral-600">{slide.detail}</Text>

        <View className="mt-8 flex-row items-center">
          {slides.map((_, idx) => (
            <View
              key={idx}
              className={[
                "mr-2 h-2 w-2 rounded-full",
                idx === i ? "bg-neutral-900" : "bg-neutral-300",
              ].join(" ")}
            />
          ))}
        </View>
      </View>

      <View className="pb-4">
        <Pressable
          className="w-full flex-row items-center justify-center rounded-2xl bg-neutral-900 py-4"
          onPress={() => {
            if (isLast) router.replace("/home");
            else setI((v) => v + 1);
          }}
        >
          <Text className="text-base font-semibold text-white">
            {isLast ? "Get started" : "Next"}
          </Text>
          <Ionicons name="chevron-forward" size={18} color="white" style={{ marginLeft: 8 }} />
        </Pressable>

        {!isLast && (
          <Pressable className="mt-3 items-center" onPress={() => router.replace("/home")}>
            <Text className="text-sm text-neutral-500">Skip</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
