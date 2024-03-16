import {View} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Block, Text} from '../../components';
import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronDownIcon,
  Divider,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
} from '@gluestack-ui/themed';
import {SelectTrigger} from '@gluestack-ui/themed';
import {useTheme} from '../../hooks';
import TWGainers from '../../components/Dashboard/TWGainers';
import TWIndustries from '../../components/Dashboard/TWIndustries';
import TWInternational from '../../components/Dashboard/TWInternational';
import MostActives from '../../components/Dashboard/MostActives';

export default function MarketPerformance() {
  const {sizes, colors, gradients, assets} = useTheme();

  return (
    <ScrollView>
      <Block margin={sizes.sm}>
        <Select>
          <SelectTrigger variant="outline" size="md">
            <SelectInput
              color={colors.text}
              placeholderTextColor={colors.text}
              placeholder="Select Country"
              defaultValue="1"
            />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="USA" value="1" />
              <SelectItem label="UK" value="2" />
              <SelectItem label="Pakistan" value="3" />
              <SelectItem label="Saudi Arabia" value="ui" isDisabled={true} />
              <SelectItem label="Japan" value="4" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <TWGainers />
        <MostActives />
        {/* <TWIndustries />
        <TWInternational /> */}
      </Block>
    </ScrollView>
  );
}
