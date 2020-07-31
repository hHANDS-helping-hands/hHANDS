import React from "react";
import { Alert } from "react-native";

export default function NoInternetAlert(props) {
  Alert.alert(
    "No Internet",
    "Please check your internet connection",
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    {
      onDismiss: () => {
        console.log("dismissed");
      },
      cancelable: true,
    }
  );
}
