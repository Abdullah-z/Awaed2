import React, { useCallback, useContext, useEffect, useState } from "react";
import Storage from "@react-native-async-storage/async-storage";

import {
  IArticle,
  ICategory,
  IProduct,
  IUser,
  IUseData,
  ITheme,
} from "../constants/types";

import {
  USERS,
  FOLLOWING,
  TRENDING,
  CATEGORIES,
  ARTICLES,
} from "../constants/mocks";
import { light, dark } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const [theme, setTheme] = useState<ITheme>(light);
  const [user, setUser] = useState<IUser>(USERS[0]);
  const [users, setUsers] = useState<IUser[]>(USERS);
  const [following, setFollowing] = useState<IProduct[]>(FOLLOWING);
  const [trending, setTrending] = useState<IProduct[]>(TRENDING);
  const [categories, setCategories] = useState<ICategory[]>(CATEGORIES);
  const [articles, setArticles] = useState<IArticle[]>(ARTICLES);
  const [article, setArticle] = useState<IArticle>({});
  const [portfolio, setPortfolio] = useState([]);
  console.log("folio", portfolio);

  const storePortfolio = async () => {
    try {
      await AsyncStorage.setItem("PORTFOLIO_KEY", JSON.stringify(portfolio));
    } catch (error) {
      // Error saving data
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("PORTFOLIO_KEY");
      if (value !== null) {
        setPortfolio(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    storePortfolio();
  }, [portfolio]);

  const getIsDark = useCallback(async () => {
    const isDarkJSON = await Storage.getItem("isDark");

    if (isDarkJSON !== null) {
      setIsDark(JSON.parse(isDarkJSON));
    }
  }, [setIsDark]);

  const handleIsDark = useCallback(
    (payload: boolean) => {
      // set isDark / compare if has updated
      setIsDark(payload);
      // save preferance to storage
      Storage.setItem("isDark", JSON.stringify(payload));
    },
    [setIsDark]
  );

  const handleUsers = useCallback(
    (payload: IUser[]) => {
      // set users / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(users)) {
        setUsers({ ...users, ...payload });
      }
    },
    [users, setUsers]
  );

  const handleUser = useCallback(
    (payload: IUser) => {
      // set user / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(user)) {
        setUser(payload);
      }
    },
    [user, setUser]
  );

  const handleArticle = useCallback(
    (payload: IArticle) => {
      // set article / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(article)) {
        setArticle(payload);
      }
    },
    [article, setArticle]
  );

  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  useEffect(() => {
    setTheme(isDark ? dark : light);
  }, [isDark]);

  const contextValue = {
    isDark,
    handleIsDark,
    theme,
    setTheme,
    user,
    users,
    handleUsers,
    handleUser,
    following,
    setFollowing,
    trending,
    setTrending,
    categories,
    setCategories,
    articles,
    setArticles,
    article,
    handleArticle,
    portfolio,
    setPortfolio,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
