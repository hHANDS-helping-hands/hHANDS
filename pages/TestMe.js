import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator
} from "react-native";
import Color from "../constants/colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default function DoneeDetailsPage(props) {
  return (
    <View style={styles.container}>
      <View style={styles.box3}>
        <Text>I am common sibling</Text>
      </View>
      <View style={styles.box1}>
        <Text>I am common sibling</Text>
        <View style={styles.box2}>
          <Text>I am common sibling</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.PrimaryColor,
    alignItems: "center",
    justifyContent: "center"
  },

  mapPreview: {
    width: "100%",
    borderColor: Color.Black,
    borderWidth: 4
  },
  box1: {
    borderColor: "black",
    borderWidth: 2,
    flex: 1,
    backgroundColor: "pink",
    zIndex: 2
  },
  box2: {
    position: "absolute",
    borderColor: "black",
    borderWidth: 2,
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "white",
    zIndex: 100
  },
  box3: {
    position: "absolute",
    borderColor: "black",
    borderWidth: 2,
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "white",
    zIndex: 1
  }
});
