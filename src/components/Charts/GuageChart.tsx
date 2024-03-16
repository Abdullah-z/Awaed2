import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

export default function GuageChart() {
  const { colors, sizes } = useTheme();

  const dataSource = {
    type: "angulargauge",
    width: "100%",
    height: 300,
    dataSource: {
      chart: {
        caption: "Walmart's Customer Satisfaction Score",
        subcaption: "2017",
        lowerlimit: "0",
        upperlimit: "100",
        showvalue: "1",
        numbersuffix: "%",
        theme: "fusion",
        bgColor: colors.background,
      },
      colorrange: {
        color: [
          {
            minvalue: "0",
            maxvalue: "50",
            code: "#F2726F",
          },
          {
            minvalue: "50",
            maxvalue: "75",
            code: "#FFC533",
          },
          {
            minvalue: "75",
            maxvalue: "100",
            code: "#62B58F",
          },
        ],
      },
      dials: {
        dial: [
          {
            value: "71",
            tooltext: "<b>9%</b> lesser that target",
          },
        ],
      },
      trendpoints: {
        point: [
          {
            startvalue: "80",
            displayvalue: "Target",
            thickness: "2",
            color: "#E15A26",
            usemarker: "1",
            markerbordercolor: "#E15A26",
            markertooltext: "80%",
          },
        ],
      },
    },
  };

  const modules = ["widgets"];
  return (
    <View>
      <Text>guage</Text>
      <ReactNativeFusionCharts chartConfig={dataSource} modules={modules} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  chartContainer: {
    height: 300,
  },
});
