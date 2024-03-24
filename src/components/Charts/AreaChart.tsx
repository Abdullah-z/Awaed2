import { View, Text } from "react-native";
import React from "react";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";
export default function AreaChart() {
  const { colors, sizes } = useTheme();
  const dataSource = {
    type: "splinearea",
    width: "100%",
    height: 300,
    dataFormat: "JSON",
    dataSource: {
      chart: {
        // caption: "Yearly sales of iPhone",
        // yaxisname: "Number of units sold",
        // subcaption: "2007-2016",
        plottooltext: "<div><b>$dataValue</b> iPhones sold in $label</div>",
        theme: "fusion",
        labelFontColor: "#ffffff",
        bgColor: colors.tertiary,
        divlinealpha: "0",
        showPlotBorder: true,
        plotBorderThickness: 4,
        drawFullAreaBorder: 0,
        plotBorderColor: "2394DF",

        plotFillColor: "#1C3E5A",
        showYAxisValues: "0",
      },
      data: [
        {
          label: "2007",
          value: "1380000",
        },
        {
          label: "2008",
          value: "1450000",
        },
        {
          label: "2009",
          value: "1610000",
        },
        {
          label: "2010",
          value: "1540000",
        },
        {
          label: "2011",
          value: "1480000",
        },
        {
          label: "2012",
          value: "1573000",
        },
        {
          label: "2013",
          value: "2232000",
        },
        {
          label: "2014",
          value: "2476000",
        },
        {
          label: "2015",
          value: "2832000",
        },
        {
          label: "2016",
          value: "3808000",
        },
      ],
    },
  };
  return <ReactNativeFusionCharts chartConfig={dataSource} />;
}
