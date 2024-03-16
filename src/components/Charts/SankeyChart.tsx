// SankeyChart.js
import React from 'react';
import FusionCharts from 'react-native-fusioncharts';

const SankeyChart = () => {
  const chartConfig = {
    type: 'sankey',
    width: '100%',
    height: '100%',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Fusion Powerchart Sankey Diagram',
      },
      link: {
        data: [
          {from: 'Source', to: 'Target', value: 50},
          {from: 'AnotherSource', to: 'Target', value: 30},
        ],
      },
    },
  };

  return <FusionCharts {...chartConfig} />;
};

export default SankeyChart;
