import React from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

const Radar = (props) => {
  const { colors, sizes } = useTheme();
  const chartConfig = {
    type: "radar", // your chart type goes here
    width: "100%",
    height: 300,

    dataFormat: "json",
    dataSource: {
      chart: {
        bgColor: props.bgcolor,
        // caption: "Skill Analysis of Harry",
        // subcaption: "Scale: 1 (low) to 5 (high)",
        theme: "fusion",
        plotFillColor: "#f0f004",
        showlegend: "0",
        showdivlinevalues: "0",
        showlimits: "0",
        showvalues: "0",
        plotfillalpha: "40",
        labelFontColor: "#ffffff",
        plottooltext: "Harry's <b>$label</b> skill is rated as <b>$value</b>",
      },
      categories: [
        {
          category: [
            {
              label: "Value",
            },
            {
              label: "Dividend",
            },
            {
              label: "Past",
            },
            {
              label: "Future",
            },
            {
              label: "Health",
            },
          ],
        },
      ],
      dataset: [
        {
          seriesname: "User Ratings",
          data: [
            {
              value: "2",
            },
            {
              value: "3",
            },
            {
              value: "3",
            },
            {
              value: "4",
            },
            {
              value: "3",
            },
          ],
        },
      ],
    },
  };

  const modules = ["powercharts"]; // module names goes here

  return (
    <ReactNativeFusionCharts chartConfig={chartConfig} modules={modules} />
  );
};

export default Radar;
