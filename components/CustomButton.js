import React from "react";
import { HeaderButton, HeaderButtons } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";

export default function CustomButton(props) {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={24}
      color={Colors.PrimaryColor}
    ></HeaderButton>
  );
}
