import { View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Pressable } from "react-native";
import { useTheme } from "../hooks";
import Block from "./Block";
import Text from "./Text";
import { Image } from "react-native";
import { ModalBackdrop } from "@gluestack-ui/themed";
import { ModalCloseButton } from "@gluestack-ui/themed";
import { CloseIcon } from "@gluestack-ui/themed";
import { ModalBody } from "@gluestack-ui/themed";
import { ModalFooter } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import * as Linking from "expo-linking";
import {
  AddIcon,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonIcon,
  ButtonText,
  Divider,
  Heading,
  Modal,
  ModalContent,
  ModalHeader,
} from "@gluestack-ui/themed";

export default function News(props) {
  const { colors, sizes } = useTheme();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const ref = React.useRef(null);
  const [modalData, setModalData] = useState();
  const ModalDate = new Date(modalData?.publishedDate);
  // Format the date as "Month Day" (e.g., "Oct 23")
  const formattedModalDate = ModalDate?.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  console.log("NEWS2", props?.news);

  return (
    <ScrollView>
      {props?.news?.slice(0, 5).map((item) => {
        // Convert the string date to a Date object
        const publishedDate = new Date(item.publishedDate);
        // Format the date as "Month Day" (e.g., "Oct 23")
        const formattedDate = publishedDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        return (
          <Pressable
            onPress={() => {
              setModalData(item);
              setShowModal2(true);
            }}
          >
            <Block marginTop={sizes.s} key={item.id}>
              <Block row align="center">
                <View
                  style={{
                    width: "10%",
                    marginTop: sizes.s,
                    alignItems: "center",
                    marginLeft: sizes.s,
                  }}
                >
                  {/* <Ionicons
                        name="newspaper-outline"
                        size={20}
                        color={colors.icon}
                        style={{
                          backgroundColor: colors.card,
                          padding: sizes.s,
                          borderRadius: 100,
                        }}
                      /> */}
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                </View>
                <View
                  style={{
                    width: "90%",
                    marginLeft: sizes.sm,
                  }}
                >
                  <Text>{item.title}</Text>
                </View>
              </Block>
              <Block row>
                <View style={{ width: "10%" }}></View>
                <View style={{ width: "90%", marginLeft: sizes.sm }}>
                  {/* Render the formatted date */}
                  <Text gray>{formattedDate}</Text>
                </View>
              </Block>
            </Block>
          </Pressable>
        );
      })}

      <Button
        marginVertical={sizes.s}
        variant="solid"
        bg="#1D2A40"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        onPress={() => setShowModal(true)}
        ref={ref}
      >
        <ButtonText color="#2394DF">See more updates</ButtonText>
      </Button>
      <Modal
        size={"full"}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader bgColor={colors.card}>
            <Heading size="lg" color={colors.text}>
              News & Updates
            </Heading>
            <ModalCloseButton>
              <Icon color={colors.text} as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody bgColor={colors.card} height={"70%"} scrollEnabled={true}>
            {props.news?.map((item) => {
              // Convert the string date to a Date object
              const publishedDate = new Date(item.publishedDate);
              // Format the date as "Month Day" (e.g., "Oct 23")
              const formattedDate = publishedDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });

              return (
                <Pressable
                  onPress={() => {
                    setModalData(item);
                    setShowModal2(true);
                  }}
                >
                  <Block marginTop={sizes.s} key={item.id}>
                    <Block row align="center">
                      <View
                        style={{
                          width: "10%",
                          marginTop: sizes.s,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "90%",
                          marginLeft: sizes.sm,
                        }}
                      >
                        <Text color={colors.text}>{item.title}</Text>
                      </View>
                    </Block>
                    <Block row>
                      <View style={{ width: "10%" }}></View>
                      <View style={{ width: "90%", marginLeft: sizes.sm }}>
                        <Text gray>{formattedDate}</Text>
                      </View>
                    </Block>
                  </Block>
                </Pressable>
              );
            })}
          </ModalBody>
          <ModalFooter bgColor={colors.card}>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText color={colors.text}>Close</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        size={"full"}
        isOpen={showModal2}
        onClose={() => {
          setShowModal2(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader bgColor={colors.card}>
            <Heading size="lg" color={colors.text}>
              {/* {props.info[0]?.Name} */}
            </Heading>
            <ModalCloseButton>
              <Icon color={colors.text} as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody bgColor={colors.card} height={"70%"} scrollEnabled={true}>
            <Text gray>
              {formattedModalDate} | {modalData?.site}
            </Text>
            <Text marginTop={sizes.s} h5 bold color={colors.text}>
              {modalData?.title}
            </Text>
            <Image
              style={{ marginVertical: sizes.sm }}
              source={{ uri: modalData?.image }}
              width={"100%"}
              height={300}
            ></Image>
            <Text color={colors.text}>{modalData?.text}</Text>
            <Pressable onPress={() => Linking.openURL(modalData?.url)}>
              <Text marginTop={sizes.sm} color={colors.info}>
                Read Full Article
              </Text>
            </Pressable>
          </ModalBody>
          <ModalFooter bgColor={colors.card}>
            <Button
              variant="outline"
              size="sm"
              action="primary"
              mr="$3"
              onPress={() => {
                setShowModal2(false);
              }}
            >
              <ButtonText color={colors.text}>Close</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScrollView>
  );
}
