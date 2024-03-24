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
import Loading from "../components/Loading";

export default function DetailsPage({ route }) {
  const [index, setIndex] = React.useState(0);
  const [information, setInformation] = useState([]);
  const [managementInfo, setManagementInfo] = useState([]);
  const [keyHealthInfo, setKeyHealthInfo] = useState();
  const [finPositionAnalysis, setFinPositionAnalysis] = useState();
  const [debtEquityHistory, setDebtEquityHistory] = useState();
  const [loading, setLoading] = useState(0);

  const { colors } = useTheme();
  const [routes] = React.useState([
    { key: "a", title: "Overview" },
    { key: "b", title: "Valuation" },
    { key: "c", title: "Future" },
    { key: "d", title: "Past" },
    { key: "e", title: "Financial Health" },
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
    e: (props) => (
      <Health
        {...props}
        keyHealthInfo={keyHealthInfo}
        FPA={finPositionAnalysis}
        DEHA={debtEquityHistory}
      />
    ),
    f: Dividend,
    g: (props) => <Management {...props} info={managementInfo} />,
    h: Ownership,
    i: (props) => <Information {...props} info={information} />,
  });

  function transformData(inputData) {
    let categories = [];
    let dataset = [];

    inputData.forEach((company) => {
      categories.push({
        category: company.BalanceSheetStatements.map((statement) => ({
          label: statement.CalendarYear,
        })),
      });

      dataset.push({
        seriesname: "Cash and Cash Equivalents",
        data: company.BalanceSheetStatements.map((statement) => ({
          value: statement.CashAndCashEquivalents,
        })),
      });

      dataset.push({
        seriesname: "Total Equity",
        data: company.BalanceSheetStatements.map((statement) => ({
          value: statement.TotalEquity,
        })),
      });

      dataset.push({
        seriesname: "Total Debt",
        data: company.BalanceSheetStatements.map((statement) => ({
          value: statement.TotalDebt,
        })),
      });
    });

    return { categories, dataset };
  }

  const GetInformation = async () => {
    setLoading(loading + 1);
    await commonDataService
      .fetchData(`api/symbol?$filter=Code eq '${symb}'&$expand=Profile`)
      .then(
        async (res) => {
          setLoading(loading - 1);
          setInformation(res?.data?.value);
        },
        (error) => {
          setLoading(loading - 1);
          console.log("error" + error);
        }
      );
  };

  const GetManagementInfo = async () => {
    setLoading(loading + 1);
    await commonDataService
      .fetchData(`api/symbol?$filter=Code eq '${symb}'&$expand=KeyExecutives`)
      .then(
        async (res) => {
          setLoading(loading - 1);
          setManagementInfo(res?.data?.value);
        },
        (error) => {
          setLoading(loading - 1);
          console.log("error on text plain" + error);
        }
      );
  };

  const GetKeyInfo = async () => {
    setLoading(loading + 1);
    await commonDataService
      .executeApiCall(
        "api/symbol/$query",
        `$expand=BalanceSheetStatements($select=Date,TotalLiabilities,TotalAssets,TotalEquity,CalendarYear,TotalDebt,TotalEquity,ReportedCurrency),BalanceSheetStatements($filter=Date ge 2023-01-01T00:00:00Z and Date le 2023-12-31T00:00:00Z)&$filter=Code eq '${symb}'`,
        "plain/text"
      )
      .then(async (res) => {
        setLoading(loading - 1);
        setKeyHealthInfo(res.data.value);
        // Assuming data property holds response content
      })
      .catch((error) => {
        setLoading(loading - 1);
        console.log(
          "key info error:",
          error.response ? error.response.data : error
        ); // Log specific error data if available
      });
  };

  const GetFinPositionAnalysis = async () => {
    setLoading(loading + 1);
    await commonDataService
      .executeApiCall(
        "api/symbol/$query",
        `$expand=BalanceSheetStatements($select=Date,ShortTermInvestments,ShortTermDebt,LongTermDebt,LongTermInvestments,ReportedCurrency),BalanceSheetStatements($filter=Date ge 2023-01-01T00:00:00Z and Date le 2023-12-31T00:00:00Z)&$filter=Code eq '${symb}'`,
        "plain/text"
      )
      .then(async (res) => {
        setLoading(loading - 1);
        setFinPositionAnalysis(res.data.value);
      })
      .catch((error) => {
        setLoading(loading - 1);
        console.log(
          "key info error:",
          error.response ? error.response.data : error
        ); // Log specific error data if available
      });
  };

  const GetDebtEquityHistory = async () => {
    setLoading(loading + 1);
    await commonDataService
      .executeApiCall(
        "api/symbol/$query",
        `$expand=BalanceSheetStatements($select=CalendarYear,TotalDebt,TotalEquity,CashAndCashEquivalents,ReportedCurrency)&$filter=Code eq '${symb}'`,
        "plain/text"
      )
      .then(async (res) => {
        setLoading(loading - 1);
        const result = transformData(res.data.value);

        setDebtEquityHistory(result);
        // Assuming data property holds response content
      })
      .catch((error) => {
        setLoading(loading - 1);
        console.log(
          "key info error:",
          error.response ? error.response.data : error
        ); // Log specific error data if available
      });
  };

  useEffect(() => {
    GetInformation();
    GetManagementInfo();
    GetKeyInfo();
    GetFinPositionAnalysis();
    GetDebtEquityHistory();
  }, []);

  return (
    <>
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
      {loading > 0 ? <Loading /> : <></>}
    </>
  );
}
