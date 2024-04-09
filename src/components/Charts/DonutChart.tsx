import { View } from "react-native";
import React, { useState } from "react";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";
import Block from "../Block";
import { Pressable } from "react-native";
import Text from "../Text";
import { formatNumberWithSuffix } from "../../screens/WatchList/Health";
import { ButtonText, Divider } from "@gluestack-ui/themed";
import NumberWithCommas from "../NumberWithCommas";
import { Button } from "@gluestack-ui/themed";

export default function DonutChart(props) {
  const [type, setType] = useState("PE");
  const [showData, setShowData] = useState(false);
  console.log(props?.data);
  const { colors, sizes } = useTheme();
  const dataSource = {
    type: "doughnut2d",
    width: "100%",
    height: 300,
    dataFormat: "JSON",

    dataSource: {
      chart: {
        theme: "fusion",
        bgColor: colors.tertiary,
        // caption: "Android Distribution for our app",
        // subcaption: "For all users in 2023",
        showpercentvalues: "0",
        defaultcenterlabel:
          "Market Cap " + formatNumberWithSuffix(props.data.marketCap),
        aligncaptionwithcanvas: "0",
        captionpadding: "0",
        labelFontColor: "#ffffff",
        showLabels: "0",
        showValues: "0",
        decimals: "1",
        plottooltext: "<b>$label</b>",
        centerlabel: "$label $value",
        centerLabelColor: colors.white,
        chartLeftMargin: 0,
        centerLabelFontSize: 10,
        doughnutRadius: 45,
        showPercentInLegend: "0",
      },
      data: [
        {
          label: "Market Cap",
          value: props.data.marketCap,
          color: "#3E4855",
        },
        {
          label:
            type === "PE"
              ? "Earnings"
              : type === "PS"
              ? "Sales"
              : type === "PB"
              ? "Book"
              : "Others",
          value:
            type === "PE"
              ? props.data.earnings
              : type === "PS"
              ? props.data.sales
              : type === "PB"
              ? props.data.book
              : 0,
          color: colors.primary,
        },
      ],
    },
  };

  const toggleView = () => {
    setShowData(!showData);
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
        <Block
          padding={8}
          color={type === "Others" ? "#1D2A40" : colors.tertiary}
          justify="center"
          radius={type === "Others" ? 10 : 0}
        >
          <Pressable
            onPress={() => {
              setType("Others");
            }}
          >
            <Text center color={colors.white} semibold>
              Others
            </Text>
          </Pressable>
        </Block>
      </Block>
      {type === "Others" ? (
        <Block marginHorizontal={sizes.xs} marginTop={sizes.s}>
          <Block>
            <Text marginVertical={sizes.s} gray>
              Key Statistics
            </Text>
            <Divider mb={1} bg="$blueGray800" />
            <Block
              row
              justifyContent="space-between"
              style={{
                marginBottom: sizes.s,
              }}
            >
              <Text>Price to Earnings Ratio</Text>
              <Text bold>
                {NumberWithCommas(props.data.priceToEarningsRatio)}x
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
              <Text>Price to Sales Ratio</Text>
              <Text bold>
                {NumberWithCommas(props.data.priceToSalesRatio)}x
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
              <Text>Price to Book Ratio</Text>
              <Text bold>{NumberWithCommas(props.data.priceToBookRatio)}x</Text>
            </Block>
            <Divider mb={1} bg="$blueGray800" />

            <Block
              row
              justifyContent="space-between"
              style={{
                marginBottom: sizes.s,
              }}
            >
              <Text>Enterprise Value/EBITDA</Text>
              <Text bold>
                {NumberWithCommas(props.data.enterpriseValueOverEBITDA)}x
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
              <Text>PEG Ratio</Text>
              <Text bold>{NumberWithCommas(props.data.pegRatio)}x</Text>
            </Block>
            <Divider mb={1} bg="$blueGray800" />
          </Block>
        </Block>
      ) : !showData ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: "75%" }}>
            <ReactNativeFusionCharts chartConfig={dataSource} />
          </View>
          <View style={{ width: "25%" }}>
            <Text center h4 white>
              {type === "PE"
                ? NumberWithCommas(props.data.priceToEarningsRatio)
                : type === "PS"
                ? NumberWithCommas(props.data.priceToSalesRatio)
                : type === "PB"
                ? NumberWithCommas(props.data.priceToBookRatio)
                : 0}
              x
            </Text>
            <Text center gray>
              {type === "PE"
                ? "P/E Ratio"
                : type === "PS"
                ? "P/S Ratio"
                : type === "PB"
                ? "P/B Ratio"
                : 0}
            </Text>
          </View>
        </View>
      ) : (
        <>
          <Block
            row
            justifyContent="space-between"
            style={{
              marginVertical: sizes.s,
            }}
          >
            <Text>
              {type === "PE"
                ? "Price to Earnings Ratio"
                : type === "PS"
                ? "Price to Sale Ratio"
                : type === "PB"
                ? "Price to Book Ratio"
                : ""}
            </Text>
            <Text bold>
              {type === "PE"
                ? NumberWithCommas(props.data.priceToEarningsRatio)
                : type === "PS"
                ? NumberWithCommas(props.data.priceToSalesRatio)
                : type === "PB"
                ? NumberWithCommas(props.data.priceToBookRatio)
                : 0}
              x
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
            <Text>
              {type === "PE"
                ? "Earnings"
                : type === "PS"
                ? "Sales"
                : type === "PB"
                ? "Book"
                : ""}
            </Text>
            <Text bold>
              {type === "PE"
                ? formatNumberWithSuffix(props.data.earnings)
                : type === "PS"
                ? formatNumberWithSuffix(props.data.sales)
                : type === "PB"
                ? formatNumberWithSuffix(props.data.book)
                : 0}
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
            <Text>Market Cap</Text>
            <Text bold>{formatNumberWithSuffix(props.data.marketCap)}</Text>
          </Block>
        </>
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
