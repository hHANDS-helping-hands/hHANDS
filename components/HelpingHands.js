import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DotIndicator } from "react-native-indicators";
import Color from "../constants/colors";
import debugMode from "../constants/debug";

export default function HelpingHands(props) {
  //console.log(props);
  return (
    <View style={{ ...styles.textContainer }}>
      <Text style={styles.text_h}>h</Text>
      <Text style={{ ...styles.text, color: props.textColor }}>HANDS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomColor: "black"
  },
  text: {
    color: Color.White,
    fontSize: 20,
    //fontWeight: "bold",
    borderBottomColor: Color.Black,
    fontFamily: "open-sans-bold",
    paddingBottom: 3
  },
  text_h: {
    color: Color.SecondaryColor,
    fontSize: 30,
    fontWeight: "bold",
    borderBottomColor: Color.Black,
    fontFamily: "open-sans-bold",
    borderBottomWidth: 0,
    paddingBottom: 0
  }
});
