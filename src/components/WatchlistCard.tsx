import React, { useEffect, useState } from "react";
import { ScrollView, Pressable } from "react-native";
import CommonDataService from "../services/common-data-service";
import Block from "./Block";
import Text from "./Text";
import { useTheme } from "../hooks";
import { useNavigation } from "@react-navigation/core";
import Sparkline from "./Charts/Sparkline";
import NumberWithCommas from "./NumberWithCommas";
import {
  Button,
  ButtonText,
  Tooltip,
  TooltipContent,
  TooltipText,
} from "@gluestack-ui/themed";
import { Popover } from "@gluestack-ui/themed";
import { PopoverBackdrop } from "@gluestack-ui/themed";
import { PopoverContent } from "@gluestack-ui/themed";
import { PopoverHeader } from "@gluestack-ui/themed";
import { PopoverBody } from "@gluestack-ui/themed";
import { PopoverFooter } from "@gluestack-ui/themed";

export default function WatchlistCard(props) {
  const commonDataService = new CommonDataService();
  const [info, setInfo] = useState();
  const { sizes, colors, gradients, assets } = useTheme();
  const navigation = useNavigation();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <Pressable
        onPress={() =>
          navigation.navigate("DetailsPage", { symb: props.data.code })
        }
      >
        <Block card marginVertical={sizes.xs}>
          <Block row align="center">
            <Block width={100}>
              <Text info>{props.data.code}</Text>
              <Text>{props.data.name}</Text>
            </Block>
            <Block marginHorizontal={sizes.s}>
              <Text gray>Last Price</Text>
              <Text>{props.data.lastPrice}</Text>
            </Block>
            <Block marginHorizontal={sizes.s}>
              <Popover
                isOpen={isOpen}
                onClose={handleClose}
                onOpen={handleOpen}
                placement="top"
                size="full"
                trigger={(triggerProps) => {
                  return (
                    <Pressable onPress={() => handleOpen()} {...triggerProps}>
                      <Text gray>Valuation</Text>
                    </Pressable>
                  );
                }}
              >
                <PopoverBackdrop />
                <PopoverContent>
                  <PopoverBody minWidth={250}>
                    <Block>
                      <Text bold>
                        {NumberWithCommas(props.data.priceEarningsRatio, 1)}x
                      </Text>
                      <Text gray>Price to Earnings</Text>
                    </Block>
                    <Block row>
                      <Block>
                        <Text bold>
                          {NumberWithCommas(props.data.priceToBookRatio, 1)}x
                        </Text>
                        <Text gray>Price to Book</Text>
                      </Block>
                      <Block>
                        <Text bold>
                          {NumberWithCommas(props.data.priceToSalesRatio, 1)}x
                        </Text>
                        <Text gray>Price to Sales</Text>
                      </Block>
                    </Block>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Text>{NumberWithCommas(props.data.priceEarningsRatio, 1)}</Text>
            </Block>
            {/* <Block marginHorizontal={sizes.s}>
              <Text gray>Growth</Text>
              <Text>--</Text>
            </Block> */}
            <Block marginHorizontal={sizes.s}>
              <Text gray>1M</Text>
              <Text
                color={
                  props.data.oneMonthChange > 0 ? colors.success : colors.danger
                }
              >
                {NumberWithCommas(props.data.oneMonthChange)}%
              </Text>
            </Block>

            <Block marginHorizontal={sizes.s}>
              <Sparkline
                data={props.data.prices}
                trend={props.data.oneMonthChange}
              />
            </Block>
          </Block>
        </Block>
      </Pressable>
    </ScrollView>
  );
}
