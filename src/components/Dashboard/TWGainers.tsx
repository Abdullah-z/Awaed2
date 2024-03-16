import {View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Block from '../Block';
import {Button, ButtonText, Divider} from '@gluestack-ui/themed';
import Text from '../Text';
import {useTheme} from '../../hooks';
import {SERVICE_ROUTE} from '../../services/endpoints';
import CommonDataService from '../../services/common-data-service';
import {useNavigation} from '@react-navigation/core';

export default function TWGainers() {
  const {sizes, colors, gradients, assets} = useTheme();
  const [selected, setSelected] = useState(1);
  const [selTime, setSelTime] = useState(1);
  const commonDataService = new CommonDataService();
  const [loading, setLoading] = useState(false);
  const [topGainersData, setTopGainersData] = useState();
  const [topLosersData, setTopLosersData] = useState();

  const navigation = useNavigation();

  console.log('tld' + JSON.stringify(topLosersData));

  const GetGainers = async () => {
    console.log('get all gainers');
    setLoading(true);
    await commonDataService.fetchData(SERVICE_ROUTE.GET_ALL_GAINERS).then(
      async (res) => {
        setTopGainersData(res?.data?.value);
      },
      (error) => {
        setLoading(false);
        console.log('error' + error);
      },
    );
  };

  const GetLosers = async () => {
    setLoading(true);
    await commonDataService.fetchData(SERVICE_ROUTE.GET_ALL_LOSERS).then(
      async (res) => {
        setTopLosersData(res?.data?.value);
      },
      (error) => {
        setLoading(false);
        console.log('error' + error);
      },
    );
  };

  useEffect(() => {
    GetGainers();
    GetLosers();
  }, []);

  return (
    <>
      <Block row marginTop={sizes.sm}>
        <Button
          onPress={() => setSelected(1)}
          size="sm"
          variant="outline"
          action="secondary"
          isDisabled={false}>
          <ButtonText color={selected === 1 ? colors.white : colors.gray}>
            Top Gainers
          </ButtonText>
        </Button>
        <Button
          onPress={() => setSelected(2)}
          size="sm"
          variant="outline"
          action="secondary"
          isDisabled={false}>
          <ButtonText color={selected === 2 ? colors.white : colors.gray}>
            Top Losers
          </ButtonText>
        </Button>
      </Block>
      <Block style={{borderColor: colors.gray, borderWidth: 1}}>
        {/* <Block row marginTop={sizes.s} padding={sizes.s} justify="space-evenly">
          <Block
            paddingVertical={sizes.s}
            justify="center"
            align="center"
            color={selTime === 1 ? colors.card : ''}
            marginHorizontal={sizes.s}
            radius={5}>
            <Pressable onPress={() => setSelTime(1)}>
              <Text p>7D</Text>
            </Pressable>
          </Block>

          <Block
            paddingVertical={sizes.s}
            justify="center"
            align="center"
            radius={5}
            color={selTime === 2 ? colors.card : ''}
            marginHorizontal={sizes.xs}>
            <Pressable onPress={() => setSelTime(2)}>
              <Text p>1M</Text>
            </Pressable>
          </Block>

          <Block
            paddingVertical={sizes.s}
            justify="center"
            radius={5}
            align="center"
            color={selTime === 3 ? colors.card : ''}
            marginHorizontal={sizes.xs}>
            <Pressable onPress={() => setSelTime(3)}>
              <Text p>3M</Text>
            </Pressable>
          </Block>

          <Block
            paddingVertical={sizes.s}
            justify="center"
            radius={5}
            align="center"
            color={selTime === 4 ? colors.card : ''}
            marginHorizontal={sizes.xs}>
            <Pressable onPress={() => setSelTime(4)}>
              <Text p>1Y</Text>
            </Pressable>
          </Block>

          <Block
            paddingVertical={sizes.s}
            justify="center"
            radius={5}
            align="center"
            color={selTime === 5 ? colors.card : ''}
            marginHorizontal={sizes.xs}>
            <Pressable onPress={() => setSelTime(5)}>
              <Text p>3Y</Text>
            </Pressable>
          </Block>

          <Block
            paddingVertical={sizes.s}
            justify="center"
            radius={5}
            align="center"
            color={selTime === 6 ? colors.card : ''}
            marginHorizontal={sizes.xs}>
            <Pressable onPress={() => setSelTime(6)}>
              <Text p>5Y</Text>
            </Pressable>
          </Block>
        </Block> */}

        <Block>
          {selected === 1
            ? topGainersData?.map((item, index) => {
                return (
                  <Block>
                    {index != 0 ? (
                      <Block align="center">
                        <Divider
                          width={'90%'}
                          marginVertical={sizes.xs}
                          variant="horizontal"
                          sx={{
                            bg: colors.gray,
                          }}
                        />
                      </Block>
                    ) : (
                      <></>
                    )}

                    <Block row padding={sizes.s}>
                      <View style={{width: '70%', flexDirection: 'row'}}>
                        <Pressable
                          onPress={() =>
                            navigation.navigate('DetailsPage', {
                              symb: item.Symbol,
                            })
                          }>
                          <Text semibold info>
                            {item.Symbol}
                          </Text>
                        </Pressable>
                        <Text marginLeft={sizes.s} gray>
                          {item.Name}
                        </Text>
                      </View>
                      <View style={{width: '30%', alignItems: 'flex-end'}}>
                        <Text success>{item.ChangesPercentage}</Text>
                      </View>
                    </Block>
                  </Block>
                );
              })
            : topLosersData?.map((item, index) => {
                return (
                  <Block>
                    {index != 0 ? (
                      <Block align="center">
                        <Divider
                          width={'90%'}
                          marginVertical={sizes.xs}
                          variant="horizontal"
                          sx={{
                            bg: colors.gray,
                          }}
                        />
                      </Block>
                    ) : (
                      <></>
                    )}

                    <Block row padding={sizes.s}>
                      <View style={{width: '70%', flexDirection: 'row'}}>
                        <Pressable
                          onPress={() =>
                            navigation.navigate('DetailsPage', {
                              symb: item.Symbol,
                            })
                          }>
                          <Text semibold info>
                            {item.Symbol}
                          </Text>
                        </Pressable>
                        <Text marginLeft={sizes.s} gray>
                          {item.Name}
                        </Text>
                      </View>
                      <View style={{width: '30%', alignItems: 'flex-end'}}>
                        <Text danger>{item.ChangesPercentage}</Text>
                      </View>
                    </Block>
                  </Block>
                );
              })}
        </Block>
      </Block>
    </>
  );
}
