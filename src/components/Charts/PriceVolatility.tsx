import { View, Text } from "react-native";
import React from "react";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

export default function PriceVolatility() {
  const { colors, sizes } = useTheme();

  const dataSource = {
    type: "hlineargauge",
    width: "100%",
    height: 150,
    dataFormat: "JSON",
    dataSource: {
      chart: {
        bgColor: colors.tertiary,
        // caption: "Customer Satisfaction Score",
        // subcaption: "Current week - Garden Groove Harbour",
        theme: "fusion",
        showvalue: "1",
        pointerbghovercolor: "#ffffff",
        pointerbghoveralpha: "80",
        pointerhoverradius: "12",
        showborderonhover: "1",
        pointerborderhovercolor: "#333333",
        pointerborderhoverthickness: "2",
        showtickmarks: "0",
        numbersuffix: "%",
      },
      colorrange: {
        color: [
          {
            minvalue: 0,
            maxvalue: 35,
            label: "Low",
            code: "#e44a00",
          },
          {
            minvalue: 35,
            maxvalue: 70,
            label: "Moderate",
            code: "#f8bd19",
          },
          {
            minvalue: 70,
            maxvalue: 100,
            label: "High",
            code: "#6baa01",
          },
        ],
      },
      pointers: {
        pointer: [
          {
            value: "72.5",
            tooltext: "Higher degree of satisfaction score of $datavalue  ",
          },
        ],
      },
    },
  };

  const modules = ["widgets"];
  return <ReactNativeFusionCharts chartConfig={dataSource} modules={modules} />;
}
