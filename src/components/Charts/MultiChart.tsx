import React, { useState } from "react";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";
import { View, Pressable } from "react-native";
import Text from "../Text";
import { ButtonText, Divider } from "@gluestack-ui/themed";
import NumberWithCommas from "../NumberWithCommas";
import { Button } from "@gluestack-ui/themed";

export default function MultiChart(props) {
  const { colors, sizes } = useTheme();

  const [showData, setShowData] = useState(false);

  const toggleView = () => {
    setShowData(!showData);
  };

  const renderDataList = () => {
    return props.data?.map((item, index) => (
      <View key={index}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: sizes.s,
          }}
        >
          <Text>{item.date}</Text>
          <Text bold>{NumberWithCommas(item.annualAmount)}</Text>
          <Text bold>{NumberWithCommas(item.dividendPayment)}</Text>
        </View>
        <Divider mb={1} bg="$blueGray800" />
      </View>
    ));
  };

  const formatDate = (dateString) => {
    const [day, monthAbbreviation, year] = dateString.split("-");
    return `${monthAbbreviation}-${year}`;
  };

  const chartConfig = {
    type: "mscombidy2d",
    width: "100%",
    height: 300,
    dataFormat: "json",
    dataSource: {
      chart: {
        bgColor: colors.background,
        drawcrossline: "1",
        showYAxisValues: "0",
        showXAxisValues: "1",
        divlinealpha: "0",
        showvalues: "0",
        showanchors: "0",
        numberprefix: "$",
        labelFontColor: "#ffffff",
        plothighlighteffect: "fadeout",
        theme: "fusion",
      },
      categories: [
        {
          category: props?.data?.map((item) => ({
            label: formatDate(item.date),
          })),
        },
      ],
      dataset: [
        {
          seriesname: "Dividend Payment",
          plottooltext: "Dividend Payment in $label : <b>$dataValue</b>",
          data: props?.data?.map((item) => ({
            value: item.dividendPayment,
          })),
        },
        {
          seriesname: "Annual Amount",
          plottooltext: "Annual Amount in $label : <b>$dataValue</b>",
          renderas: "line",
          data: props?.data?.map((item) => ({
            value: item.annualAmount,
          })),
        },
      ],
    },
  };

  return (
    <View>
      {!showData ? (
        <ReactNativeFusionCharts chartConfig={chartConfig} />
      ) : (
        <View style={{ marginHorizontal: sizes.xs, marginTop: sizes.s }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: sizes.s,
            }}
          >
            <Text gray>Date</Text>
            <Text gray>Dividend Payment</Text>
            <Text gray>Annual Amount</Text>
          </View>
          {renderDataList()}
        </View>
      )}

      <View style={{ margin: sizes.s, alignItems: "flex-end" }}>
        <Button
          width={"25%"}
          size="sm"
          variant="solid"
          action="secondary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={toggleView}
          bgColor={colors.card}
        >
          <ButtonText>Data</ButtonText>
        </Button>
      </View>
    </View>
  );
}
