import React, { useMemo, useRef, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  pin: string; // e.g. "1234"
  onSuccess: () => void;
};

export default function PinScreen({ pin, onSuccess }: Props) {
  const len = pin.length; // supports 4 or 6 if you want later
  const [digits, setDigits] = useState<string[]>(Array(len).fill(""));

  const refs = useRef<Array<TextInput | null>>([]);

  const value = useMemo(() => digits.join(""), [digits]);

  const setDigit = (index: number, char: string) => {
    const c = (char || "").replace(/[^\d]/g, "").slice(-1); // keep last digit only
    setDigits((prev) => {
      const next = [...prev];
      next[index] = c;
      return next;
    });

    if (c && index < len - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const onKeyPress = (index: number, key: string) => {
    if (key === "Backspace") {
      setDigits((prev) => {
        const next = [...prev];
        if (next[index]) {
          next[index] = "";
          return next;
        }
        if (index > 0) {
          next[index - 1] = "";
          // move focus back one
          setTimeout(() => refs.current[index - 1]?.focus(), 0);
        }
        return next;
      });
    }
  };

  const submit = () => {
    if (value.length !== len) {
      Alert.alert("Incomplete PIN", `Enter all ${len} digits.`);
      return;
    }
    if (value === pin) {
      setDigits(Array(len).fill(""));
      onSuccess();
      return;
    }
    setDigits(Array(len).fill(""));
    refs.current[0]?.focus();
    Alert.alert("Incorrect PIN", "Please try again.");
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 8 }}>
        Enter PIN
      </Text>
      <Text style={{ opacity: 0.7, marginBottom: 16 }}>
        This prototype is restricted.
      </Text>

      <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
        {digits.map((d, i) => (
          <TextInput
            key={i}
            ref={(r) => (refs.current[i] = r)}
            value={d}
            onChangeText={(t) => setDigit(i, t)}
            onKeyPress={({ nativeEvent }) => onKeyPress(i, nativeEvent.key)}
            keyboardType="number-pad"
            inputMode="numeric"
            maxLength={1}
            textAlign="center"
            autoCorrect={false}
            autoCapitalize="none"
            style={{
              width: 48,
              height: 56,
              borderWidth: 1,
              borderRadius: 12,
              fontSize: 22,
            }}
            // focus first box on mount
            autoFocus={i === 0}
          />
        ))}
      </View>

      <Pressable
        onPress={submit}
        style={{
          borderRadius: 12,
          paddingVertical: 14,
          alignItems: "center",
          borderWidth: 1,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Unlock</Text>
      </Pressable>

      <Pressable
        onPress={() => refs.current[0]?.focus()}
        style={{ marginTop: 16 }}
      >
        <Text style={{ opacity: 0.6 }}>Tap here if the keypad doesn’t appear.</Text>
      </Pressable>
    </View>
  );
}
