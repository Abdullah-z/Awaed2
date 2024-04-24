import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme, useTranslation } from "../hooks";

import React from "react";
import WatchList from "../screens/WatchList";
import Portfolios from "../screens/Portfolios";
import Dashboard from "../screens/Dashboard";
import Markets from "../screens/Markets";
import Discover from "../screens/Discover";
import Screener from "../screens/Screener";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  const { assets, colors, fonts, gradients, sizes } = useTheme();
  const { locale, t } = useTranslation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={t("dashboard")}
        component={Dashboard}
        options={{
          headerShown: false,
          headerTitle: t("dashboard"),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={20}
              color={focused ? colors.primary : colors.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={t("markets")}
        component={Markets}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "analytics" : "analytics-outline"}
              size={20}
              color={focused ? colors.primary : colors.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={t("discover")}
        component={Discover}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "bulb" : "bulb-outline"}
              size={20}
              color={focused ? colors.primary : colors.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={t("watchlist")}
        component={WatchList}
        options={{
          headerShown: false,
          headerTitle: "Watchlist",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={20}
              color={focused ? colors.primary : colors.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={t("portfolios")}
        component={Portfolios}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "pie-chart" : "pie-chart-outline"}
              size={20}
              color={focused ? colors.primary : colors.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={t("screener")}
        component={Screener}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "scan-circle" : "scan-circle-outline"}
              size={20}
              color={focused ? colors.primary : colors.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
