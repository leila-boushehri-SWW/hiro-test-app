import React, { useMemo, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function PinScreen({
  pin,
  onSuccess,
}: {
  pin: string;
  onSuccess: () => void;
}) {
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);

  const masked = useMemo(() => "•".repeat(value.length), [value]);

  const submit = () => {
    if (value === pin) {
      setValue("");
      setAttempts(0);
      onSuccess();
      return;
    }
    setAttempts((a) => a + 1);
    setValue("");
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

      <View
        style={{
          borderWidth: 1,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 22, letterSpacing: 4 }}>{masked || " "}</Text>
      </View>

      {/* Hidden input: lets people paste PIN / use keyboard */}
      <TextInput
        value={value}
        onChangeText={(t) => setValue(t.replace(/[^\d]/g, "").slice(0, 6))}
        keyboardType="number-pad"
        returnKeyType="done"
        onSubmitEditing={submit}
        autoFocus
        style={{
          position: "absolute",
          opacity: 0,
          height: 0,
          width: 0,
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

      {attempts >= 3 ? (
        <Text style={{ marginTop: 12, color: "#b00020" }}>
          Too many attempts.
        </Text>
      ) : null}

      <Text style={{ marginTop: 16, opacity: 0.6 }}>
        Tip: tap anywhere to bring up the keypad.
      </Text>

      {/* Tap anywhere to focus the hidden input */}
      <Pressable
        onPress={() => {}}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </View>
  );
}
