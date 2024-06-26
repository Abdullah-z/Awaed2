import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useTheme } from "../hooks";
import MyUpdates from "./Dashboard/MyUpdates";
import MarketPerformance from "./Dashboard/MarketPerformance";
import Calendar from "./Dashboard/Calendar";
import { Search } from "./Search";
import { Block } from "../components";

const renderScene = SceneMap({
  first: MyUpdates,
  second: MarketPerformance,
  third: Calendar,
});

export default function Dashboard() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const { sizes, colors } = useTheme();
  const [routes] = React.useState([
    { key: "first", title: "My Updates" },
    { key: "second", title: "Market Performance" },
    { key: "third", title: "Calendar" },
  ]);
  return (
    <>
      <View style={{ marginHorizontal: sizes.sm }}>
        <Search nav={true} focus={false} placeholder={"Search Companies"} />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled={true}
            indicatorStyle={{ backgroundColor: colors.info }}
            style={{ backgroundColor: colors.background }}
          />
        )}
      />
    </>
  );
}
