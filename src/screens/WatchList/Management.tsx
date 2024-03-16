import {View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Block, Text} from '../../components';
import {useTheme} from '../../hooks';
import CommonDataService from '../../services/common-data-service';
import {SERVICE_ROUTE} from '../../services/endpoints';
import {ScrollView} from 'react-native-gesture-handler';
import CountryFlag from 'react-native-country-flag';
import MapView from 'react-native-maps';

export default function Management(props) {
  const {sizes, colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const commonDataService = new CommonDataService();
  console.log('.....' + JSON.stringify(props));

  return (
    <ScrollView>
      <Block margin={sizes.s}>
        <Text h5>Leadership Team</Text>
        {props.info[0]?.KeyExecutives?.map((item) => {
          return (
            <Block card marginTop={sizes.s}>
              <Text bold>{item.Name}</Text>
              <Text gray>{item.Title}</Text>
            </Block>
          );
        })}
      </Block>
    </ScrollView>
  );
}
