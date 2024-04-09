import React, { useState } from "react";
import { View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";
import Block from "../Block";
import { Pressable } from "react-native";
import Text from "../Text";

import { ButtonText, Divider } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import NumberWithCommas from "../NumberWithCommas";

const PERatio = (props) => {
  const [type, setType] = useState("PE");
  const { colors, sizes } = useTheme();
  const [showData, setShowData] = useState(false);

  const toggleView = () => {
    setShowData(!showData);
  };

  const chartData = props?.data?.map((item) => ({
    label: item.symbol,
    value:
      type === "PE"
        ? item.priceToEarningsRatio
        : type === "PS"
        ? item.priceToSalesRatio
        : type === "PB"
        ? item.priceToBookRatio
        : 0,
  }));

  const chartConfig = {
    type: "bar2D",
    width: "100%",
    height: 300,
    dataFormat: "json",
    dataSource: {
      chart: {
        bgColor: colors.tertiary,
        theme: "fusion",
        divlinealpha: "0",
        labelFontColor: "#ffffff",
        color: "#1C3E5A",
        showYAxisValues: "0",
        exportEnabled: 0,
        showValues: true,
        valueFontColor: "#fff",
      },
      data: chartData,
    },
  };

  const renderDataList = () => {
    return props.data?.map((item, index) => (
      <Block key={index}>
        <Block
          row
          justifyContent="space-between"
          style={{
            marginBottom: sizes.s,
          }}
        >
          <Text>{item.symbol}</Text>
          <Text bold>
            {type === "PE"
              ? NumberWithCommas(item.priceToEarningsRatio)
              : type === "PS"
              ? NumberWithCommas(item.priceToSalesRatio)
              : type === "PB"
              ? NumberWithCommas(item.priceToBookRatio)
              : ""}
            x
          </Text>
        </Block>
        <Divider mb={1} bg="$blueGray800" />
      </Block>
    ));
  };

  return (
    <View>
      <Block row radius={10} marginTop={sizes.s} overflow="hidden">
        <Block
          padding={8}
          color={type === "PE" ? "#1D2A40" : colors.tertiary}
          justify="center"
          radius={type === "PE" ? 10 : 0}
        >
          <Pressable
            onPress={() => {
              setType("PE");
            }}
          >
            <Text center color={colors.white} semibold>
              PE
            </Text>
          </Pressable>
        </Block>

        <Block
          padding={8}
          color={type === "PS" ? "#1D2A40" : colors.tertiary}
          justify="center"
          radius={type === "PS" ? 10 : 0}
        >
          <Pressable
            onPress={() => {
              setType("PS");
            }}
          >
            <Text center color={colors.white} semibold>
              PS
            </Text>
          </Pressable>
        </Block>
        <Block
          padding={8}
          color={type === "PB" ? "#1D2A40" : colors.tertiary}
          justify="center"
          radius={type === "PB" ? 10 : 0}
        >
          <Pressable
            onPress={() => {
              setType("PB");
            }}
          >
            <Text center color={colors.white} semibold>
              PB
            </Text>
          </Pressable>
        </Block>
      </Block>

      {!showData ? (
        <ReactNativeFusionCharts chartConfig={chartConfig} />
      ) : (
        <Block marginHorizontal={sizes.xs} marginTop={sizes.s}>
          {renderDataList()}
        </Block>
      )}

      <View style={{ margin: sizes.s, alignItems: "flex-end" }}>
        <Button
          width={"25%"}
          size="sm"
          variant="solid"
          action="secondary"
          bgColor={colors.background}
          isDisabled={false}
          isFocusVisible={false}
          onPress={toggleView}
        >
          <ButtonText>Data</ButtonText>
        </Button>
      </View>
    </View>
  );
};

export default PERatio;
