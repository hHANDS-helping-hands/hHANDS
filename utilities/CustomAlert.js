import React from "react";
import { Alert } from "react-native";

export default function CustomAlert(title, message) {
  Alert.alert(
    title,
    message,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    {
      onDismiss: () => {
        console.log("dismissed");
      },
      cancelable: true,
    }
  );
}

export function CustomCancelAlert(title, message, action, ...args) {
  Alert.alert(
    title,
    message,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          var arg1, arg2;
          [arg1, arg2] = args;
          action(...args);
        },
      },
    ],
    {
      onDismiss: () => {
        console.log("dismissed");
      },
      cancelable: true,
    }
  );
}
