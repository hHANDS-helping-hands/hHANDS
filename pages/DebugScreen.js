import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Screens from "../constants/screens";
import { SplashScreen, Signup } from "../constants/screens";
import ProfilePage from "../pages/ProfilePage";

export default function DebugScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="HomePage"
        onPress={() => {
          props.navigation.navigate(Screens.HomePage);
        }}
      ></Button>
      <Button
        onPress={() => {
          props.navigation.navigate(SplashScreen);
        }}
        title="SplashScreen"
      ></Button>
      <Button
        onPress={() => {
          props.navigation.navigate(Screens.DoneeDetailsPage);
        }}
        title="DoneeDetailsPage"
      ></Button>
      <Button
        onPress={() => {
          props.navigation.navigate(Screens.LocationScreen);
        }}
        title="LocationScreen"
      ></Button>
      <Button
        onPress={() => {
          props.navigation.navigate(Signup);
        }}
        title="Signup"
      ></Button>
      <Button
        onPress={() => {
          props.navigation.navigate("ProfilePage");
        }}
        title="ProfilePage"
      ></Button>
      <Button
        onPress={() => {
          props.navigation.navigate("ShowDoneeDetails");
        }}
        title="ShowDoneeDetails"
      ></Button>
      <Button
        onPress={() => {
          props.navigation.navigate("Feedback");
        }}
        title="Feedback"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
