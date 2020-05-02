import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DotIndicator } from "react-native-indicators";
import Color from "../constants/colors";
import HelpingHands from "../components/HelpingHands";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <HelpingHands></HelpingHands>
      <View style={styles.dotsWrapper}>
        <DotIndicator color={Color.SecondaryColor} size={10} count={3} />
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
  dotsWrapper: {
    height: 20
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomColor: "black",
    borderBottomWidth: 0
  },
  text: {
    color: Color.White,
    fontSize: 20,
    //fontWeight: "bold",
    borderBottomColor: Color.Black,
    fontFamily: "open-sans-bold",
    borderBottomWidth: 0,
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
