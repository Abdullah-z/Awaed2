import "react-native-gesture-handler";
import React from "react";

import { DataProvider } from "./src/hooks";
import AppNavigation from "./src/navigation/App";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { View } from "react-native";
import { Text } from "./src/components";

export default function App() {
  return (
    <DataProvider>
      <GluestackUIProvider config={config}>
        <AppNavigation />
      </GluestackUIProvider>
    </DataProvider>

    // <View>
    //   <Text>sadsadasd</Text>
    // </View>
  );
}
