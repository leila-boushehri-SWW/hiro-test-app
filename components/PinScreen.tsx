import React, { useMemo, useRef, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function PinScreen({
  pin,
  onSuccess,
}: {
  pin: string;
  onSuccess: () => void;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<TextInput>(null);

  const masked = useMemo(() => "•".repeat(value.length), [value]);

  const submit = () => {
    if (value === pin) {
      setValue("");
      onSuccess();
      return;
    }
    setValue("");
    Alert.alert("Incorrect PIN", "Please try again.");
    // Re-focus after alert on Android
    setTimeout(() => inputRef.current?.focus(), 250);
  };

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => inputRef.current?.focus()}
    >
      <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 8 }}>
          Enter PIN
        </Text>
        <Text style={{ opacity: 0.7, marginBottom: 16 }}>
          This prototype is restricted.
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 22, letterSpacing: 4 }}>
            {masked || " "}
          </Text>
        </View>

        {/* Off-screen input: still focusable on Android */}
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={(t) => setValue(t.replace(/[^\d]/g, "").slice(0, 6))}
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={submit}
          autoFocus
          blurOnSubmit={false}
          caretHidden
          style={{
            position: "absolute",
            left: -1000,
            top: 0,
            width: 1,
            height: 1,
            opacity: 0.01, // not 0 (Android can be finicky)
          }}
        />

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

        <Text style={{ marginTop: 16, opacity: 0.6 }}>
          Tap anywhere to bring up the keypad.
        </Text>
      </View>
    </Pressable>
  );
}
