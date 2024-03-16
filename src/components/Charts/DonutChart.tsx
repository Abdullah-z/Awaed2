import { View, Text } from "react-native";
import React from "react";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

export default function DonutChart() {
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
        showpercentvalues: "1",
        defaultcenterlabel: "",
        aligncaptionwithcanvas: "0",
        captionpadding: "0",

        decimals: "1",
        plottooltext:
          "<b>$percentValue</b> of our Android users are on <b>$label</b>",
        centerlabel: "# Users: $value",
      },
      data: [
        {
          label: "Earnings",
          value: "1067550000",
        },
      ],
    },
  };

  return <ReactNativeFusionCharts chartConfig={dataSource} />;
}
