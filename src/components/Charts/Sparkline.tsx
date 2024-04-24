import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../../hooks";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { isReturnStatement } from "typescript";

export default function Sparkline(props) {
  const { colors, sizes } = useTheme();

  const modules = ["widgets"];

  console.log(
    "chart data:",
    props.data?.map((item) => {
      return {
        tooltext: item.date,
        value: item.price,
      };
    })
  );

  const dataSource = {
    type: "sparkline",
    width: 80,
    height: 60,
    dataFormat: "JSON",
    dataSource: {
      chart: {
        // caption: "Yearly sales of iPhone",
        // yaxisname: "Number of units sold",
        // subcaption: "2007-2016",
        plottooltext: "<div><b>$dataValue</b> iPhones sold in $label</div>",
        theme: "fusion",
        showShadow: true,
        lineColor: props.trend > 0 ? colors.success : colors.danger,
        labelFontColor: "#ffffff",
        bgColor: colors.card,
        drawAnchors: false,
        // divlinealpha: "0",
        // showPlotBorder: true,
        // plotBorderThickness: 4,
        // drawFullAreaBorder: 0,
        // plotBorderColor: "2394DF",

        // plotFillColor: "#1C3E5A",
        showYAxisValues: "0",
      },
      dataset: [
        {
          data: props.data?.map((item) => {
            return {
              tooltext: item.date,
              value: item.price,
            };
          }),
        },
      ],
    },
  };

  return (
    <View>
      <ReactNativeFusionCharts modules={modules} chartConfig={dataSource} />
    </View>
  );
}
