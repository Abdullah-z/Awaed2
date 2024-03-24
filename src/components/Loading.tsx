import { View, Text } from "react-native";
import React from "react";
import { Spinner } from "@gluestack-ui/themed";

export default function Loading() {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        justifyContent: "center",
        right: 0,
        left: 0,
        backgroundColor: "rgba(52, 52, 52, 0.6)",
      }}
    >
      <Spinner size="large" />
    </View>
  );
}
