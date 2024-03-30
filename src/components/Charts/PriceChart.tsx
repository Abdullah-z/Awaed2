import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import CommonDataService from "../../services/common-data-service";
import { SERVICE_ROUTE } from "../../services/endpoints";
import Text from "../Text";
import { useTheme } from "../../hooks";

const PriceChart = (props) => {
  const commonDataService = new CommonDataService();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState();
  const [time, setTime] = useState("3M");
  const { sizes, colors, gradients, assets } = useTheme();

  const url = `${SERVICE_ROUTE.GET_PRICE_HISTORY}/${props.symb}/${time}`;

  const GetPriceHistory = async () => {
    setLoading(true);
    try {
      const res = await commonDataService.fetchData(url);
      setChartData(res.data);
    } catch (error) {
      console.log("Error fetching price history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetPriceHistory();
  }, [time]);

  const [chartConfig, setChartConfig] = useState({
    type: "scrollline2d",
    width: "100%",
    height: 300,
    dataFormat: "json",
    dataSource: {
      chart: {
        bgColor: colors.tertiary,
        theme: "fusion",
        showYAxisValues: "0",
        labelFontColor: "#ffffff",
        divlinealpha: "0",
      },
      categories: [
        {
          category: [],
        },
      ],
      dataset: [
        {
          data: [],
        },
      ],
    },
  });

  useEffect(() => {
    if (chartData) {
      const updatedChartConfig = {
        ...chartConfig,
        dataSource: {
          ...chartConfig.dataSource,
          categories: [
            {
              category: chartData.map((item) => ({
                label: item.date,
              })),
            },
          ],
          dataset: [
            {
              data: chartData.map((item) => ({
                value: item.price.toFixed(2), // Adjust precision if necessary
              })),
            },
          ],
        },
      };
      setChartConfig(updatedChartConfig);
    }
  }, [chartData]);

  return (
    <View style={styles.container}>
      {chartData ? (
        <>
          <ReactNativeFusionCharts chartConfig={chartConfig} />
        </>
      ) : (
        <Text>Loading chart data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default PriceChart;
