import React from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
import { useTheme } from "../../hooks";

const TreeMap = () => {
  const { colors, sizes } = useTheme();
  const chartConfig = {
    type: "treemap",
    width: "100%",
    height: 600,

    dataFormat: "json",
    dataSource: {
      data: [
        {
          label: "Top Selling Brands",
          value: "5800",
          data: [
            {
              label: "Samsung",
              value: "2217",
              data: [
                {
                  label: "Galaxy Note 4",
                  value: "519",
                  svalue: "1.09",
                },
                {
                  label: "Galaxy S6 Edge",
                  value: "448",
                  svalue: "1.48",
                },
                {
                  label: "Galaxy S6",
                  value: "416",
                  svalue: "1.13",
                },
                {
                  label: "Galaxy J1",
                  value: "304",
                  svalue: "1.18",
                },
                {
                  label: "Galaxy J7",
                  value: "159",
                  svalue: "1.36",
                },
                {
                  label: "Galaxy Note5",
                  value: "191",
                  svalue: "1.48",
                },
                {
                  label: "galaxy A8",
                  value: "180",
                  svalue: "1.19",
                },
              ],
            },
            {
              label: "Apple",
              value: "1283",
              data: [
                {
                  label: "iPhone 6",
                  value: "340",
                  svalue: "1.08",
                },
                {
                  label: "iPhone 6s plus",
                  value: "296",
                  svalue: "1.14",
                },
                {
                  label: "iPhone 6s",
                  value: "227",
                  svalue: "1.12",
                },
                {
                  label: "iPhone 5s",
                  value: "174",
                  svalue: "1.18",
                },
                {
                  label: "iPhone 5c",
                  value: "96",
                  svalue: "1.18",
                },
                {
                  label: "iPhone 4s",
                  value: "150",
                  svalue: "1.11",
                },
              ],
            },
            {
              label: "Nokia",
              value: "759",
              data: [
                {
                  label: "Lumia 630",
                  value: "101",
                  svalue: "1.13",
                },
                {
                  label: "lumia 810",
                  value: "98",
                  svalue: "0.85",
                },
                {
                  label: "lumia 930",
                  value: "105",
                  svalue: "0.56",
                },
                {
                  label: "lumia 950 XL dual sim",
                  value: "85",
                  svalue: "0.75",
                },
                {
                  label: "lumia 735",
                  value: "64",
                  svalue: "0.78",
                },
                {
                  label: "lumia 830",
                  value: "66",
                  svalue: "0.83",
                },
                {
                  label: "lumia 1320 LTE",
                  value: "133",
                  svalue: "0.29",
                },
                {
                  label: "lumia 1320",
                  value: "107",
                  svalue: "0.29",
                },
              ],
            },
            {
              label: "LG",
              value: "441",
              data: [
                {
                  label: "G4",
                  value: "189",
                  svalue: "0.51",
                },
                {
                  label: "L70 Dual",
                  value: "122",
                  svalue: "0.52",
                },
                {
                  label: "G FLEX 2",
                  value: "77",
                  svalue: "0.64",
                },
                {
                  label: "G3 S",
                  value: "53",
                  svalue: "0.64",
                },
              ],
            },
            {
              label: "Huawei",
              value: "411",
              data: [
                {
                  label: "Y3 U03",
                  value: "136",
                  svalue: "1.40",
                },
                {
                  label: "G8",
                  value: "78",
                  svalue: "0.87",
                },
                {
                  label: "Y520",
                  value: "67",
                  svalue: "1.35",
                },
                {
                  label: "ascend p7",
                  value: "48",
                  svalue: "0.97",
                },
                {
                  label: "G7 plus",
                  value: "27",
                  svalue: "0.87",
                },
                {
                  label: "P8",
                  value: "55",
                  svalue: "1.23",
                },
              ],
            },
            {
              label: "Lenovo",
              value: "489",
              data: [
                {
                  label: "A5000",
                  value: "47",
                  svalue: "0.69",
                },
                {
                  label: "vibe P780",
                  value: "37",
                  svalue: "0.69",
                },
                {
                  label: "K4 Note",
                  value: "156",
                  svalue: "0.69",
                },
                {
                  label: "A7010",
                  value: "89",
                  svalue: "0.71",
                },
                {
                  label: "Vibe P1 Mini",
                  value: "110",
                  svalue: "0.67",
                },
                {
                  label: "Vibe x3 Lite",
                  value: "50",
                  svalue: "0.77",
                },
              ],
            },
            {
              label: "Sony",
              value: "200",
              data: [
                {
                  label: "Xperia Z3",
                  value: "38",
                  svalue: "1.5",
                },
                {
                  label: "Xperia Z3+",
                  value: "25",
                  svalue: "1.38",
                },
                {
                  label: "Xperia Z5",
                  value: "67",
                  svalue: "0.64",
                },
                {
                  label: "Xperia X3 Dual",
                  value: "46",
                  svalue: "0.73",
                },
                {
                  label: "Xperia E4",
                  value: "24",
                  svalue: "0.77",
                },
              ],
            },
          ],
        },
      ],
      colorrange: {
        mapbypercent: "0",
        gradient: "1",
        minvalue: "0",
        code: "#62B58F",
        startlabel: "Ideal",
        endlabel: "Threshold",
        color: [
          {
            code: "#FFC533",
            maxvalue: "0.8",
          },
          {
            code: "#F2726F",
            maxvalue: "1.6",
            label: "Threshold",
          },
        ],
      },
      chart: {
        algorithm: "squarified",
        caption: "Mobile Sales Analysis for Last Quarter",
        subcaption: "Brand Smart<br>Based on SAR values",
        theme: "candy",
        legendcaption: "Specific Absorption Rate (SAR) in W/kg",
        plottooltext:
          "<b>$label</b><br>SAR (Body): <b>$sValue W/kg</b><br>Units Sold: <b>$dataValue</b>",
      },
    },
  };

  const modules = ["powercharts"]; // module names goes here

  return (
    <ReactNativeFusionCharts chartConfig={chartConfig} modules={modules} />
  );
};

export default TreeMap;
