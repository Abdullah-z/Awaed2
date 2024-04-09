import { View, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "../../hooks";
import { Block, Text } from "../../components";
import Radar from "../../components/Charts/Radar";
import { Divider } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import HorizontalBarChart from "../../components/Charts/HorizontalBarChart";
import DonutChart from "../../components/Charts/DonutChart";
import PERatio from "../../components/Charts/PERatio";
import AreaChart from "../../components/Charts/AreaChart";

export default function Valuation(props) {
  const { colors, sizes } = useTheme();

  return (
    <ScrollView>
      <Block margin={sizes.s}>
        <Block card>
          <Text>
            Is {props.info[0]?.Code} undervalued compared to its fair value,
            analyst forecasts and its price relative to the market?
          </Text>
          <Radar bgcolor={colors.card} />
          <Text gray semibold>
            Valuation Score
          </Text>
          <Text marginBottom={sizes.s} white h5 semibold>
            3/6
          </Text>

          <Divider bgColor="$blueGray600" />
          <Block marginTop={sizes.s}>
            <Block row marginVertical={sizes.xs}>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={colors.success}
                style={{
                  borderRadius: 100,
                }}
              />
              <Text marginLeft={sizes.s} white>
                Below Fair Value
              </Text>
            </Block>
            <Block row marginVertical={sizes.xs}>
              <Ionicons
                name="close-circle-outline"
                size={20}
                color={colors.danger}
                style={{
                  borderRadius: 100,
                }}
              />
              <Text marginLeft={sizes.s} white>
                Significantly Below Fair Value
              </Text>
            </Block>
            <Block row marginVertical={sizes.xs}>
              <Ionicons
                name="close-circle-outline"
                size={20}
                color={colors.danger}
                style={{
                  borderRadius: 100,
                }}
              />
              <Text marginLeft={sizes.s} white>
                Price-To-Earnings vs Peers
              </Text>
            </Block>
          </Block>
          <Block row marginVertical={sizes.xs}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={colors.success}
              style={{
                borderRadius: 100,
              }}
            />
            <Text marginLeft={sizes.s} white>
              Price-To-Earnings vs Industry
            </Text>
          </Block>
          <Block row marginVertical={sizes.xs}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={colors.success}
              style={{
                borderRadius: 100,
              }}
            />
            <Text marginLeft={sizes.s} white>
              Price-To-Earnings vs Fair Ratio
            </Text>
          </Block>
          <Block row marginVertical={sizes.xs}>
            <Ionicons
              name="close-circle-outline"
              size={20}
              color={colors.danger}
              style={{
                borderRadius: 100,
              }}
            />
            <Text marginLeft={sizes.s} white>
              Analyst Forecast
            </Text>
          </Block>
        </Block>
        <Block
          marginVertical={sizes.s}
          radius={sizes.sm}
          padding={sizes.s}
          color={colors.tertiary}
        >
          <Text white h5>
            Share Price vs Fair Value
          </Text>
          <Text marginTop={sizes.s} white>
            What is the Fair Price of MSFT when looking at its future cash
            flows? For this estimate we use a Discounted Cash Flow model.
          </Text>
          <HorizontalBarChart />
          <Block row marginVertical={sizes.xs}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={colors.success}
              style={{
                borderRadius: 100,
              }}
            />
            <Text marginLeft={sizes.s} white>
              Price-To-Earnings vs Fair Ratio
            </Text>
          </Block>
          <Block row marginVertical={sizes.xs}>
            <Ionicons
              name="close-circle-outline"
              size={20}
              color={colors.danger}
              style={{
                borderRadius: 100,
              }}
            />
            <Text marginLeft={sizes.s} white>
              Analyst Forecast
            </Text>
          </Block>

          <Divider marginVertical={sizes.s} bgColor="$blueGray600" />

          <Block>
            <Text h5 white>
              Key Valuation Metric
            </Text>
            <Text marginTop={sizes.s} white>
              Which metric is best to use when looking at relative valuation for{" "}
              {props.info[0]?.Code}?
            </Text>
            {props?.data?.keyValuationMetric ? (
              <DonutChart data={props?.data?.keyValuationMetric} />
            ) : (
              <></>
            )}

            <Divider marginVertical={sizes.s} bgColor="$blueGray600" />
          </Block>
          <Text h5 white>
            Price to Earnings Ratio vs Peers
          </Text>
          <Text marginTop={sizes.s} white>
            How does {props.info[0]?.Code} PE Ratio compare to its peers?
          </Text>
          <PERatio data={props?.data?.ratiosVsPeers} />
          <Block row marginVertical={sizes.xs}>
            <Ionicons
              name="close-circle-outline"
              size={20}
              color={colors.danger}
              style={{
                borderRadius: 100,
              }}
            />
            <Text marginLeft={sizes.s} danger>
              Price-To-Earnings vs Peers{" "}
              <Text white>
                MSFT is expensive based on its Price-To-Earnings Ratio (37.4x)
                compared to peer average (28.6x).
              </Text>
            </Text>
          </Block>
          <Divider marginVertical={sizes.s} bgColor="$blueGray600" />
          <Block>
            <Text white h5>
              Historical Price to Earnings Ratio
            </Text>
            <Text marginTop={sizes.s} white>
              Historical Price to Earnings Ratio compares a stock's price to its
              earnings over time. Higher ratios indicate that investors are
              willing to pay more for the stock.
            </Text>
            <AreaChart data={props?.data?.historicalRatios} />
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
}
