import { View, ScrollView } from "react-native";
import React from "react";
import GuageChart from "../../components/Charts/GuageChart";
import Sankey from "../../components/Charts/Sankey";
import { Block, Text } from "../../components";
import { useTheme } from "../../hooks";
import { Divider } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import MultiAreaChart from "../../components/Charts/MultiAreaChart";
import ERHLine from "../../components/Charts/ERHLine";

export default function Past(props) {
  console.log("working on this:", props.data);
  const { colors, sizes } = useTheme();
  return (
    <ScrollView>
      <Block margin={sizes.s}>
        <Block>
          <Text h5 white>
            Past Earnings Performance
          </Text>
        </Block>
        <Block card marginVertical={sizes.s}>
          <Text bold>Past criteria checks 3/6</Text>
          <Text>
            Apple has been growing earnings at an average annual rate of 14.3%,
            while the Tech industry saw earnings growing at 22.3% annually.
            Revenues have been growing at an average rate of 10.4% per year.
            Apple's return on equity is 136.2%, and it has net
          </Text>
        </Block>

        <Block card>
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
                <Text gray>Earnings growth rate</Text>
              </View>
            </Block>
            <Block row marginHorizontal={sizes.xs} justify="center">
              <View>
                <Divider w={5} orientation="vertical" bg="$indigo400" />
              </View>
              <View style={{ width: "90%", marginLeft: sizes.s }}>
                <Text h4 semibold>
                  ---DATA---
                </Text>
                <Text gray>EPS growth rate</Text>
              </View>
            </Block>
          </Block>
          <Block>
            <Divider bgColor="$blueGray800" marginVertical={sizes.s} />
            <Block row>
              <Block>
                <Text gray>Tech industry growth</Text>
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
                <Text gray>Revenue growth rate</Text>
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
                <Text gray>Return on equity</Text>
              </Block>
              <Block>
                <Text white align="right"></Text>
              </Block>
            </Block>
            <Divider bgColor="$blueGray800" marginVertical={sizes.s} />
            <Block row>
              <Block>
                <Text gray>Net margin </Text>
              </Block>
              <Block>
                <Text white align="right"></Text>
              </Block>
            </Block>
            <Divider bgColor="$blueGray800" marginVertical={sizes.s} />
            <Block row>
              <Block>
                <Text gray>Last Earnings Update </Text>
              </Block>
              <Block>
                <Text white align="right"></Text>
              </Block>
            </Block>
          </Block>
        </Block>

        <Block marginTop={sizes.s} card>
          <Text bold marginBottom={sizes.s}>
            Recent past performance updates
          </Text>

          <Block row align="center" marginVertical={sizes.xs}>
            <View
              style={{
                width: "10%",
                marginTop: sizes.s,
                alignItems: "center",
              }}
            >
              <Ionicons
                name="reader-outline"
                size={20}
                color={colors.icon}
                style={{
                  padding: sizes.s,
                  color: colors.success,
                }}
              />
            </View>
            <View
              style={{
                width: "90%",
                marginLeft: sizes.sm,
              }}
            >
              <Text color={colors.text}>
                First quarter 2024 earnings: EPS and revenues exceed analyst
                expectations
              </Text>
            </View>
          </Block>
          <Block row>
            <View style={{ width: "10%" }}></View>
            <View style={{ width: "90%", marginLeft: sizes.sm }}>
              <Text gray>Feb 6</Text>
            </View>
          </Block>

          <Block row align="center" marginVertical={sizes.xs}>
            <View
              style={{
                width: "10%",
                marginTop: sizes.s,
                alignItems: "center",
              }}
            >
              <Ionicons
                name="reader-outline"
                size={20}
                color={colors.icon}
                style={{
                  padding: sizes.s,
                  color: colors.danger,
                }}
              />
            </View>
            <View
              style={{
                width: "90%",
                marginLeft: sizes.sm,
              }}
            >
              <Text color={colors.text}>
                Full year 2023 earnings: EPS exceeds analyst expectations
              </Text>
            </View>
          </Block>
          <Block row>
            <View style={{ width: "10%" }}></View>
            <View style={{ width: "90%", marginLeft: sizes.sm }}>
              <Text gray>Feb 6</Text>
            </View>
          </Block>
        </Block>

        <Block marginVertical={sizes.s}>
          <Text h5>Revenue & Expenses Breakdown</Text>
          <Text marginVertical={sizes.s}>
            How Apple makes and spends money. Based on latest reported earnings,
            on an LTM basis.
          </Text>
        </Block>
        <Sankey data={props?.data?.revenueAndExpenseBreakdown} />

        <Block>
          <Text h5>Earnings and Revenue History</Text>
          {/* <MultiAreaChart data={props?.data?.earningAndRevenueHistory} /> */}

          <ERHLine data={props?.data?.earningAndRevenueHistory} />

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
              Debt Level:{" "}
              <Text white>
                AAPL's net debt to equity ratio (47.2%) is considered high.
              </Text>
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

          <Text marginLeft={sizes.s} success>
            Debt Coverage:{" "}
            <Text white>
              AAPL's debt is well covered by operating cash flow (107.8%).
            </Text>
          </Text>
        </Block>
      </Block>
    </ScrollView>
  );
}
