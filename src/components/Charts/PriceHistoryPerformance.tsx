import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import CommonDataService from "../../services/common-data-service";
import { SERVICE_ROUTE } from "../../services/endpoints";
import Text from "../Text";
import { useTheme } from "../../hooks";
import Block from "../Block";
import { Pressable } from "react-native";

const PriceHistoryPerformance = (props) => {
  const commonDataService = new CommonDataService();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState();
  const [time, setTime] = useState("3M");
  const { sizes, colors, gradients, assets } = useTheme();
  console.log("cdata:", chartData);

  const url = `${SERVICE_ROUTE.GET_PRICE_HISTORY}/${props.symb}/${time}`;

  const GetGainers = async () => {
    setLoading(true);
    try {
      const res = await commonDataService.fetchData(url);
      setChartData(res.data);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  function transformData(data) {
    return data?.map((item) => {
      // Convert the date to the desired format
      const date = new Date(item.date);
      const formattedDate = `${date.getDate()}-${getMonthAbbreviation(
        date
      )}-${String(date.getFullYear()).slice(2)}`;
      return [formattedDate, item.price];
    });
  }

  // Helper function to get the abbreviation of the month
  function getMonthAbbreviation(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[date.getMonth()];
  }

  useEffect(() => {
    GetGainers();
  }, [time]);

  const chartConfig = {
    dataFormat: "json",
    dataJson: transformData(chartData),
    dataSource: {
      legend: {
        enabled: 0,
      },
      navigator: {
        enabled: false,
      },
      styleDefinition: {
        bg: {
          fill: colors.tertiary,
        },
      },
      chart: {
        theme: "candy",
        style: {
          background: "bg",
          canvas: "bg",
          showYAxisValues: "0",
          divlinealpha: "0",
        },
      },

      data: null,
      yAxis: {
        style: {
          title: {
            opacity: 0,
          },
          "grid-line": { opacity: 0 },
          label: { opacity: 0 },
        },
        plot: {
          connectnulldata: true,
        },
      },
    },
    height: "400",
    schemaJson: [
      { format: "%d-%b-%y", name: "Time", type: "date" },
      { name: "Price", type: "number" },
    ],

    type: "timeseries",
    width: "100%",
  };

  console.log("CFG", JSON.stringify(chartConfig));

  return (
    <View style={styles.container}>
      {chartData ? (
        <>
          <Block row radius={10} marginTop={sizes.s} overflow="hidden">
            <Block
              padding={8}
              color={time === "1M" ? "#1D2A40" : colors.tertiary}
              justify="center"
              radius={time === "1M" ? 10 : 0}
            >
              <Pressable
                onPress={() => {
                  setTime("1M");
                }}
              >
                <Text center color={colors.white} semibold>
                  1M
                </Text>
              </Pressable>
            </Block>

            <Block
              padding={8}
              color={time === "3M" ? "#1D2A40" : colors.tertiary}
              justify="center"
              radius={time === "3M" ? 10 : 0}
            >
              <Pressable
                onPress={() => {
                  setTime("3M");
                }}
              >
                <Text center color={colors.white} semibold>
                  3M
                </Text>
              </Pressable>
            </Block>
            <Block
              padding={8}
              color={time === "6M" ? "#1D2A40" : colors.tertiary}
              justify="center"
              radius={time === "6M" ? 10 : 0}
            >
              <Pressable
                onPress={() => {
                  setTime("6M");
                }}
              >
                <Text center color={colors.white} semibold>
                  6M
                </Text>
              </Pressable>
            </Block>
            <Block
              padding={8}
              color={time === "1Y" ? "#1D2A40" : colors.tertiary}
              justify="center"
              radius={time === "1Y" ? 10 : 0}
            >
              <Pressable
                onPress={() => {
                  setTime("1Y");
                }}
              >
                <Text center color={colors.white} semibold>
                  1Y
                </Text>
              </Pressable>
            </Block>
            <Block
              padding={8}
              color={time === "5Y" ? "#1D2A40" : colors.tertiary}
              justify="center"
              radius={time === "5Y" ? 10 : 0}
            >
              <Pressable
                onPress={() => {
                  setTime("5Y");
                }}
              >
                <Text center color={colors.white} semibold>
                  5Y
                </Text>
              </Pressable>
            </Block>
          </Block>
          <ReactNativeFusionCharts
            chartConfig={chartConfig}
            modules={["timeseries"]}
          />
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

export default PriceHistoryPerformance;
