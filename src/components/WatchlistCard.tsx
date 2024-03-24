import { Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import CommonDataService from "../services/common-data-service";
import Block from "./Block";
import Text from "./Text";
import { useTheme } from "../hooks";
import { useNavigation } from "@react-navigation/core";

export default function WatchlistCard(props) {
  const commonDataService = new CommonDataService();
  const [info, setInfo] = useState();
  const { sizes, colors, gradients, assets } = useTheme();
  const navigation = useNavigation();
  const GetInfo = async () => {
    console.log("get all gainers");

    await commonDataService
      .fetchData(
        `https://awaed.azurewebsites.net/api/symbol?$filter=Codeeq'AAPL'&$expand=CoreInformation`
      )
      .then(
        async (res) => {
          setInfo(res?.data?.value);
        },
        (error) => {
          console.log("error" + error);
        }
      );
  };

  useEffect(() => {
    GetInfo();
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate("DetailsPage", { symb: props.symb })}
    >
      <Block card marginVertical={sizes.xs}>
        <Text>{props.symb}</Text>
      </Block>
    </Pressable>
  );
}
