import { View, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "../../hooks";
import { Block, Text } from "../../components";
import { Divider } from "@gluestack-ui/themed";
import VerticalBarChart from "../../components/Charts/VerticalBarChart";
import MultiAreaChart from "../../components/Charts/MultiAreaChart";
import TreeMap from "../../components/Charts/TreeMap";

export default function Health(props) {
  console.log("===>data:", JSON.stringify(props.keyHealthInfo));
  const { colors, sizes } = useTheme();

  function formatNumberWithSuffix(number) {
    const suffixes = ["", "k", "m", "b"]; // Suffixes for thousand, million, and billion
    const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3); // Determine suffix index
    const adjustedNumber = number / Math.pow(1000, suffixIndex); // Adjust the number
    const suffix = suffixes[suffixIndex]; // Get the appropriate suffix
    return adjustedNumber.toFixed(1) + suffix; // Return the formatted number with suffix
  }

  return (
    <ScrollView style={{ margin: sizes.s }}>
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
                ---DATA---
              </Text>
              <Text gray>Debt to equity ratio</Text>
            </View>
          </Block>
          <Block row marginHorizontal={sizes.xs} justify="center">
            <View>
              <Divider w={5} orientation="vertical" bg="$indigo400" />
            </View>
            <View style={{ width: "90%", marginLeft: sizes.s }}>
              <Text h4 semibold>
                {props.keyHealthInfo?.[0]?.BalanceSheetStatements?.[0]
                  ?.ReportedCurrency +
                  " " +
                  formatNumberWithSuffix(
                    props.keyHealthInfo?.[0]?.BalanceSheetStatements?.[0]
                      ?.TotalDebt
                  )}
              </Text>
              <Text gray>Debt</Text>
            </View>
          </Block>
        </Block>
        <Block>
          <Divider bgColor="$blueGray600" marginVertical={sizes.s} />
          <Block row>
            <Block>
              <Text gray>Interest coverage ratio</Text>
            </Block>
            <Block>
              <Text white align="right">
                ---DATA---
              </Text>
            </Block>
          </Block>
          <Divider bgColor="$blueGray600" marginVertical={sizes.s} />
          <Block row>
            <Block>
              <Text gray>Cash</Text>
            </Block>
            <Block>
              <Text white align="right">
                ---DATA---
              </Text>
            </Block>
          </Block>
          <Divider bgColor="$blueGray600" marginVertical={sizes.s} />
          <Block row>
            <Block>
              <Text gray>Equity</Text>
            </Block>
            <Block>
              <Text white align="right">
                {props.keyHealthInfo?.[0]?.BalanceSheetStatements?.[0]
                  ?.ReportedCurrency +
                  " " +
                  formatNumberWithSuffix(
                    props.keyHealthInfo?.[0]?.BalanceSheetStatements?.[0]
                      ?.TotalEquity
                  )}
              </Text>
            </Block>
          </Block>
          <Divider bgColor="$blueGray600" marginVertical={sizes.s} />
          <Block row>
            <Block>
              <Text gray>Total liabilities</Text>
            </Block>
            <Block>
              <Text white align="right">
                {props.keyHealthInfo?.[0]?.BalanceSheetStatements?.[0]
                  ?.ReportedCurrency +
                  " " +
                  formatNumberWithSuffix(
                    props.keyHealthInfo?.[0]?.BalanceSheetStatements?.[0]
                      ?.TotalLiabilities
                  )}
              </Text>
            </Block>
          </Block>
          <Divider bgColor="$blueGray600" marginVertical={sizes.s} />
          <Block row>
            <Block>
              <Text gray>Total assets</Text>
            </Block>
            <Block>
              <Text white align="right">
                {props.keyHealthInfo?.[0]?.BalanceSheetStatements?.[0]
                  ?.ReportedCurrency +
                  " " +
                  formatNumberWithSuffix(
                    props.keyHealthInfo?.[0]?.BalanceSheetStatements?.[0]
                      ?.TotalAssets
                  )}
              </Text>
            </Block>
          </Block>
        </Block>
        <Text h5 white marginVertical={sizes.sm}>
          Financial Position Analysis
        </Text>
        <VerticalBarChart data={props.FPA} />
        <Text h5 white marginVertical={sizes.sm}>
          Debt to Equity History and Analysis
        </Text>
        <MultiAreaChart data={props.DEHA} />
        <TreeMap />
      </Block>
    </ScrollView>
  );
}
