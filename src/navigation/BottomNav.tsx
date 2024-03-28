import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme } from "../hooks";

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
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          headerTitle: "Dashboard",
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
        name="Markets"
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
        name="Discover"
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
        name="WatchList"
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
        name="Portfolios"
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
        name="Screener"
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
