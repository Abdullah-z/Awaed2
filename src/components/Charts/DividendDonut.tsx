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

export default function DividendDonut(props) {
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
        bgColor: colors.background,
        // caption: "Android Distribution for our app",
        // subcaption: "For all users in 2023",
        showpercentvalues: "0",
        defaultcenterlabel:
          formatNumberWithSuffix(props?.data?.paidAsDividend) + "%",
        aligncaptionwithcanvas: "0",

        captionpadding: "0",
        labelFontColor: "#ffffff",
        showLabels: "0",
        showValues: "0",
        decimals: "1",
        plottooltext: "<b>$label</b>",
        centerlabel: "$label: $value",
        centerLabelColor: colors.white,
        chartLeftMargin: 0,
        centerLabelFontSize: 18,
        doughnutRadius: 45,
        showPercentInLegend: "0",
      },
      data: [
        {
          label: "Cash flow retained",
          value: props?.data?.cashFlowRetained,
          color: "#3E4855",
        },
        {
          label: "Paid as dividend",

          value: props?.data?.paidAsDividend,

          color: colors.primary,
        },
      ],
    },
  };

  return (
    <View>
      <ReactNativeFusionCharts chartConfig={dataSource} />
    </View>
  );
}
