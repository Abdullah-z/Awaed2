import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import {
  StackHeaderTitleProps,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { DrawerActions } from "@react-navigation/native";
import { StackHeaderOptions } from "@react-navigation/stack/lib/typescript/src/types";

import { useData } from "./useData";
import { useTranslation } from "./useTranslation";

import Image from "../components/Image";
import Text from "../components/Text";
import useTheme from "../hooks/useTheme";
import Button from "../components/Button";
import Block from "../components/Block";
import { Test } from "../screens/Search";
import { Avatar, AvatarFallbackText } from "@gluestack-ui/themed";
import { Pressable } from "react-native";

export default () => {
  const { t } = useTranslation();
  const { user } = useData();
  const navigation = useNavigation();
  const { icons, colors, gradients, sizes } = useTheme();
  const { locale, setLocale } = useTranslation();
  console.log("loacle:", locale);

  const menu = {
    headerStyle: { elevation: 0, backgroundColor: colors.background },

    headerTitleAlign: "left",
    headerTitleContainerStyle: { marginLeft: 0 },
    headerLeftContainerStyle: { paddingLeft: 0 },
    headerRightContainerStyle: { paddingRight: 0 },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({ children }: StackHeaderTitleProps) => (
      <></>
      // <View
      //   style={{
      //     minWidth: "90%",
      //     marginBottom: sizes.l,
      //     flex: 1,
      //   }}
      // >
      //   <Test />
      // </View>
    ),
    // headerLeft: () => (
    //   <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
    //     <Image source={icons.menu} radius={0} color={colors.icon} />
    //   </Button>
    // ),
    headerRight: () => (
      <Block row flex={0} align="center" marginRight={sizes.padding}>
        <Pressable
          onPress={() => (locale === "ar" ? setLocale("en") : setLocale("ar"))}
        >
          <Text marginRight={sizes.sm} white>
            {locale === "ar" ? "English" : "Arabic"}
          </Text>
        </Pressable>
        <TouchableOpacity style={{ marginRight: sizes.sm }}>
          <Avatar bgColor="$amber600" size="md" borderRadius="$full">
            <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
          </Avatar>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate("Screens", {
              screen: "Pro",
            })
          }
        >
          <Image source={icons.basket} radius={0} color={colors.icon} />
          <Block
            flex={0}
            padding={0}
            justify="center"
            position="absolute"
            top={-sizes.s}
            right={-sizes.s}
            width={sizes.sm}
            height={sizes.sm}
            radius={sizes.sm / 2}
            gradient={gradients?.primary}
          >
            <Text white center bold size={10} lineHeight={10} paddingTop={3}>
              3
            </Text>
          </Block>
        </TouchableOpacity> */}
      </Block>
    ),
  } as StackHeaderOptions;

  const options = {
    stack: menu,
    components: {
      ...menu,
      headerTitle: () => (
        <Text p white>
          {t("navigation.components")}
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    pro: {
      ...menu,
      headerTransparent: true,
      headerTitle: () => (
        <Text p white semibold>
          {t("pro.title")}
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    back: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()}>
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.icon}
            source={icons.arrow}
            transform={[{ rotate: "180deg" }]}
          />
        </Button>
      ),
    },
    profile: {
      ...menu,
      headerRight: () => (
        <Block row flex={0} align="center" marginRight={sizes.padding}>
          <TouchableOpacity style={{ marginRight: sizes.sm }}>
            <Avatar bgColor="$amber600" size="md" borderRadius="$full">
              <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
            </Avatar>
          </TouchableOpacity>
        </Block>
      ),
    },
  };

  return options;
};
