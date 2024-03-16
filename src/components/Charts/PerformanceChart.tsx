import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Alert, Platform} from 'react-native';
import FusionCharts from 'react-native-fusioncharts';
import {useTheme} from '../../hooks';

export default function PerformanceChart() {
  const {colors, sizes} = useTheme();
  const module = ['powercharts'];

  const dataSource = {
    chart: {
      caption: "Nordstorm's Customer Satisfaction Score for 2017",
      lowerlimit: '0',
      upperlimit: '100',
      showvalue: '1',
      numbersuffix: '%',
      theme: 'candy',
      showtooltip: '0',
    },
    colorrange: {
      color: [
        {
          minvalue: '0',
          maxvalue: '50',
          code: '#F2726F',
        },
        {
          minvalue: '50',
          maxvalue: '75',
          code: '#FFC533',
        },
        {
          minvalue: '75',
          maxvalue: '100',
          code: '#62B58F',
        },
      ],
    },
    dials: {
      dial: [
        {
          value: '81',
        },
      ],
    },
  };
  const chartConfig = {
    type: 'angulargauge',

    width: '300',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Countries With Most Oil Reserves [2017-18]',
        subCaption: 'In MMbbl = One Million barrels',
        xAxisName: 'Country',
        yAxisName: 'Reserves (MMbbl)',
        numberSuffix: 'K',
        theme: 'fusion',
        bgColor: colors.background,
        exportEnabled: 1, // to enable the export chart functionality
      },
      data: dataSource,
    },
  };
  const events = {
    // Add your events method here:
    // Event name should be in small letters.
    dataplotclick: (e, a) => {
      Alert.alert(`You clicked on ${e.data.categoryLabel}`);
    },
  };
  return (
    <View style={{backgroundColor: colors.background}}>
      <FusionCharts
        chartConfig={chartConfig}
        events={events}
        modules={module}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   const {colors, sizes} = useTheme();
//   container: {
//     flex: 1,
//     backgroundColor: {colors.background} ,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 50,
//   },
// });
