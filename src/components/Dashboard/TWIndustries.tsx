import {View, Pressable} from 'react-native';
import React, {useState} from 'react';
import Block from '../Block';
import {Button, ButtonText, Divider} from '@gluestack-ui/themed';
import Text from '../Text';
import {useTheme} from '../../hooks';

export default function TWIndustries() {
  const {sizes, colors, gradients, assets} = useTheme();
  const [selected, setSelected] = useState(1);
  const [selTime, setSelTime] = useState(1);
  return (
    <>
      <Block row marginTop={sizes.sm}>
        <Button
          onPress={() => setSelected(1)}
          size="sm"
          variant="outline"
          action="secondary"
          isPressed={selected === 1}
          isDisabled={false}
          isFocusVisible={false}>
          <ButtonText color={colors.text}>Top Industries</ButtonText>
        </Button>
        <Button
          onPress={() => setSelected(2)}
          size="sm"
          variant="outline"
          action="secondary"
          isPressed={selected === 2}
          isDisabled={false}
          isFocusVisible={false}>
          <ButtonText color={colors.text}>Worst Industries</ButtonText>
        </Button>
      </Block>
      <Block style={{borderColor: colors.gray, borderWidth: 1}}>
        <Block row marginTop={sizes.s} padding={sizes.s} justify="space-evenly">
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
        </Block>

        <Block>
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
          <Block row padding={sizes.s}>
            <Block row>
              <Text>Banks</Text>
            </Block>
            <Block align="flex-end">
              <Text success>17.2%</Text>
            </Block>
          </Block>
        </Block>
        <Block>
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
          <Block row padding={sizes.s}>
            <Block row>
              <Text>Pharmaceuticals</Text>
            </Block>
            <Block align="flex-end">
              <Text success>15.3%</Text>
            </Block>
          </Block>
        </Block>
        <Block>
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
          <Block row padding={sizes.s}>
            <Block row>
              <Text>Luxury</Text>
            </Block>
            <Block align="flex-end">
              <Text success>10.4%</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </>
  );
}
