import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Dashboard from './Dashboard';
import {useTheme} from '../hooks';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  first: Dashboard,
  second: SecondRoute,
});

export default function Test() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const {colors} = useTheme();
  const [routes] = React.useState([
    {key: 'first', title: 'My Updates'},
    {key: 'second', title: 'Market Performance'},
  ]);
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: colors.info}}
          style={{backgroundColor: colors.background}}
        />
      )}
    />
  );
}
