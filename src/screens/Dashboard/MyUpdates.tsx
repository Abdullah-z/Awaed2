import {View, useWindowDimensions} from 'react-native';
import React from 'react';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonIcon,
  ButtonText,
  Divider,
  FavouriteIcon,
  StarIcon,
} from '@gluestack-ui/themed';
import {useData, useTheme} from '../../hooks';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Block, Image, Text} from '../../components';

export default function MyUpdates() {
  const {isDark} = useData();
  const {sizes, colors, gradients, assets} = useTheme();
  console.log(isDark);
  const {handleIsDark} = useData();

  return (
    <ScrollView>
      <Block marginHorizontal={sizes.xs} marginTop={sizes.s}>
        <Block
          style={{borderColor: colors.gray, borderWidth: 1, borderRadius: 10}}
          width={'50%'}
          padding={sizes.s}>
          <Text h5>PK Market</Text>
          <Block row marginTop={sizes.sm}>
            <Block>
              <Text gray>7D</Text>
              <Text success>2.2%</Text>
            </Block>
            <Block>
              <Text gray>1Y</Text>
              <Text success>3.5%</Text>
            </Block>
          </Block>
        </Block>
      </Block>
      <Block tertiary padding={sizes.s} marginTop={sizes.s}>
        <Text marginVertical={sizes.s} h5>
          Market Insights
        </Text>
        <Block card padding={0}>
          <Image background resizeMode="cover" source={assets.card5}>
            <Block color="rgba(0,0,0,0.3)" padding={sizes.padding}>
              <Text p semibold white marginBottom={sizes.sm}>
                Flexible office space means growth.
              </Text>

              {/* user details */}
              <Block row marginLeft={sizes.xs} marginTop={sizes.xxl}>
                <Image
                  source={assets.avatar2}
                  style={{
                    width: sizes.xl,
                    height: sizes.xl,
                    borderRadius: sizes.s,
                  }}
                />
                <Block marginLeft={sizes.s}>
                  <Text white semibold>
                    Devin Coldewey
                  </Text>
                  <Text gray>2 November</Text>
                </Block>
              </Block>
            </Block>
          </Image>

          <Block paddingHorizontal={sizes.s} marginBottom={sizes.s}>
            <Text
              marginTop={sizes.s}
              marginLeft={sizes.xs}
              marginBottom={sizes.sm}>
              Rather than worrying about switching offices every couple years,
              you can instead stay in the same location.
            </Text>
            <Text semibold color={colors.info}>
              Continue Reading
            </Text>
          </Block>
          {/* user details */}
        </Block>
        <Block card row marginTop={sizes.s}>
          <Image
            resizeMode="contain"
            source={assets?.photo2}
            style={{height: 114}}
          />
          <Block padding={sizes.s} justify="space-between">
            <Text gray>Last Week</Text>
            <Text semibold>
              Adventures - Multi day trips with meals and stays.
            </Text>
          </Block>
        </Block>
        <Block row align="center" justify="flex-end" marginBottom={sizes.sm}>
          <Text semibold marginRight={sizes.s} color={colors.info}>
            More Market Insights
          </Text>
          <Image source={assets.arrow} color={colors.info} />
        </Block>
      </Block>
      <Block
        padding={sizes.s}
        tertiary
        marginTop={sizes.s}
        marginBottom={sizes.s}>
        <Block>
          <Block row>
            <Text p info>
              MSFT
            </Text>
            <Text p marginLeft={sizes.s}>
              US$456.85
            </Text>
          </Block>
          <Text gray>Microsoft</Text>
          <Block row marginTop={sizes.sm}>
            <Block row>
              <Text gray>7D</Text>
              <Text marginLeft={sizes.s} success>
                2.2%
              </Text>

              <Text marginLeft={sizes.sm} gray>
                1Y
              </Text>
              <Text success marginLeft={sizes.s}>
                3.5%
              </Text>
            </Block>
          </Block>
          <Divider
            marginVertical={sizes.s}
            variant="horizontal"
            sx={{
              bg: colors.gray,
            }}
          />
        </Block>

        <Block marginTop={sizes.s}>
          <Block row align="center">
            <View
              style={{width: '10%', marginTop: sizes.s, alignItems: 'center'}}>
              <Ionicons
                name="megaphone-outline"
                size={20}
                color={colors.icon}
                style={{
                  backgroundColor: colors.card,
                  padding: sizes.s,
                  borderRadius: 100,
                }}
              />
            </View>
            <View
              style={{
                width: '90%',
                marginLeft: sizes.s,
              }}>
              <Text>
                Microsoft Corporation announes quarterly dividend, payable on
                March 20,2025
              </Text>
            </View>
          </Block>
          <Block row>
            <View style={{width: '10%'}}></View>
            <View style={{width: '90%', marginLeft: sizes.s}}>
              <Text gray>25 Nov</Text>
            </View>
          </Block>
        </Block>
        <Block marginTop={sizes.s}>
          <Block row align="center">
            <View
              style={{width: '10%', marginTop: sizes.s, alignItems: 'center'}}>
              <Ionicons
                name="newspaper-outline"
                size={20}
                color={colors.icon}
                style={{
                  backgroundColor: colors.card,
                  padding: sizes.s,
                  borderRadius: 100,
                }}
              />
            </View>
            <View
              style={{
                width: '90%',
                marginLeft: sizes.s,
              }}>
              <Text>
                What is Microsoft Corporation's (NASDARQ:MSFT) Share Price
                Doing?
              </Text>
            </View>
          </Block>
          <Block row>
            <View style={{width: '10%'}}></View>
            <View style={{width: '90%', marginLeft: sizes.s}}>
              <Text gray>22 Nov</Text>
            </View>
          </Block>
        </Block>
        <Block marginTop={sizes.s}>
          <Block row align="center">
            <View
              style={{width: '10%', marginTop: sizes.s, alignItems: 'center'}}>
              <Avatar size="sm">
                <AvatarFallbackText>SS</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                  }}
                />
              </Avatar>
            </View>
            <View
              style={{
                width: '90%',
                marginLeft: sizes.s,
              }}>
              <Text>Narative update form Bailey</Text>
            </View>
          </Block>
          <Block row>
            <View style={{width: '10%'}}></View>
            <View style={{width: '90%', marginLeft: sizes.s}}>
              <Text gray>25 Nov</Text>
              <Text gray>
                After days of back and forth, Altman and OpenAI have reached an
                agreement in principle...
              </Text>
            </View>
          </Block>
        </Block>
      </Block>
      <Block tertiary padding={sizes.s} marginBottom={sizes.s}>
        <Text p>Follow your favorite stocks</Text>
        <Block marginTop={sizes.sm}>
          <Block>
            <Divider
              marginVertical={sizes.xs}
              variant="horizontal"
              sx={{
                bg: colors.gray,
              }}
            />
            <Block row align="center">
              <Block>
                <Text info>PPL</Text>
                <Text gray>Pakistan Petroleum</Text>
              </Block>
              <Block align="flex-end">
                <Button
                  width={'75%'}
                  size="xs"
                  variant="outline"
                  action="secondary"
                  isDisabled={false}
                  isFocusVisible={false}>
                  <ButtonIcon
                    as={StarIcon}
                    marginRight={sizes.s}
                    color={colors.icon}
                  />
                  <ButtonText color={colors.text}>Add to WatchList </ButtonText>
                </Button>
              </Block>
            </Block>
          </Block>
          <Block>
            <Divider
              marginVertical={sizes.xs}
              variant="horizontal"
              sx={{
                bg: colors.gray,
              }}
            />
            <Block row align="center">
              <Block>
                <Text info>MEBL</Text>
                <Text gray>Meezan Bank</Text>
              </Block>
              <Block align="flex-end">
                <Button
                  width={'75%'}
                  size="xs"
                  variant="outline"
                  action="secondary"
                  isDisabled={false}
                  isFocusVisible={false}>
                  <ButtonIcon
                    as={StarIcon}
                    color={colors.icon}
                    marginRight={sizes.s}
                  />
                  <ButtonText color={colors.text}>Add to WatchList </ButtonText>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
}
