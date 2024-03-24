import React from "react";
import { Text, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

const PERatio = () => {
  const { colors, sizes } = useTheme();
  const chartData = [
    { label: "Microsoft", value: "250" },
    { label: "Oracle", value: "170" },
    { label: "Meta", value: "180" },
    { label: "Apple", value: "140" },
    { label: "Alphabet", value: "115" },
    // { label: "UAE", value: "100" },
    // { label: "US", value: "30" },
    // { label: "China", value: "30" },
  ];
  const chartConfig = {
    type: "bar2D",
    width: "100%",
    height: 300,
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
        divlinealpha: "0",
        labelFontColor: "#ffffff",
        color: "#1C3E5A",
        showYAxisValues: "0",
        exportEnabled: 0, // to enable the export chart functionality
      },
      data: chartData,
    },
  };
  return <ReactNativeFusionCharts chartConfig={chartConfig} />;
};
export default PERatio;
