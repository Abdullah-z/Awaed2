import React, { memo, useCallback, useRef, useState } from "react";
import { Button, Dimensions, View, Platform } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useNavigation } from "@react-navigation/core";
import { useData, useTheme } from "../hooks";
import { Text } from "../components";

let filterToken = "";

export const Search = memo((props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);
  const { sizes, colors, gradients, assets } = useTheme();
  const searchRef = useRef(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const { portfolio, setPortfolio } = useData();
  console.log("ppppp", props.focus);
  const getSuggestions = useCallback(async (q) => {
    filterToken = q.toLowerCase();

    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    const response = await fetch(
      `https://awaed.azurewebsites.net/api/symbol? $filter=contains(Name,'${filterToken}')or contains(Code,'${filterToken}') `
    );
    const items = await response.json();

    const suggestions = items.value
      .filter(
        (item) =>
          item.Code.toLowerCase().includes(filterToken) ||
          item.Name.toLowerCase().includes(filterToken)
      )
      .map((item) => ({
        id: item.Code,
        title: item.Name,
      }));
    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    filterToken = "";
    setSuggestionsList(null);
    setSearchInputValue("");
  }, []);

  const handleNavigation = (symb, nav) => {
    if (props.nav === false) {
      const existingIndex = portfolio?.findIndex((item) => item.symb === symb);
      if (existingIndex !== -1) {
        // Symbol exists, do nothing
        return;
      }

      // Symbol doesn't exist, add it
      setPortfolio((oldData) => [...oldData, { symb: symb }]);
    } else {
      navigation.navigate("DetailsPage", { symb: symb });
    }
  };

  const onOpenSuggestionsList = useCallback((isOpened) => {}, []);

  return (
    <>
      <View
        style={[
          { flexDirection: "row" },
          { marginTop: sizes.xs },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}
      >
        <AutocompleteDropdown
          clearOnFocus
          ref={searchRef}
          controller={(controller) => {
            dropdownController.current = controller;
          }}
          direction={Platform.select({ ios: "down" })}
          dataSet={suggestionsList}
          onChangeText={(text) => {
            setSearchInputValue(text);
            getSuggestions(text);
          }}
          onSelectItem={(item) => {
            item && handleNavigation(item.id);
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
          onClear={onClearPress}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false}
          textInputProps={{
            autoFocus: props.focus,
            placeholder: props.placeholder,
            autoCorrect: false,
            autoCapitalize: "none",
            style: {
              borderRadius: 25,
              backgroundColor: "#383b42",
              color: "#fff",
              paddingLeft: 18,
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,
            alignSelf: "center",
          }}
          inputContainerStyle={{
            backgroundColor: "#383b42",
            borderRadius: 25,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: "#383b42",
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ padding: 15 }} info>
                {item.id}
              </Text>
              <Text style={{ padding: 15 }} white>
                {item.title}
              </Text>
            </View>
          )}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
        />
      </View>
    </>
  );
});
