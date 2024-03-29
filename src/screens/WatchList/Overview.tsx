import { View, ScrollView, Image } from "react-native";
import React from "react";
import { Block, Text } from "../../components";
import { useData, useTheme } from "../../hooks";
import {
  AddIcon,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonIcon,
  ButtonText,
  Divider,
} from "@gluestack-ui/themed";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import Ionicons from "@expo/vector-icons/Ionicons";
import SankeyChart from "../../components/Charts/SankeyChart";
import MyNotes from "../../components/MyNotes";
import Radar from "../../components/Charts/Radar";
import PerformanceChart from "../../components/Charts/PerformanceChart";
import HorizontalBarChart from "../../components/Charts/HorizontalBarChart";
import PriceHistoryPerformance from "../../components/Charts/PriceHistoryPerformance";
import PriceVolatility from "../../components/Charts/PriceVolatility";

export default function Overview(props) {
  const { colors, sizes } = useTheme();
  const { portfolio, setPortfolio } = useData();

  // Preparing the chart data
  const chartData = [
    {
      label: "Venezuela",
      value: "290",
    },
    {
      label: "Saudi",
      value: "350",
    },
    {
      label: "Canada",
      value: "380",
    },
    {
      label: "Iran",
      value: "340",
    },
    {
      label: "Russia",
      value: "280",
    },
    {
      label: "UAE",
      value: "320",
    },
    {
      label: "US",
      value: "300",
    },
    {
      label: "China",
      value: "275",
    },
  ];

  const chartConfigs = {
    type: "line", // The chart type
    width: "100%", // Width of the chart
    height: "100", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        // caption: 'Countries With Most Oil Reserves [2017-18]', //Set the chart caption
        // subCaption: 'In MMbbl = One Million barrels', //Set the chart subcaption
        // xAxisName: 'Country', //Set the x-axis name
        // yAxisName: 'Reserves (MMbbl)', //Set the y-axis name
        // numberSuffix: 'K',
        theme: "fusion", //Set the theme for your chart,
        bgColor: colors.background,
        showBorder: "0", // Hide chart border
        showCanvasBorder: "0", // Hide canvas border
        showLabels: "0", // Hide all labels
        showValues: "0", // Hide values
        showLimits: "0", // Hide gridlines
        lineColor: colors.success,
        showToolTip: "1", // Hide tooltips
        divLineAlpha: "0",
        showYAxisValues: "0",
        lineThickness: "2", // Increase line thickness for a smoother appearance
        drawAnchors: "0", // Hide data points
        plotFillAlpha: "0", // Set the transparency of the filled area (0 to 100)
        plotFillColor: colors.success, // Set the color of the filled area
        drawcrossline: "0",
      },

      // Chart Data - from step 2
      data: chartData,
    },
  };

  return (
    <ScrollView>
      <Block margin={sizes.s}>
        <Block>
          <Block row marginVertical={sizes.s}>
            <Image
              style={{ width: 60, height: 60 }}
              source={{
                uri: props.info[0]?.Profile?.Image,
              }}
            />
            <Block marginLeft={sizes.s}>
              <Text h4>{props.info[0]?.Name}</Text>

              <Block row>
                <Text gray>NasdaqGS:</Text>
                <Text gray>{props.info[0]?.Code}</Text>
              </Block>
            </Block>
          </Block>

          <Block marginVertical={sizes.s}>
            <Button
              onPress={() => {
                const existingIndex = portfolio.findIndex(
                  (item) => item.symb === props.info[0]?.Code
                );
                if (existingIndex !== -1) {
                  setPortfolio((oldData) => {
                    const newData = [...oldData];
                    newData.splice(existingIndex, 1);
                    return newData;
                  });
                } else {
                  setPortfolio((oldData) => [
                    ...oldData,
                    { symb: props.info[0]?.Code },
                  ]);
                }
              }}
            >
              <ButtonText color={colors.black}>
                {portfolio.some((item) => item.symb === props.info[0]?.Code)
                  ? "Remove from Portfolio"
                  : "Add to Portfolio"}
              </ButtonText>
            </Button>
          </Block>
          <Block row>
            <View style={{ width: "25%" }}>
              <Text gray>LAST PRICE</Text>
              <Text bold>-DATA-</Text>
            </View>
            <View style={{ width: "25%" }}>
              <Text gray>MARKET CAP</Text>
              <Text bold>-DATA-</Text>
            </View>
          </Block>

          <Block row style={{ marginTop: sizes.s }}>
            <View style={{ width: "25%" }}>
              <Text gray>7D</Text>
              <Text bold>-DATA-</Text>
            </View>
            <View style={{ width: "25%" }}>
              <Text gray>1Y</Text>
              <Text bold>-DATA-</Text>
            </View>
            <View style={{ width: "50%" }}>
              <ReactNativeFusionCharts chartConfig={chartConfigs} />
            </View>
          </Block>

          <Block row>
            <View style={{ width: "25%" }}>
              <Text gray>UPDATED</Text>
              <Text bold>-DATA-</Text>
            </View>
            <View style={{ width: "25%" }}>
              <Text gray>DATA</Text>
              <Text bold>-DATA-</Text>
            </View>
          </Block>
        </Block>
        <Block marginTop={sizes.sm}>
          <Block>
            <Text marginBottom={sizes.s} h5 gray>
              {props.info[0]?.Code} Stock Overview
            </Text>
            <Block tertiary radius={sizes.sm} padding={sizes.sm}>
              <Text>
                {props.info[0]?.Profile?.Description &&
                  props.info[0]?.Profile?.Description.split(".")
                    .slice(0, 2)
                    .join(".")}
              </Text>
            </Block>
          </Block>
          <Block justify="center">
            <Radar bgcolor={colors.tertiary} />
            <Text white>Snowflake Analysis</Text>
            <Text gray>
              Exceptional growth potential with outstanding track record
            </Text>
          </Block>
        </Block>
        <Block
          tertiary
          radius={sizes.sm}
          padding={sizes.sm}
          marginTop={sizes.sm}
        >
          <Block marginTop={sizes.s}>
            <Text p gray>
              REWARDS
            </Text>
            <Block row align="center">
              <Ionicons
                name="star"
                size={20}
                color={colors.success}
                style={{
                  padding: sizes.s,
                  borderRadius: 100,
                }}
              />
              <Text>Trading at -- aa bb cc dd</Text>
            </Block>
            <Block row align="center">
              <Ionicons
                name="star"
                size={20}
                color={colors.success}
                style={{
                  padding: sizes.s,
                  borderRadius: 100,
                }}
              />
              <Text>Earnings are forecast to grow -- aa bb cc dd</Text>
            </Block>
            <Block row align="center">
              <Ionicons
                name="star"
                size={20}
                color={colors.success}
                style={{
                  padding: sizes.s,
                  borderRadius: 100,
                }}
              />
              <Text>Earnings have grown -- aa bb cc dd</Text>
            </Block>
          </Block>
          <Block marginTop={sizes.s}>
            <Text p gray>
              RISK ANALYSIS
            </Text>
            <Block row align="center">
              <Ionicons
                name="warning"
                size={20}
                color={colors.warning}
                style={{
                  padding: sizes.s,
                  borderRadius: 100,
                }}
              />
              <Text>Trading at -- aa bb cc dd</Text>
            </Block>
            <Block row align="center">
              <Ionicons
                name="warning"
                size={20}
                color={colors.warning}
                style={{
                  padding: sizes.s,
                  borderRadius: 100,
                }}
              />
              <Text>Earnings are forecast to grow -- aa bb cc dd</Text>
            </Block>
            <Button
              marginVertical={sizes.sm}
              width={"100%"}
              variant="outline"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
            >
              <ButtonText>See All Risks Checks</ButtonText>
            </Button>
          </Block>
        </Block>
        <MyNotes />
        <Block
          tertiary
          padding={sizes.sm}
          radius={sizes.sm}
          marginTop={sizes.sm}
        >
          <Block row>
            <Block>
              <Text gray h5>
                Narratives
              </Text>
            </Block>
            <Block>
              <Button
                marginBottom={sizes.s}
                width={"100%"}
                variant="outline"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
              >
                <ButtonText>Create narrative </ButtonText>
                <ButtonIcon as={AddIcon} />
              </Button>
            </Block>
          </Block>
          <Text>
            Narratives bring a range of perspectives from our community.
          </Text>
          <Divider marginTop={sizes.sm} bgColor="$blueGray500"></Divider>
          <Block marginVertical={sizes.sm} row>
            <Avatar size="sm">
              <AvatarFallbackText>SS</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                }}
              />
            </Avatar>
            <Block marginLeft={sizes.s} justify="center">
              <Text semibold>Person Name</Text>
              <Text gray>Equity Analyst</Text>
            </Block>
          </Block>

          <Text p semibold marginVertical={sizes.s}>
            EU Regulations And Poor Emerging Market Strategy Will Erode Margins
            And Limit Sales Growth
          </Text>

          <Text gray marginVertical={sizes.s}>
            Over-reliance on new market penetration could prove to be
            unfruitful, while the world continues to grapple with cost...
          </Text>

          <Block>
            <HorizontalBarChart />
          </Block>

          <Button
            marginVertical={sizes.s}
            variant="outline"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
          >
            <ButtonText>View Narrative</ButtonText>
          </Button>
        </Block>
        <Block
          marginTop={sizes.sm}
          tertiary
          padding={sizes.sm}
          radius={sizes.sm}
        >
          <Text gray marginVertical={sizes.s} h5>
            {props.info[0]?.Name} Competitors
          </Text>
          <Block>
            <ScrollView style={{ marginTop: sizes.s }} horizontal>
              <Block width={300} marginHorizontal={sizes.s}>
                <Radar bgcolor={colors.tertiary} />
              </Block>
              <Block width={300} marginHorizontal={sizes.s}>
                <Radar bgcolor={colors.tertiary} />
              </Block>
              <Block width={300} marginHorizontal={sizes.s}>
                <Radar bgcolor={colors.tertiary} />
              </Block>
              <Block width={300} marginHorizontal={sizes.s}>
                <Radar bgcolor={colors.tertiary} />
              </Block>
            </ScrollView>
          </Block>
        </Block>
        <Block
          radius={sizes.sm}
          padding={sizes.sm}
          marginTop={sizes.sm}
          tertiary
        >
          <Text gray h5>
            Price & History Performance
          </Text>
          <Block marginTop={sizes.s}>
            <PriceHistoryPerformance />
          </Block>
          <Block marginVertical={sizes.s}>
            <Text p semibold>
              Recent News & Update
            </Text>
            <Block marginTop={sizes.s}>
              <Block row align="center">
                <View
                  style={{
                    width: "10%",
                    marginTop: sizes.s,
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="megaphone-outline"
                    size={20}
                    color={colors.icon}
                    style={{
                      backgroundColor: colors.card,
                      padding: sizes.s,
                      borderRadius: 100,
                    }}
                  />
                </View>
                <View
                  style={{
                    width: "90%",
                    marginLeft: sizes.s,
                  }}
                >
                  <Text>
                    Microsoft Corporation announes quarterly dividend, payable
                    on March 20,2025
                  </Text>
                </View>
              </Block>
              <Block row>
                <View style={{ width: "10%" }}></View>
                <View style={{ width: "90%", marginLeft: sizes.s }}>
                  <Text gray>25 Nov</Text>
                </View>
              </Block>
            </Block>
            <Block marginTop={sizes.s}>
              <Block row align="center">
                <View
                  style={{
                    width: "10%",
                    marginTop: sizes.s,
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="newspaper-outline"
                    size={20}
                    color={colors.icon}
                    style={{
                      backgroundColor: colors.card,
                      padding: sizes.s,
                      borderRadius: 100,
                    }}
                  />
                </View>
                <View
                  style={{
                    width: "90%",
                    marginLeft: sizes.s,
                  }}
                >
                  <Text>
                    What is Microsoft Corporation's (NASDARQ:MSFT) Share Price
                    Doing?
                  </Text>
                </View>
              </Block>
              <Block row>
                <View style={{ width: "10%" }}></View>
                <View style={{ width: "90%", marginLeft: sizes.s }}>
                  <Text gray>22 Nov</Text>
                </View>
              </Block>
            </Block>
            <Button
              marginVertical={sizes.s}
              variant="outline"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
            >
              <ButtonText>See more updates</ButtonText>
            </Button>
          </Block>

          <Block>
            <Text marginBottom={sizes.s} h5 bold gray>
              Shareholder Returns
            </Text>

            <Block
              padding={sizes.s}
              row
              radius={sizes.s}
              style={{ borderColor: colors.gray, borderWidth: 1 }}
            >
              <Block>
                <Block>
                  <Text></Text>
                </Block>
                <Block>
                  <Text bold gray>
                    7D
                  </Text>
                </Block>
                <Block>
                  <Text bold gray>
                    1Y
                  </Text>
                </Block>
              </Block>
              <Block>
                <Block>
                  <Text gray>{props.info[0]?.Code}</Text>
                </Block>
                <Block>
                  <Text bold danger>
                    -6.3%
                  </Text>
                </Block>
                <Block>
                  <Text bold success>
                    10.3%
                  </Text>
                </Block>
              </Block>
              <Block>
                <Block>
                  <Text gray>US Tech</Text>
                </Block>
                <Block>
                  <Text bold danger>
                    -7.6%
                  </Text>
                </Block>
                <Block>
                  <Text bold success>
                    2.3%
                  </Text>
                </Block>
              </Block>
              <Block>
                <Block>
                  <Text gray>US Market</Text>
                </Block>
                <Block>
                  <Text bold danger>
                    -0.7%
                  </Text>
                </Block>
                <Block>
                  <Text bold success>
                    12.7%
                  </Text>
                </Block>
              </Block>
            </Block>

            <Button
              marginVertical={sizes.sm}
              variant="outline"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
            >
              <ButtonText>See full shareholder returns</ButtonText>
            </Button>

            <Block>
              <Text danger>
                Return vs Industry:{" "}
                <Text>
                  AAPL underperformed the US Tech industry which returned 15.3%
                  over the past year.
                </Text>
              </Text>
              <Text marginTop={sizes.s} danger>
                Return vs Market:{" "}
                <Text>
                  AAPL underperformed the US Market which returned 24.9% over
                  the past year.
                </Text>
              </Text>
            </Block>

            <Block marginTop={sizes.sm}>
              <Text marginBottom={sizes.s} h5 bold gray>
                Price Volatility
              </Text>
              <PriceVolatility />
              <Block>
                <Text success>
                  Stable Share Price:{" "}
                  <Text>
                    AAPL has not had significant price volatility in the past 3
                    months.
                  </Text>
                </Text>
                <Text marginTop={sizes.s} success>
                  Volatility Over Time:{" "}
                  <Text>
                    AAPL's weekly volatility (3%) has been stable over the past
                    year.
                  </Text>
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>

        <Block
          marginVertical={sizes.sm}
          tertiary
          padding={sizes.sm}
          radius={sizes.sm}
        >
          <Text gray marginVertical={sizes.s} h5>
            About the Company
          </Text>
          <Block row>
            <Block>
              <Text gray>CEO</Text>
              <Text bold>{props.info[0]?.Profile?.Ceo}</Text>
            </Block>
            <Block>
              <Text gray>Employees</Text>
              <Text bold>{props.info[0]?.Profile?.FullTimeEmployees}</Text>
            </Block>
          </Block>
          <Block marginVertical={sizes.s}>
            <Text gray>Website:</Text>
            <Text bold info>
              {props.info[0]?.Profile?.Website}
            </Text>
          </Block>
          <Divider
            width={"90%"}
            marginVertical={sizes.xs}
            variant="horizontal"
            sx={{
              bg: colors.gray,
            }}
          />
          <Text>{props.info[0]?.Profile?.Description}</Text>
        </Block>
        {/* <SankeyChart /> */}
      </Block>
    </ScrollView>
  );
}
