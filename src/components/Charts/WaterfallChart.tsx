import React from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";
import { formatNumberWithSuffix } from "../../screens/WatchList/Health";

const WaterfallChart = (props) => {
  const { colors, sizes } = useTheme();
  const data = {
    depreciationAndAmortization: 11519000000,
    earnings: 96995000000,
    freeCashFlow: 99584000000,
    netWorkingCapital: -6577000000,
    others: -7349000000,
    stockBasedCompensation: 10833000000,
  };

  const chartConfig = {
    type: "waterfall2d",
    width: "100%",
    height: 300,
    dataFormat: "json",
    dataSource: {
      chart: {
        showvalues: "1",
        bgColor: colors.background,
        divlinealpha: "0",
        showYAxisValues: "0",
        theme: "fusion",
        labelFontColor: "#ffffff",
        plottooltext: "<b>$label</b>: $value",
        rotateLabels: "1",
        valueFontColor: "#ffff",
      },
      data: [
        {
          label: "Depreciation and Amortization",
          value: props?.data?.depreciationAndAmortization,
        },
        {
          label: "Earnings",
          value: props?.data?.earnings,
        },
        {
          label: "Free Cash Flow",
          value: props?.data?.freeCashFlow,
        },
        {
          label: "Net Working Capital",
          value: props?.data?.netWorkingCapital,
        },
        {
          label: "Others",
          value: props?.data?.others,
        },
        {
          label: "Stock-Based Compensation",
          value: props?.data?.stockBasedCompensation,
        },
      ],
    },
  };

  const modules = ["powercharts"];

  return (
    <ReactNativeFusionCharts chartConfig={chartConfig} modules={modules} />
  );
};

export default WaterfallChart;
