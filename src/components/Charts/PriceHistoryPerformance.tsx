// In App.js
import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Platform } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";

export default class PriceHistoryPerformance extends Component {
  constructor(props) {
    super(props);

    const chartConfig = {
      type: "timeseries",
      theme: "fusion",
      width: "100%",
      height: "600",
      dataFormat: "json",

      dataSource: {
        data: null,
        // caption: {
        //   text: "Sales Analysis",
        // },
        // subcaption: {
        //   text: "Grocery",
        // },
        yAxis: [
          {
            plot: {
              value: "Grocery Sales Value",
              type: "line",
            },
            format: {
              prefix: "$",
            },
            title: "Sale Value",
          },
        ],
      },
      schemaJson: null,
      dataJson: null,
    };

    this.state = {
      chartConfig,
    };
  }

  componentDidMount() {
    this.fetchDataAndSchema();
  }

  fetchDataAndSchema() {
    const jsonify = (res) => res.json();
    const dFetch = fetch(
      "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json"
    ).then(jsonify);
    // This is the remote url to fetch the schema.
    const sFetch = fetch(
      "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json"
    ).then(jsonify);
    Promise.all([dFetch, sFetch]).then((res) => {
      const data = res[0];
      const schema = res[1];
      const updatedChartConfig = {
        ...this.state.chartConfig,
        dataJson: data,
        schemaJson: schema,
      };
      this.setState({ chartConfig: updatedChartConfig });
    });
  }

  render() {
    const modules = ["timeseries"];

    return (
      <ReactNativeFusionCharts
        chartConfig={this.state.chartConfig}
        modules={modules}
      />
    );
  }
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
    height: 500,
    backgroundColor: "#000000",
  },
});
