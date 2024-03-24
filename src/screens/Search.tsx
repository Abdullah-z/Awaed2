import React, { memo, useCallback, useRef, useState } from "react";
import { Button, Dimensions, View, Platform } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useNavigation } from "@react-navigation/core";
import { useTheme } from "../hooks";
import { Text } from "../components";

export const Search = memo(() => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);
  const { sizes, colors, gradients, assets } = useTheme();
  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();

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
    setSuggestionsList(null);
  }, []);

  const handleNavigtioan = (symb) => {
    setSuggestionsList(null);
    navigation.navigate("DetailsPage", { symb: symb });
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
          ref={searchRef}
          controller={(controller) => {
            dropdownController.current = controller;
          }}
          // initialValue={'1'}
          direction={Platform.select({ ios: "down" })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={(item) => {
            item && handleNavigtioan(item.id);
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
          onClear={onClearPress}
          //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false} // set false to prevent rerender twice
          textInputProps={{
            placeholder: "Search Companies",
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
          //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
          //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
          //  showClear={false}
        />
      </View>
    </>
  );
});
