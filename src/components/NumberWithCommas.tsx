import { View, Text } from "react-native";
import React from "react";

const NumberWithCommas = (x, decimals) => {
  if (x || x === 0) {
    let _d = decimals ? decimals : 2;
    if (x >= 0) {
      let val = parseFloat(parseFloat(x.toString()).toFixed(_d))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      let values = val.split(".");
      if (values.length === 2) {
        return `${values[0]}.${values[1].replace(",", "").padEnd(2, "0")}`;
      } else {
        return `${values[0]}.00`;
      }
    } else {
      let val = `-${parseFloat((-1 * parseFloat(x.toString())).toFixed(_d))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      let values = val.split(".");
      if (values.length === 2) {
        return `${values[0]}.${values[1].replace(",", "").padEnd(2, "0")}`;
      } else {
        return `${values[0]}.00`;
      }
    }
  } else {
    return "-";
  }
};

export default NumberWithCommas;
