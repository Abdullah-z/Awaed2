import "react-native-gesture-handler";
import React from "react";

import { DataProvider } from "./src/hooks";
import AppNavigation from "./src/navigation/App";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { View } from "react-native";
import { Text } from "./src/components";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

export default function App() {
  return (
    <DataProvider>
      <GluestackUIProvider config={config}>
        <AutocompleteDropdownContextProvider>
          <AppNavigation />
        </AutocompleteDropdownContextProvider>
      </GluestackUIProvider>
    </DataProvider>

    // <View>
    //   <Text>sadsadasd</Text>
    // </View>
  );
}
