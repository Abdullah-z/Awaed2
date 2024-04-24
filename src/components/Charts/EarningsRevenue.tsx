import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme, useTranslation } from "../../hooks";
import { formatNumberWithSuffix } from "../../screens/WatchList/Health";
import Block from "../Block";
import Text from "../Text";
import { Button, ButtonText, Divider } from "@gluestack-ui/themed";

const EarningsRevenue = (props) => {
  const { colors, sizes } = useTheme();
  const [showData, setShowData] = useState();
  const { t, locale } = useTranslation();

  const chartConfig = {
    type: "waterfall2d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        showvalues: "1",
        bgColor: colors.tertiary,
        divlinealpha: "0",
        showYAxisValues: "0",
        theme: "fusion",
        labelFontColor: "#ffffff",
        plottooltext: "<b>$label</b>: $value",
        rotateLabels: "1",
        valueFontColor: "#ffff",
        sumlabel: t("earnings"),
      },
      data: [
        {
          label: t("revenue"),
          value: props?.data?.revenue,
          color: "#2394DF",
        },
        {
          label: t("costofRevenue"),
          value: props?.data?.costOfRevenue * -1,
          color: "#803237",
        },
        {
          label: t("grossProfit"),
          issum: "1",
          color: "#2DC97E",
        },
        {
          label: t("otherExpenses"),
          value: props?.data?.otherExpenses,
          color: "#803237",
        },
      ],
    },
  };

  const toggleView = () => {
    setShowData(!showData);
  };

  const modules = ["powercharts"];

  return (
    <>
      {!showData ? (
        <ReactNativeFusionCharts chartConfig={chartConfig} modules={modules} />
      ) : (
        <Block marginHorizontal={sizes.s}>
          <Text gray>{t("incomeStatement")} (TTM)</Text>
          <Block
            justifyContent="space-between"
            style={{
              marginVertical: sizes.s,
              flexDirection: locale === "ar" ? "row-reverse" : "row",
            }}
          >
            <Text>{t("revenue")}</Text>
            <Text bold>{formatNumberWithSuffix(props?.data?.revenue)}</Text>
          </Block>
          <Divider mb={1} bg="$blueGray800" />
          <Block
            justifyContent="space-between"
            style={{
              marginBottom: sizes.s,
              flexDirection: locale === "ar" ? "row-reverse" : "row",
            }}
          >
            <Text>{t("costofRevenue")}</Text>
            <Text bold>
              {formatNumberWithSuffix(props?.data?.costOfRevenue)}
            </Text>
          </Block>
          <Divider mb={1} bg="$blueGray800" />
          <Block
            justifyContent="space-between"
            style={{
              marginBottom: sizes.s,
              flexDirection: locale === "ar" ? "row-reverse" : "row",
            }}
          >
            <Text>{t("grossProfit")}</Text>
            <Text bold>{formatNumberWithSuffix(props?.data?.grossProfit)}</Text>
          </Block>
          <Divider mb={1} bg="$blueGray800" />
          <Block
            justifyContent="space-between"
            style={{
              marginBottom: sizes.s,
              flexDirection: locale === "ar" ? "row-reverse" : "row",
            }}
          >
            <Text>{t("otherExpenses")}</Text>
            <Text bold>
              {formatNumberWithSuffix(props?.data?.otherExpenses)}
            </Text>
          </Block>
          <Divider mb={1} bg="$blueGray800" />
          <Block
            justifyContent="space-between"
            style={{
              marginBottom: sizes.s,
              flexDirection: locale === "ar" ? "row-reverse" : "row",
            }}
          >
            <Text>t{t("earnings")}</Text>
            <Text bold>{formatNumberWithSuffix(props?.data?.earnings)}</Text>
          </Block>
        </Block>
      )}
      <View style={{ margin: sizes.s, alignItems: "flex-end" }}>
        <Button
          width={"25%"}
          size="sm"
          variant="solid"
          action="secondary"
          bgColor={colors.background}
          isDisabled={false}
          isFocusVisible={false}
          onPress={toggleView}
        >
          <ButtonText>{t("data")}</ButtonText>
        </Button>
      </View>
    </>
  );
};

export default EarningsRevenue;
