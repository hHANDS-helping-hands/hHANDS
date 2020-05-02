import React, { useState, useReducer } from "react";
import { Text, View, StyleSheet, Button, AsyncStorage } from "react-native";
import Modal from "react-native-modal";
import HelpingHands from "../components/HelpingHands";
import Colors from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import Color from "../constants/colors";
import axios from "axios";
import Values from "../constants/stringValues";
//import debugMode from "../constants/debug";
//import AsyncStorage from "@react-native-community/async-storage";

const initialState = {
  otp: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case Values.otp:
      console.log(action.otp);
      return { ...state, otp: action.value };
    default:
      console.log(action);
      return;
  }
};

export default function OtpModal(props) {
  //console.log(props);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.hide}>
      <View style={{ ...styles.container }}>
        <HelpingHands textColor={Color.PrimaryColor} />
        <TextInput
          editable
          style={{ ...styles.input, marginTop: 8 }}
          keyboardType="number-pad"
          placeholder="OTP"
          onChangeText={text => {
            dispatch({ type: Values.otp, value: text });
          }}
        ></TextInput>
        <View style={{ ...styles.buttonContainer, ...debugMode.debug }}>
          <Button
            title="Enter Otp"
            color={Color.PrimaryColor}
            onPress={() => LoginHandler(state)}
          ></Button>
        </View>
      </View>
    </Modal>
  );
}
//`var headers;
const LoginHandler = state => {
  axios
    .get("http://192.168.29.82:8080/login", {
      params: {
        username: state.mobileNo,
        password: state.password
      }
    })
    .then(response => {
      console.log(response.data.token);
      AsyncStorage.setItem();
      AsyncStorage.setItem("token", response.data.token).catch(error => {
        console.log(error);
      });
      nextRequest();
    })
    .catch(error => {
      console.log(error);
    });
};

const nextRequest = async () => {
  let token = await AsyncStorage.getItem("token");
  //console.log("nextRequest: " + token);
  let response = await axios.get("http://192.168.29.82:8080/handle", {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  console.log(response.data);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    alignItems: "center",
    justifyContent: "center",
    padding: 32
  },
  input: {
    width: "80%",
    height: 40,
    borderBottomColor: Color.PrimaryColor,
    borderBottomWidth: 1,
    fontSize: 14
  },
  buttonContainer: {
    marginTop: 24,
    // flexDirection: "row",
    width: "80%",
    justifyContent: "center"
  }
});
