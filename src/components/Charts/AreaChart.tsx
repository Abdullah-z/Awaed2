import React, { useState } from "react";
import { View, Pressable } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";
import Text from "../Text";
import NumberWithCommas from "../NumberWithCommas";
import Block from "../Block";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";

export default function AreaChart(props) {
  const { colors, sizes } = useTheme();
  const [type, setType] = useState("PE");
  const [showData, setShowData] = useState(false);

  const toggleView = () => {
    setShowData(!showData);
  };

  const renderDataList = () => {
    return props?.data?.map((item, index) => (
      <View key={index}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: sizes.s,
          }}
        >
          <Text white>{item.date}</Text>
          <Text bold>
            {type === "PE"
              ? NumberWithCommas(item.priceToEarningsRatio)
              : type === "PS"
              ? NumberWithCommas(item.priceToSalesRatio)
              : type === "PB"
              ? NumberWithCommas(item.priceToBookRatio)
              : ""}
          </Text>
        </View>
      </View>
    ));
  };

  const dataSource = {
    type: "splinearea",
    width: "100%",
    height: 300,
    dataFormat: "JSON",
    dataSource: {
      chart: {
        plottooltext: "<div><b>$dataValue</b> $label</div>",
        theme: "fusion",
        labelFontColor: "#ffffff",
        bgColor: colors.tertiary,
        divlinealpha: "0",
        showPlotBorder: true,
        plotBorderThickness: 4,
        drawFullAreaBorder: 0,
        plotBorderColor: "2394DF",
        plotFillColor: "#1C3E5A",
        showYAxisValues: "0",
      },
      data: props?.data?.map((item) => ({
        label: item.date,
        value:
          type === "PE"
            ? item.priceToEarningsRatio
            : type === "PS"
            ? item.priceToSalesRatio
            : type === "PB"
            ? item.priceToBookRatio
            : 0,
      })),
    },
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          borderRadius: 10,
          marginTop: sizes.s,
          overflow: "hidden",
        }}
      >
        {["PE", "PS", "PB"].map((chartType) => (
          <Block
            padding={8}
            color={type === chartType ? "#1D2A40" : colors.tertiary}
            justify="center"
            radius={type === chartType ? 10 : 0}
          >
            <Pressable
              onPress={() => {
                setType(chartType);
              }}
            >
              <Text center color={colors.white} semibold>
                {chartType}
              </Text>
            </Pressable>
          </Block>
        ))}
      </View>

      {!showData ? (
        <ReactNativeFusionCharts chartConfig={dataSource} />
      ) : (
        <View style={{ marginHorizontal: sizes.xs, marginTop: sizes.s }}>
          {renderDataList()}
        </View>
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
}
