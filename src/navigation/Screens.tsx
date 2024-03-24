import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Articles, Components, Home, Profile, Register, Pro } from "../screens";
import { useScreenOptions, useTranslation } from "../hooks";
import BottomNav from "./BottomNav";
import DetailsPage from "../screens/DetailsPage";
import { Test } from "../screens/Search";

const Stack = createStackNavigator();

export default () => {
  const { t } = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator
      screenOptions={screenOptions.stack}
      initialRouteName="Dashboard"
    >
      <Stack.Screen
        name="Home"
        component={BottomNav}
        options={{ title: "Dashboard" }}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen name="DetailsPage" component={DetailsPage} />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{ title: t("navigation.articles") }}
      />

      <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
