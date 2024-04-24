import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Overview from "./WatchList/Overview";
import Valuation from "./WatchList/Valuation";
import Future from "./WatchList/Future";
import { useTheme, useTranslation } from "../hooks";
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
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(0);
  const [pastPerformance, setPastPerformance] = useState();
  const [balanceSheet, setBalanceSheet] = useState();
  const [valuation, setValuation] = useState();
  const [dividend, setDividend] = useState();
  const [overview, setOverview] = useState();
  console.log("NEWS:", JSON.stringify(overview));

  const { t, locale } = useTranslation();

  const { colors } = useTheme();
  const [routes] = React.useState([
    { key: "a", title: t("overview") },
    { key: "b", title: t("valuation") },
    // { key: "c", title: "Future" },
    { key: "d", title: t("past") },
    { key: "e", title: t("financialHealth") },
    { key: "f", title: t("dividend") },
    { key: "g", title: t("management") },
    { key: "h", title: t("ownership") },
    { key: "i", title: t("information") },
  ]);

  const commonDataService = new CommonDataService();

  const { symb } = route.params;

  const renderScene = SceneMap({
    a: (props) => <Overview {...props} info={information} data={overview} />,
    b: (props) => <Valuation {...props} info={information} data={valuation} />,
    // c: Future,
    d: (props) => <Past {...props} data={pastPerformance} />,
    e: (props) => (
      <Health
        {...props}
        keyHealthInfo={keyHealthInfo}
        FPA={finPositionAnalysis}
        DEHA={debtEquityHistory}
      />
    ),
    f: (props) => <Dividend {...props} data={dividend} />,
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
    try {
      // Increment loading count when fetching starts
      setLoading(loading + 1);

      await commonDataService
        .fetchData(`api/symbol?$filter=Code eq '${symb}'&$expand=Profile`)
        .then(
          async (res) => {
            setInformation(res?.data?.value);
            // Decrement loading count once data is fetched
            setLoading(loading - 1);
          },
          (error) => {
            console.log("error" + error);
            // Decrement loading count if an error occurs
            setLoading(loading - 1);
          }
        );
    } catch (error) {
      console.log("Error occurred:", error);
      setLoading(loading - 1);
    }
  };

  const GetManagementInfo = async () => {
    try {
      setLoading(loading + 1);

      await commonDataService
        .fetchData(`api/symbol?$filter=Code eq '${symb}'&$expand=KeyExecutives`)
        .then(
          async (res) => {
            setManagementInfo(res?.data?.value);

            setLoading(loading - 1);
          },
          (error) => {
            console.log("error on text plain" + error);

            setLoading(loading - 1);
          }
        );
    } catch (error) {
      console.log("Error occurred:", error);
      setLoading(loading - 1);
    }
  };

  const GetKeyInfo = async () => {
    try {
      setLoading(loading + 1);

      await commonDataService
        .executeApiCall(
          "api/symbol/$query",
          `$expand=BalanceSheetStatements($select=Date,TotalLiabilities,TotalAssets,TotalEquity,CalendarYear,TotalDebt,TotalEquity,ReportedCurrency),BalanceSheetStatements($filter=Date ge 2023-01-01T00:00:00Z and Date le 2023-12-31T00:00:00Z)&$filter=Code eq '${symb}'`,
          "plain/text"
        )
        .then(async (res) => {
          setKeyHealthInfo(res.data.value);

          setLoading(loading - 1);
        })
        .catch((error) => {
          console.log(
            "key info error:",
            error.response ? error.response.data : error
          );
          setLoading(loading - 1);
        });
    } catch (error) {
      console.log("Error occurred:", error);
      setLoading(loading - 1);
    }
  };

  const GetFinPositionAnalysis = async () => {
    try {
      // Increment loading count when fetching starts
      setLoading(loading + 1);

      await commonDataService
        .executeApiCall(
          "api/symbol/$query",
          `$expand=BalanceSheetStatements($select=Date,ShortTermInvestments,ShortTermDebt,LongTermDebt,LongTermInvestments,ReportedCurrency),BalanceSheetStatements($filter=Date ge 2023-01-01T00:00:00Z and Date le 2023-12-31T00:00:00Z)&$filter=Code eq '${symb}'`,
          "plain/text"
        )
        .then(async (res) => {
          setFinPositionAnalysis(res.data.value);
          // Decrement loading count once data is fetched
          setLoading(loading - 1);
        })
        .catch((error) => {
          // If an error occurs, log the error and decrement loading count
          console.log(
            "key info error:",
            error.response ? error.response.data : error
          ); // Log specific error data if available
          setLoading(loading - 1);
        });
    } catch (error) {
      console.log("Error occurred:", error);
      setLoading(loading - 1);
    }
  };

  const GetDebtEquityHistory = async () => {
    try {
      // Set loading to true when fetching data starts
      setLoading(loading + 1);

      await commonDataService
        .executeApiCall(
          "api/symbol/$query",
          `$expand=BalanceSheetStatements($select=CalendarYear,TotalDebt,TotalEquity,CashAndCashEquivalents,ReportedCurrency)&$filter=Code eq '${symb}'`,
          "plain/text"
        )
        .then(async (res) => {
          const result = transformData(res.data.value);

          // Once data is fetched, set the debtEquityHistory state and loading to false
          setDebtEquityHistory(result);
          setLoading(loading - 1);
        })
        .catch((error) => {
          // If an error occurs, log the error and set loading to false
          console.log(
            "key info error:",
            error.response ? error.response.data : error
          ); // Log specific error data if available
          setLoading(loading - 1);
        });
    } catch (error) {
      console.log("Error occurred:", error);
      setLoading(loading - 1);
    }
  };

  // const GetNews = async () => {
  //   setLoading(loading + 1);
  //   await commonDataService
  //     .executeApiCall(
  //       "api/symbol/$query",
  //       `$filter=Code eq '${symb}'&$expand=News($top=10)`,
  //       "plain/text"
  //     )
  //     .then(async (res) => {
  //       setLoading(loading - 1);

  //       setNews(res?.data?.value[0].News);
  //     })
  //     .catch((error) => {
  //       setLoading(loading - 1);
  //       console.log(
  //         "key info error:",
  //         error.response ? error.response.data : error
  //       );
  //     });
  // };

  const GetPastPerformance = async () => {
    try {
      setLoading(loading + 1);
      const res = await commonDataService.fetchData(
        `${SERVICE_ROUTE.GET_PAST_PERFORMANCE}/${symb}`
      );
      setPastPerformance(res.data);
      setLoading(loading - 1);
    } catch (error) {
      setLoading(loading - 1);
      console.log("error", error);
    }
  };

  const GetBalanceSheet = async () => {
    try {
      setLoading(loading + 1);
      const res = await commonDataService.executeApiCall(
        "api/symbol/$query",
        `$expand=BalanceSheetStatements($select=Date,NetReceivables,Inventory,CashAndShortTermInvestments,OtherLiabilities,TotalDebt,TotalEquity,AccountPayables),BalanceSheetStatements($filter=Date ge 2023-01-01T00:00:00Z and Date le 2023-12-31T00:00:00Z)&$filter=Code eq 'AAPL'`,
        "plain/text"
      );
      setBalanceSheet(res.data.value[0].BalanceSheetStatements);
      setLoading(loading - 1);
    } catch (error) {
      setLoading(loading - 1);
      console.log("error", error);
    }
  };

  const GetValuation = async () => {
    try {
      setLoading(loading + 1);
      const res = await commonDataService.fetchData(
        `${SERVICE_ROUTE.GET_VALUATION}/${symb}`
      );
      setValuation(res.data);
      setLoading(loading - 1);
    } catch (error) {
      setLoading(loading - 1);
      console.log("error", error);
    }
  };

  const GetDividend = async () => {
    try {
      setLoading(loading + 1);
      const res = await commonDataService.fetchData(
        `${SERVICE_ROUTE.GET_DIVIDEND}/${symb}`
      );
      setDividend(res.data);
      setLoading(loading - 1);
    } catch (error) {
      setLoading(loading - 1);
      console.log("error", error);
    }
  };

  const GetOverview = async () => {
    try {
      // Set loading to true when fetching data starts
      setLoading(loading + 1);

      const res = await commonDataService.fetchData(
        `${SERVICE_ROUTE.GET_OVERVIEW}/${symb}`
      );

      // Once data is fetched, set the overview state and loading to false
      setOverview(res.data);
      setLoading(loading - 1);
    } catch (error) {
      // If an error occurs, log the error and set loading to false
      console.log("error", error);
      setLoading(loading - 1);
    }
  };

  useEffect(() => {
    GetInformation();
    GetManagementInfo();
    GetKeyInfo();
    GetFinPositionAnalysis();
    GetDebtEquityHistory();
    GetPastPerformance();
    GetBalanceSheet();
    GetValuation();
    GetDividend();
    GetOverview();
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
