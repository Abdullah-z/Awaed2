import React from "react";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

export default function ERHLine(props) {
  const { colors, sizes } = useTheme();

  const chartConfig = {
    type: "msarea",
    width: "100%",
    height: 300,
    dataFormat: "json",
    dataSource: {
      chart: {
        theme: "fusion",
        bgColor: colors.background,
        labelFontColor: "#ffffff",
        legendPosition: "bottom-left",
        drawFullAreaBorder: 0,
        inheritPlotBorderColor: true,
        showPlotBorder: true,
        showYAxisValues: "0",
        showXAxisValues: "0",
        divlinealpha: "0",
        plotBorderThickness: 2,
        numberprefix: "$",
      },
      categories: [
        {
          category: props?.data?.map((item) => ({ label: item.date })),
        },
      ],
      dataset: [
        {
          seriesname: "Revenue",
          data: props?.data?.map((item) => ({ value: item.revenue })),
        },
        {
          seriesname: "Earnings",
          data: props?.data?.map((item) => ({ value: item.earnings })),
        },
        {
          seriesname: "Free Cash Flow",
          data: props?.data?.map((item) => ({ value: item.freeCashFlow })),
        },
        {
          seriesname: "Operating Cash Flow",
          data: props?.data?.map((item) => ({ value: item.operatingCashFlow })),
        },
        {
          seriesname: "Operating Expenses",
          data: props?.data?.map((item) => ({ value: item.operatingExpenses })),
        },
      ],
    },
  };

  return <ReactNativeFusionCharts chartConfig={chartConfig} />;
}
