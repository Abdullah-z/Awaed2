import { View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { useTheme } from "../../hooks";
import { Block, Text } from "../../components";
import { Divider } from "@gluestack-ui/themed";
import { formatNumberWithSuffix } from "./Health";
import NumberWithCommas from "../../components/NumberWithCommas";
import MultiChart from "../../components/Charts/MultiChart";
import News from "../../components/News";
import DividendDonut from "../../components/Charts/DividendDonut";

export default function Dividend(props) {
  const { colors, sizes } = useTheme();
  return (
    <ScrollView>
      <Block style={{ marginHorizontal: sizes.s }}>
        <Block>
          <Block tertiary padding={sizes.s}>
            <Text h5 white>
              Key Information
            </Text>
            <Block row marginVertical={sizes.sm}>
              <Block row marginHorizontal={sizes.xs} justify="center">
                <View>
                  <Divider w={5} orientation="vertical" bg="$indigo400" />
                </View>
                <View style={{ width: "90%", marginLeft: sizes.s }}>
                  <Text h4 semibold>
                    {NumberWithCommas(
                      props?.data?.keyInformation?.dividendYield
                    )}
                    %
                  </Text>
                  <Text gray>Dividend yield</Text>
                </View>
              </Block>
              <Block row marginHorizontal={sizes.xs} justify="center">
                <View>
                  <Divider w={5} orientation="vertical" bg="$indigo400" />
                </View>
                <View style={{ width: "90%", marginLeft: sizes.s }}>
                  <Text h4 semibold>
                    {NumberWithCommas(props?.data?.keyInformation?.payoutRatio)}
                    %
                  </Text>
                  <Text gray>Payout ratio</Text>
                </View>
              </Block>
            </Block>
            <Block>
              <Divider bgColor="$blueGray800" marginVertical={sizes.s} />
              <Block row>
                <Block>
                  <Text gray>Industry average yield</Text>
                </Block>
                <Block>
                  <Text white align="right">
                    ---DATA---
                  </Text>
                </Block>
              </Block>
              <Divider bgColor="$blueGray800" marginVertical={sizes.s} />
              <Block row>
                <Block>
                  <Text gray>Next dividend pay date </Text>
                </Block>
                <Block>
                  <Text white align="right">
                    ---DATA---
                  </Text>
                </Block>
              </Block>
              <Divider bgColor="$blueGray800" marginVertical={sizes.s} />
              <Block row>
                <Block>
                  <Text gray>Ex dividend date</Text>
                </Block>
                <Block>
                  <Text white align="right">
                    ---DATA---
                  </Text>
                </Block>
              </Block>
              <Divider bgColor="$blueGray800" marginVertical={sizes.s} />
              <Block row>
                <Block>
                  <Text gray>Dividend per share</Text>
                </Block>
                <Block>
                  <Text white align="right">
                    {NumberWithCommas(
                      props?.data?.keyInformation?.dividendPerShare
                    )}
                  </Text>
                </Block>
              </Block>
              <Divider bgColor="$blueGray800" marginVertical={sizes.s} />
              <Block row>
                <Block>
                  <Text gray>Earnings per share </Text>
                </Block>
                <Block>
                  <Text white align="right">
                    {NumberWithCommas(
                      props?.data?.keyInformation?.earningsPerShare
                    )}
                  </Text>
                </Block>
              </Block>
              <Divider bgColor="$blueGray800" marginVertical={sizes.s} />
              <Block row>
                <Block>
                  <Text gray>Dividend yield forecast in 3Y </Text>
                </Block>
                <Block>
                  <Text white align="right">
                    {NumberWithCommas(
                      props?.data?.keyInformation?.dividendYieldForecast3Y
                    )}
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block>
          <Text h5 white marginVertical={sizes.s}>
            Recent dividend updates
          </Text>
          <News news={props?.data?.recentDividendUpdates} />
        </Block>
        <Block marginVertical={sizes.s}>
          <Text h5 white>
            Stability and Growth of Payments
          </Text>
          <MultiChart data={props?.data?.stabilityAndGrowthOfPayment} />
        </Block>
        <Block>
          <DividendDonut data={props?.data?.cashPayoutToShareholders} />
        </Block>
      </Block>
    </ScrollView>
  );
}
