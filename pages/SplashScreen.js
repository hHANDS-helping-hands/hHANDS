import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { DotIndicator } from "react-native-indicators";
import Color from "../constants/colors";
import HelpingHands from "../components/HelpingHands";
import Screens from "../constants/screens";

export default function SplashScreen(props) {
  const goToHomeScreen = () => {
    console.log("After 2 seconds : ");
    console.log("Splash Screen", props);
    props.navigation.navigate(Screens.HomePage);
  };

  setTimeout(goToHomeScreen, 2000);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Color.PrimaryColor}
        barStyle="light-content"
      />
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
    justifyContent: "center",
  },
  dotsWrapper: {
    height: 20,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomColor: "black",
    borderBottomWidth: 0,
  },
  text: {
    color: Color.White,
    fontSize: 20,
    //fontWeight: "bold",
    borderBottomColor: Color.Black,
    fontFamily: "open-sans-bold",
    borderBottomWidth: 0,
    paddingBottom: 3,
  },
  text_h: {
    color: Color.SecondaryColor,
    fontSize: 30,
    fontWeight: "bold",
    borderBottomColor: Color.Black,
    fontFamily: "open-sans-bold",
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
});

SplashScreen.navigationOptions = {
  drawerLockMode: "locked-closed",
};
