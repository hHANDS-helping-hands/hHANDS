import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { DotIndicator } from "react-native-indicators";
import Color from "../constants/colors";
import HelpingHands from "../components/HelpingHands";
import Screens from "../constants/screens";
import { Keys, getData } from "../utilities/AsyncStorage";
import { useDispatch } from "react-redux";
import {
  setToken,
  login,
  setUserData,
  setCredential,
} from "../store/actions/authentication";
import { StackActions, NavigationActions } from "react-navigation";

const dispatchStoredVar = async (dispatch) => {
  const value = await getData(Keys.loggedIn);
  if (value) {
    dispatch(login());
    const token = await getData(Keys.token);
    dispatch(setToken(token));
    const userData = await getData(Keys.userData);
    dispatch(setUserData(userData));
    const loginCredential = await getData(Keys.loginCredential);
    dispatch(setCredential(loginCredential));
  }
};

export default function SplashScreen(props) {
  const goToHomeScreen = () => {
    console.log("After 2 seconds : ");
    //console.log("Splash Screen", props);
    //props.navigation.navigate(Screens.HomePage);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Screens.HomePage })],
    });
    props.navigation.dispatch(resetAction);
  };
  const dispatch = useDispatch();
  dispatchStoredVar(dispatch);

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
