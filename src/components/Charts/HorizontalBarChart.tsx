import React from "react";
import { Text, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

const HorizontalBarChart = () => {
  const { colors, sizes } = useTheme();
  const chartData = [
    { label: "Current Price", value: "250" },
    { label: "Fair Value", value: "170" },
    // { label: "Canada", value: "180" },
    // { label: "Iran", value: "140" },
    // { label: "Russia", value: "115" },
    // { label: "UAE", value: "100" },
    // { label: "US", value: "30" },
    // { label: "China", value: "30" },
  ];
  const chartConfig = {
    type: "bar2D",
    width: "100%",
    height: 200,
    dataFormat: "json",
    dataSource: {
      chart: {
        bgColor: colors.tertiary,
        // caption: "Countries With Most Oil Reserves [2017-18]",
        // subCaption: "In MMbbl = One Million barrels",
        // xAxisName: "Country",
        // yAxisName: "Reserves (MMbbl)",
        // numberSuffix: "K",
        theme: "fusion",
        labelFontColor: "#ffffff",
        showYAxisValues: "0",
        divlinealpha: "0",
        showvalues: "1",
        valueFontColor: "#ffff",
        exportEnabled: 0, // to enable the export chart functionality
      },
      data: chartData.map((item) => ({
        value: item.value,
        color: "#2394DF", // Change bar color to blue
        label: item.label,
      })),
    },
  };
  return <ReactNativeFusionCharts chartConfig={chartConfig} />;
};
export default HorizontalBarChart;
