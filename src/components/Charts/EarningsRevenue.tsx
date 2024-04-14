import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";
import { formatNumberWithSuffix } from "../../screens/WatchList/Health";
import Block from "../Block";
import Text from "../Text";
import { Button, ButtonText, Divider } from "@gluestack-ui/themed";

const EarningsRevenue = (props) => {
  const { colors, sizes } = useTheme();
  const [showData, setShowData] = useState();

  const chartConfig = {
    type: "waterfall2d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        showvalues: "1",
        bgColor: colors.tertiary,
        divlinealpha: "0",
        showYAxisValues: "0",
        theme: "fusion",
        labelFontColor: "#ffffff",
        plottooltext: "<b>$label</b>: $value",
        rotateLabels: "1",
        valueFontColor: "#ffff",
        sumlabel: "Earnings",
      },
      data: [
        {
          label: "Revenue",
          value: props?.data?.revenue,
          color: "#2394DF",
        },
        {
          label: "Cost of Revenue",
          value: props?.data?.costOfRevenue * -1,
          color: "#803237",
        },
        {
          label: "Gross Profit",
          issum: "1",
          color: "#2DC97E",
        },
        {
          label: "Other Expenses",
          value: props?.data?.otherExpenses,
          color: "#803237",
        },
      ],
    },
  };

  const toggleView = () => {
    setShowData(!showData);
  };

  const modules = ["powercharts"];

  return (
    <>
      {!showData ? (
        <ReactNativeFusionCharts chartConfig={chartConfig} modules={modules} />
      ) : (
        <Block marginHorizontal={sizes.s}>
          <Text gray>Income Statement (TTM)</Text>
          <Block
            row
            justifyContent="space-between"
            style={{
              marginVertical: sizes.s,
            }}
          >
            <Text>Revenue</Text>
            <Text bold>{formatNumberWithSuffix(props?.data?.revenue)}</Text>
          </Block>
          <Divider mb={1} bg="$blueGray800" />
          <Block
            row
            justifyContent="space-between"
            style={{
              marginBottom: sizes.s,
            }}
          >
            <Text>Cost of Revenue</Text>
            <Text bold>
              {formatNumberWithSuffix(props?.data?.costOfRevenue)}
            </Text>
          </Block>
          <Divider mb={1} bg="$blueGray800" />
          <Block
            row
            justifyContent="space-between"
            style={{
              marginBottom: sizes.s,
            }}
          >
            <Text>Gross Profit</Text>
            <Text bold>{formatNumberWithSuffix(props?.data?.grossProfit)}</Text>
          </Block>
          <Divider mb={1} bg="$blueGray800" />
          <Block
            row
            justifyContent="space-between"
            style={{
              marginBottom: sizes.s,
            }}
          >
            <Text>Other Expenses</Text>
            <Text bold>
              {formatNumberWithSuffix(props?.data?.otherExpenses)}
            </Text>
          </Block>
          <Divider mb={1} bg="$blueGray800" />
          <Block
            row
            justifyContent="space-between"
            style={{
              marginBottom: sizes.s,
            }}
          >
            <Text>Earnings</Text>
            <Text bold>{formatNumberWithSuffix(props?.data?.earnings)}</Text>
          </Block>
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
    </>
  );
};

export default EarningsRevenue;
