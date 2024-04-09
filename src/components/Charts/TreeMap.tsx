import React from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

const TreeMap = () => {
  const { colors, sizes } = useTheme();
  const chartConfig = {
    type: "treemap",
    width: "100%",
    height: 600,

    dataFormat: "json",
    dataSource: {
      data: [
        {
          // label: "Assets",
          value: "4434",
          fillColor: colors.tertiary,
          data: [
            {
              label: "Assets",
              value: "2217",
              fillColor: colors.tertiary,
              data: [
                {
                  label: "Galaxy Note 4",
                  value: "519",
                  fillColor: colors.primary,
                },
                {
                  label: "Galaxy S6 Edge",
                  value: "448",
                },
                {
                  label: "Galaxy S6",
                  value: "416",
                },
                {
                  label: "Galaxy J1",
                  value: "304",
                },
                {
                  label: "Galaxy J7",
                  value: "159",
                },
                {
                  label: "Galaxy Note5",
                  value: "191",
                },
                {
                  label: "galaxy A8",
                  value: "180",
                },
              ],
            },
            {
              label: "Liabilities + Equity",
              value: "2217",
              fillColor: colors.tertiary,
              data: [
                {
                  label: "Galaxy Note 4",
                  value: "519",
                  fillColor: colors.primary,
                },
                {
                  label: "Galaxy S6 Edge",
                  value: "448",
                },
                {
                  label: "Galaxy S6",
                  value: "416",
                },
                {
                  label: "Galaxy J1",
                  value: "304",
                },
                {
                  label: "Galaxy J7",
                  value: "159",
                },
                {
                  label: "Galaxy Note5",
                  value: "191",
                },
                {
                  label: "galaxy A8",
                  value: "180",
                },
              ],
            },
          ],
        },
      ],
      // colorrange: {
      //   mapbypercent: "0",
      //   gradient: "1",
      //   minvalue: "0",
      //   code: "#62B58F",
      //   startlabel: "Ideal",
      //   endlabel: "Threshold",
      //   color: [
      //     {
      //       code: "#FFC533",
      //       maxvalue: "0.8",
      //     },
      //     {
      //       code: "#F2726F",
      //       maxvalue: "1.6",
      //       label: "Threshold",
      //     },
      //   ],
      // },
      chart: {
        algorithm: "squarified",
        // caption: "Mobile Sales Analysis for Last Quarter",
        // subcaption: "Brand Smart<br>Based on SAR values",
        theme: "fusion",
        showLegend: false,
        fillColor: colors.danger,
        bgColor: colors.tertiary,
        plotFillColor: colors.background,
        plotBorderColor: colors.background,
        // legendcaption: "Specific Absorption Rate (SAR) in W/kg",
        plottooltext:
          "<b>$label</b><br>SAR (Body): <b>$sValue W/kg</b><br>Units Sold: <b>$dataValue</b>",
      },
    },
  };

  const modules = ["treemap"]; // module names goes here

  return (
    <ReactNativeFusionCharts chartConfig={chartConfig} modules={modules} />
  );
};

export default TreeMap;
