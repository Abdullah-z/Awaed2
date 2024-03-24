import { View } from "react-native";
import React from "react";
import { Block, Text } from "../components";
import { useData, useTheme } from "../hooks";
import { ScrollView } from "react-native-gesture-handler";
import WatchlistCard from "../components/WatchlistCard";

export default function WatchList() {
  const { sizes, colors, gradients, assets } = useTheme();
  const { portfolio, setPortfolio } = useData();
  return (
    <ScrollView>
      <Block margin={sizes.s}>
        {portfolio?.map((item) => {
          return (
            <Block>
              <WatchlistCard symb={item.symb} />
            </Block>
          );
        })}
      </Block>
    </ScrollView>
  );
}
