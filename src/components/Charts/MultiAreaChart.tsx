import { View, Text } from "react-native";
import React from "react";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

export default function MultiAreaChart(props) {
  const { colors, sizes } = useTheme();

  const chartConfig = {
    type: "msarea",
    width: "100%",
    height: 300,
    dataFormat: "json",
    dataSource: {
      chart: {
        // caption: "GDP Growth Rate Comparison",
        // yaxisname: "Quarterly GDP Growth Rate in %",
        // subcaption: "India vs China",
        drawcrossline: "1",
        // numbersuffix: "%",
        // plottooltext: "$seriesName's GDP grew $dataValue in $label",
        theme: "fusion",
        bgColor: colors.tertiary,
        showYAxisValues: "0",
        numberprefix:
          props.data?.[0]?.BalanceSheetStatements?.[0]?.ReportedCurrency,
      },
      categories: props?.data?.categories,
      dataset: props?.data?.dataset,
    },
  };
  return <ReactNativeFusionCharts chartConfig={chartConfig} />;
}
