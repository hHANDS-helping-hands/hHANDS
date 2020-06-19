import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TextInput,
  Keyboard,
} from "react-native";
import Color from "../constants/colors";
import { ScrollView } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function DoneeDetailsPage(props) {
  Keyboard.addListener("keyboardDidShow", () => {
    handleKeyboard(1);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    handleKeyboard(0);
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Color.PrimaryColor}
        barStyle="light-content"
      />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={styles.text}>Name</Text>
        <TextInput style={styles.textInput}></TextInput>
        <View style={{ ...debugMode.debug, ...styles.horizontal }}>
          <Text style={{ ...styles.text, ...debugMode.debug }}>Contact</Text>
          <Text style={{ ...styles.verify, ...debugMode.debug }}>Verify</Text>
        </View>
        <TextInput style={styles.textInput}></TextInput>
        <Text style={styles.text}>Problem</Text>
        <TextInput style={styles.textInput}></TextInput>
        <View style={styles.button}>
          <Button title="Enter Address" color={Color.PrimaryColor}></Button>
        </View>
        <Text style={styles.text}>Description</Text>
        <TextInput
          multiline
          numberOfLines={5}
          style={{
            ...styles.textInput,
            textAlignVertical: "top",
            paddingTop: 4,
          }}
        ></TextInput>
        <View style={styles.button}>
          <Button
            title="Submit"
            style={styles.button}
            color={Color.PrimaryColor}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
}

function handleKeyboard(value) {
  if (value) {
    console.log("Keyboard did show");
  } else {
    console.log("Keyboard did hide");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.PrimaryColor,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Color.White,
  },
  textInput: {
    borderColor: Color.SecondaryColor,
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: "top",
    textAlignVertical: "center",
    marginBottom: 12,
    paddingLeft: 4,
  },
  text: {
    color: Color.SecondaryColor,
    fontSize: 16,
    marginBottom: 8,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verify: {
    color: Color.White,
    backgroundColor: Color.SecondaryColor,
    borderRadius: 5,
    paddingLeft: 2,
    paddingRight: 2,
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    marginBottom: 12,
    marginTop: 12,
  },
});
