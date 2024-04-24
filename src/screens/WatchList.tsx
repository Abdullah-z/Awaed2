import { View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Block, Text } from "../components";
import { useData, useTheme, useTranslation } from "../hooks";
import { ScrollView } from "react-native-gesture-handler";
import WatchlistCard from "../components/WatchlistCard";
import CommonDataService from "../services/common-data-service";
import { SERVICE_ROUTE } from "../services/endpoints";
import Loading from "../components/Loading";
import { Search } from "./Search";
import { Fab } from "@gluestack-ui/themed";
import { FabIcon } from "@gluestack-ui/themed";
import { AddIcon } from "@gluestack-ui/themed";

export default function WatchList() {
  const { sizes, colors, gradients, assets } = useTheme();
  const { portfolio, setPortfolio } = useData();
  const [loading, setLoading] = useState(false);
  const commonDataService = new CommonDataService();
  const [portfolioData, setPortfolioData] = useState();
  const searchRef = useRef(null); // Create a ref for the Search component
  const [search, setSearch] = useState(false);
  const { locale, t } = useTranslation();

  function extractSymbols(data) {
    return data.map((item) => item.symb);
  }

  const getWatchlistData = async () => {
    setLoading(false);
    await commonDataService
      .executeApiCall(SERVICE_ROUTE.GET_WATCHLIST_DATA, {
        symbols: extractSymbols(portfolio),
      })
      .then(async (res) => {
        //setLoading(true);
        console.log("wtlst:", res.data);
        setPortfolioData(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(
          "key info error:",
          error.response ? error.response.data : error
        );
      });
  };

  useEffect(() => {
    portfolio.length > 0 ? getWatchlistData() : "";
  }, [portfolio]);

  return (
    <>
      <ScrollView>
        <Block margin={sizes.s}>
          <Text h4>{t("watchlist")}</Text>
          {search ? (
            <Search placeholder={t("addCompany")} focus={true} nav={false} />
          ) : (
            <></>
          )}

          <Block marginTop={sizes.xs}>
            {portfolioData?.map((item) => {
              return <WatchlistCard data={item} />;
            })}
          </Block>
        </Block>
      </ScrollView>
      {!search ? (
        <Fab
          onPress={() => setSearch((prevSearch) => !prevSearch)} // Toggle the focus state
          size="lg"
          placement="bottom right"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
        >
          <FabIcon as={AddIcon} />
          {/* <FabLabel>Quick start</FabLabel> */}
        </Fab>
      ) : (
        <></>
      )}

      {loading ? <Loading /> : <></>}
    </>
  );
}
