import React, { useState, useEffect } from "react";
import { Pressable, View, ScrollView } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";
import Text from "../Text";
import Block from "../Block";
import { formatNumberWithSuffix } from "../../screens/WatchList/Health";
import { Divider } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";

const Sankey = (props) => {
  const { colors, sizes } = useTheme();
  const [year, setYear] = useState();
  const [selectedData, setSelectedData] = useState(null);
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    if (props.data?.length > 0) {
      setYear(props.data[props?.data?.length - 1].year); // Set the latest year by default
      setSelectedData(props?.data[props?.data?.length - 1].data); // Set the data for the latest year by default
    }
  }, [props.data]);

  useEffect(() => {
    console.log("Selected Data:", selectedData);
  }, [selectedData]);

  const getDataForYear = (selectedYear) => {
    const selectedData = props?.data?.find(
      (item) => item.year === selectedYear
    );
    return selectedData ? selectedData.data : null;
  };

  const handleYearSelection = (selectedYear) => {
    setYear(selectedYear);
    setSelectedData(getDataForYear(selectedYear));
  };

  const toggleView = () => {
    setShowChart(!showChart);
  };

  const chartConfig = {
    type: "sankey",
    width: "100%",
    height: 300,
    dataFormat: "json",
    dataSource: {
      chart: {
        bgColor: colors.background,
        theme: "fusion",
        nodeLabelFontColor: "#000",
        plotFillColor: colors.background,
        showlegend: "0",
        showdivlinevalues: "0",
        showlimits: "0",
        showvalues: "0",
        plotfillalpha: "40",
        nodeLabelPosition: "inside",
        plottooltext: "Harry's <b>$label</b> skill is rated as <b>$value</b>",
      },
      nodes: [],
      links: [],
    },
  };

  if (year) {
    const dataForYear = getDataForYear(year);
    if (dataForYear) {
      chartConfig.dataSource.nodes = dataForYear.nodes;
      chartConfig.dataSource.links = dataForYear.links;
    }
  }

  const modules = ["powercharts"];

  return (
    <>
      <ScrollView>
        <Block
          marginHorizontal={sizes.xs}
          row
          radius={10}
          marginTop={sizes.s}
          overflow="hidden"
        >
          {props?.data?.map((item) => {
            return (
              <Block
                key={item.year}
                padding={8}
                color={year === item.year ? "#1D2A40" : colors.tertiary}
                justify="center"
                radius={year === item.year ? 10 : 0}
              >
                <Pressable
                  onPress={() => {
                    handleYearSelection(item.year);
                  }}
                >
                  <Text center color={colors.white} semibold>
                    {item.year}
                  </Text>
                </Pressable>
              </Block>
            );
          })}
        </Block>

        {showChart ? (
          <ReactNativeFusionCharts
            chartConfig={chartConfig}
            modules={modules}
          />
        ) : (
          <Block marginHorizontal={sizes.xs} marginTop={sizes.s}>
            {selectedData?.links.map((link, index) => (
              <Block key={index}>
                <Block
                  row
                  justifyContent="space-between"
                  style={{
                    marginBottom: sizes.s,
                  }}
                >
                  <Text>
                    {link.from} to {link.to}:
                  </Text>
                  <Text bold>{formatNumberWithSuffix(link.value)}</Text>
                </Block>
                <Divider mb={1} bg="$blueGray800" />
              </Block>
            ))}
          </Block>
        )}

        <View style={{ margin: sizes.s, alignItems: "flex-end" }}>
          <Button
            width={"25%"}
            size="sm"
            variant="solid"
            action="secondary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={toggleView}
            title={showChart ? "Show Data" : "Show Chart"}
          >
            <ButtonText>Data</ButtonText>
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default Sankey;
