import React from "react";
import { Text, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

const VerticalBarChart = () => {
  const { colors, sizes } = useTheme();

  const chartConfig = {
    type: "scrollcolumn2d",
    width: "100%",
    height: 300,
    dataFormat: "json",
    dataSource: {
      chart: {
        bgColor: colors.tertiary,
        // caption: "Summer Olympics Medal Tally",
        // subcaption: "By Countries",
        // yaxisname: "Count of Medals",
        numvisibleplot: "8",
        labeldisplay: "auto",
        theme: "fusion",
      },
      categories: [
        {
          category: [
            {
              label: "Short term",
            },
            {
              label: "Long term",
            },
          ],
        },
      ],
      dataset: [
        {
          seriesname: "Assets",
          data: [
            {
              value: "121",
            },
            {
              value: "70",
            },
          ],
        },
        {
          seriesname: "Liabilities",
          data: [
            {
              value: "123",
            },
            {
              value: "71",
            },
          ],
        },
      ],
    },
  };

  return <ReactNativeFusionCharts chartConfig={chartConfig} />;
};
export default VerticalBarChart;
