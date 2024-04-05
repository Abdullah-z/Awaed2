import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";
import NumberWithCommas from "../NumberWithCommas";

export default function GuageChart(props) {
  const { colors, sizes } = useTheme();

  const dataSource = {
    type: "angulargauge",
    width: "100%",
    height: 300,
    dataSource: {
      chart: {
        lowerlimit: "0",
        upperlimit: "100",
        numbersuffix: "%",
        theme: "fusion",
        labelFontColor: "#ffffff",
        bgColor: colors.background,
      },
      colorrange: {
        color: [
          { minvalue: "0", maxvalue: "50", code: "#F2726F" },
          { minvalue: "50", maxvalue: "75", code: "#FFC533" },
          { minvalue: "75", maxvalue: "100", code: "#62B58F" },
        ],
      },
      dials: {
        dial: [
          {
            bgcolor: "#2394DF",
            bordercolor: "#FFFFFF",
            value: props.data,
          },
        ],
      },
    },
  };

  if (props.data2) {
    dataSource.dataSource.dials.dial.push({
      bgcolor: "#71E7D6",
      bordercolor: "#FFFFFF",
      value: props.data2,
    });
  }

  const modules = ["widgets"];

  return (
    <View>
      <ReactNativeFusionCharts chartConfig={dataSource} modules={modules} />
      {props.data2 && (
        <View style={styles.legendContainer}>
          {props.data && (
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#2394DF" }]}
              />
              <Text style={styles.legendText}>
                {props?.legendA}: {NumberWithCommas(props.data)}%
              </Text>
            </View>
          )}
          {props.data2 && (
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#71E7D6" }]}
              />
              <Text style={styles.legendText}>
                {props?.legendB}: {NumberWithCommas(props.data2)}%
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    color: "white",
  },
});
