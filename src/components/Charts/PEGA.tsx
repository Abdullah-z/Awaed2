import React from "react";
import { Text, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

const PEGA = (props) => {
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
        showYAxisValues: "0",
        numvisibleplot: "8",
        labeldisplay: "auto",
        theme: "fusion",
        divlinealpha: "0",
        labelFontColor: "#ffffff",
        // legendItemFontColor: "#ffffff",
        legendPosition: "bottom-left",
        numberprefix:
          props.data?.[0]?.BalanceSheetStatements?.[0]?.ReportedCurrency,
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
          seriesname: "Investments",
          data: [
            {
              value:
                props.data?.[0]?.BalanceSheetStatements?.[0]
                  ?.ShortTermInvestments,
            },
            {
              value:
                props.data?.[0]?.BalanceSheetStatements?.[0]
                  ?.LongTermInvestments,
            },
          ],
        },
        {
          seriesname: "Debt",
          data: [
            {
              value:
                props.data?.[0]?.BalanceSheetStatements?.[0]?.ShortTermDebt,
            },
            {
              value: props.data?.[0]?.BalanceSheetStatements?.[0]?.LongTermDebt,
            },
          ],
        },
      ],
    },
  };

  return <ReactNativeFusionCharts chartConfig={chartConfig} />;
};
export default PEGA;
