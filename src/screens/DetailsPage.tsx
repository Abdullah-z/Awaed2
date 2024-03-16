import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Overview from "./WatchList/Overview";
import Valuation from "./WatchList/Valuation";
import Future from "./WatchList/Future";
import { useTheme } from "../hooks";
import Past from "./WatchList/Past";
import Health from "./WatchList/Health";
import Dividend from "./WatchList/Dividend";
import Management from "./WatchList/Management";
import Ownership from "./WatchList/Ownership";
import Information from "./WatchList/Information";
import CommonDataService from "../services/common-data-service";
import { SERVICE_ROUTE } from "../services/endpoints";

export default function DetailsPage({ route }) {
  const [index, setIndex] = React.useState(0);
  const [information, setInformation] = useState([]);
  const [managementInfo, setManagementInfo] = useState([]);

  const { colors } = useTheme();
  const [routes] = React.useState([
    { key: "a", title: "Overview" },
    { key: "b", title: "Valuation" },
    { key: "c", title: "Future" },
    { key: "d", title: "Past" },
    { key: "e", title: "Health" },
    { key: "f", title: "Dividend" },
    { key: "g", title: "Management" },
    { key: "h", title: "Ownership" },
    { key: "i", title: "Information" },
  ]);

  const commonDataService = new CommonDataService();

  const { symb } = route.params;

  const renderScene = SceneMap({
    a: (props) => <Overview {...props} info={information} />,
    b: (props) => <Valuation {...props} info={information} />,
    c: Future,
    d: Past,
    e: Health,
    f: Dividend,
    g: (props) => <Management {...props} info={managementInfo} />,
    h: Ownership,
    i: (props) => <Information {...props} info={information} />,
  });

  console.log(symb);

  const GetInformation = async () => {
    console.log("get all gainers");
    // setLoading(true);
    await commonDataService
      .fetchData(`api/symbol?$filter=Code eq '${symb}'&$expand=Profile`)
      .then(
        async (res) => {
          setInformation(res?.data?.value);
        },
        (error) => {
          // setLoading(false);
          console.log("error" + error);
        }
      );
  };

  const GetManagementInfo = async () => {
    // setLoading(true);
    await commonDataService
      .fetchData(`api/symbol?$filter=Code eq '${symb}'&$expand=KeyExecutives`)
      .then(
        async (res) => {
          console.log("++++" + res.data.value);
          setManagementInfo(res?.data?.value);
        },
        (error) => {
          // setLoading(false);
          console.log("error" + error);
        }
      );
  };

  useEffect(() => {
    GetInformation();
    GetManagementInfo();
  }, []);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      swipeEnabled={false}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          scrollEnabled={true}
          indicatorStyle={{ backgroundColor: colors.info }}
          style={{ backgroundColor: colors.background }}
        />
      )}
    />
  );
}
