import {View, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks';
import {Block, Text} from '../../components';
import {Badge, BadgeIcon, BadgeText} from '@gluestack-ui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Ownership() {
  const {colors, sizes} = useTheme();
  return (
    <ScrollView>
      <Block tertiary padding={sizes.sm} radius={sizes.sm}>
        <Text h4 white>
          Ownership
        </Text>
        <Text>
          Who are the major shareholders and have insiders been buying or
          selling?
        </Text>

        <Block marginVertical={sizes.sm}>
          <Text white h5>
            Recent Insider Transactions
          </Text>
          <Block marginTop={sizes.s}>
            <Block card marginVertical={sizes.xs}>
              <Block row>
                <Block row>
                  <Badge
                    backgroundColor={colors.tertiary}
                    size="md"
                    variant="outline"
                    borderRadius="$none"
                    action="warning">
                    <BadgeText>Sell</BadgeText>
                  </Badge>

                  <Text white marginLeft={sizes.s}>
                    US$18,094,000
                  </Text>
                </Block>
                <Block align="flex-end">
                  <Text>29 Feb 24</Text>
                </Block>
              </Block>
              <Block row marginTop={sizes.s}>
                <Block row>
                  <Text white bold marginLeft={sizes.s}>
                    Arthur Levinson
                  </Text>
                </Block>
                <Block align="flex-end">
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.gray}
                    style={{
                      backgroundColor: colors.card,
                      padding: sizes.s,
                      borderRadius: 100,
                    }}
                  />
                </Block>
              </Block>
            </Block>
            <Block card marginVertical={sizes.xs}>
              <Block row>
                <Block row>
                  <Badge
                    backgroundColor={colors.tertiary}
                    size="md"
                    variant="outline"
                    borderRadius="$none"
                    action="warning">
                    <BadgeText>Sell</BadgeText>
                  </Badge>

                  <Text white marginLeft={sizes.s}>
                    US$18,094,000
                  </Text>
                </Block>
                <Block align="flex-end">
                  <Text>29 Feb 24</Text>
                </Block>
              </Block>
              <Block row marginTop={sizes.s}>
                <Block row>
                  <Text white bold marginLeft={sizes.s}>
                    Chris Kondo
                  </Text>
                </Block>
                <Block align="flex-end">
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.gray}
                    style={{
                      backgroundColor: colors.card,
                      padding: sizes.s,
                      borderRadius: 100,
                    }}
                  />
                </Block>
              </Block>
            </Block>
          </Block>

          <Block>
            <Text h5 gray>
              Insider Trading Volume
            </Text>

            <Text>------CHART HERE------</Text>

            <Block>
              <Block row>
                <Ionicons
                  name="close-circle-outline"
                  size={20}
                  color={colors.danger}
                  style={{
                    borderRadius: 100,
                  }}
                />
                <Text danger>
                  Insider Buying:{' '}
                  <Text>
                    AAPL insiders have only sold shares in the past 3 months.
                  </Text>
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>

        <Block>
          <Text white h5>
            Ownership Breakdown
          </Text>
          <Block>
            <Text>------CHART HERE------</Text>

            <Block>
              <Block row>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={colors.success}
                  style={{
                    borderRadius: 100,
                  }}
                />
                <Text success>
                  Dilution of Shares:{' '}
                  <Text>
                    Shareholders have not been meaningfully diluted in the past
                    year.
                  </Text>
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>

        <Block marginTop={sizes.sm}>
          <Text marginVertical={sizes.xs} h5 white>
            Top Shareholders
          </Text>
          <Text>Top 25 shareholders own 40.85% of the company</Text>

          <Block marginTop={sizes.s}>
            <Block row card marginVertical={sizes.xs}>
              <Block justify="center">
                <Text>The Vanguard, Inc</Text>
              </Block>
              <Block row justify="flex-end" align="center">
                <Text>8.54%</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.gray}
                  style={{
                    backgroundColor: colors.card,
                    padding: sizes.s,
                    borderRadius: 100,
                  }}
                />
              </Block>
            </Block>
            <Block row card marginVertical={sizes.xs}>
              <Block justify="center">
                <Text>BlackRock, Inc</Text>
              </Block>
              <Block row justify="flex-end" align="center">
                <Text>8.54%</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.gray}
                  style={{
                    backgroundColor: colors.card,
                    padding: sizes.s,
                    borderRadius: 100,
                  }}
                />
              </Block>
            </Block>
            <Block row card marginVertical={sizes.xs}>
              <Block justify="center">
                <Text>Berkshire Hathaway Inc.</Text>
              </Block>
              <Block row justify="flex-end" align="center">
                <Text>8.54%</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.gray}
                  style={{
                    backgroundColor: colors.card,
                    padding: sizes.s,
                    borderRadius: 100,
                  }}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
}
