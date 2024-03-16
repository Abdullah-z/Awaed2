import {View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Block, Text} from '../../components';
import {useTheme} from '../../hooks';
import CommonDataService from '../../services/common-data-service';
import {SERVICE_ROUTE} from '../../services/endpoints';
import {ScrollView} from 'react-native-gesture-handler';
import CountryFlag from 'react-native-country-flag';
import MapView from 'react-native-maps';

export default function Information(props) {
  const {sizes, colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const commonDataService = new CommonDataService();

  return (
    <ScrollView>
      <Block margin={sizes.s}>
        <Text h5>Key Information</Text>
        <Block card marginTop={sizes.s}>
          <Block row align="center" marginBottom={sizes.s}>
            <Image
              style={{width: 80, height: 80}}
              source={{
                uri: props.info[0]?.Profile?.Image,
              }}
            />
          </Block>

          <Block>
            <View style={{width: '100%'}}>
              <Block row>
                <Text>Name:</Text>
                <Text marginLeft={sizes.s} bold>
                  {props.info[0]?.Name}
                </Text>
              </Block>
              <Block row>
                <Text>Ticker:</Text>
                <Text marginLeft={sizes.s} bold>
                  {props.info[0]?.Code}
                </Text>
              </Block>
              <Block row>
                <Text>Exchange:</Text>
                <Text marginLeft={sizes.s} bold>
                  {props.info[0]?.ExchangeShortName}
                </Text>
              </Block>
              <Block row>
                <Text>Founded:</Text>
              </Block>
              <Block row>
                <Text>Industry:</Text>
                <Text marginLeft={sizes.s} bold>
                  {props.info[0]?.Profile?.Industry}
                </Text>
              </Block>
              <Block row>
                <Text>Sector:</Text>
                <Text marginLeft={sizes.s} bold>
                  {props.info[0]?.Profile?.Sector}
                </Text>
              </Block>
              <Block row>
                <Text>Implied Market Cap:</Text>
                <Text marginLeft={sizes.s} bold></Text>
              </Block>
              <Block row>
                <Text>Shares outstanding:</Text>
              </Block>
              <Block row>
                <Text>No of Employees:</Text>
                <Text marginLeft={sizes.s} bold>
                  {props.info[0]?.Profile?.FullTimeEmployees}
                </Text>
              </Block>
              <Block row>
                <Text>Website:</Text>
                <Text marginLeft={sizes.s} bold info>
                  {props.info[0]?.Profile?.Website}
                </Text>
              </Block>
            </View>
          </Block>
        </Block>
        <Text marginTop={sizes.s} h5>
          Location
        </Text>
        <Block card marginTop={sizes.s}>
          <Block row>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: '20%'}}>
                {props.info[0]?.Profile?.Country ? (
                  <CountryFlag
                    isoCode={props.info[0]?.Profile?.Country}
                    size={50}
                  />
                ) : (
                  <></>
                )}
              </View>
              <View style={{marginLeft: sizes.sm, width: '80%'}}>
                <Block row>
                  <Text>Address:</Text>
                  <Text bold marginLeft={sizes.s}>
                    {props.info[0]?.Profile?.Address}
                  </Text>
                </Block>
                <Block row>
                  <Text>City:</Text>
                  <Text bold marginLeft={sizes.s}>
                    {props.info[0]?.Profile?.City}
                  </Text>
                </Block>
                <Block row>
                  <Text>State:</Text>
                  <Text bold marginLeft={sizes.s}>
                    {props.info[0]?.Profile?.State}
                  </Text>
                </Block>
              </View>
            </View>
          </Block>
          <MapView
            style={{width: '100%', height: 200, marginTop: sizes.s}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </Block>
      </Block>
    </ScrollView>
  );
}
