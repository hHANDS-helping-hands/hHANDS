import React, { useState, useReducer } from "react";
import { Text, View, StyleSheet, Button, AsyncStorage } from "react-native";
import Modal from "react-native-modal";
import HelpingHands from "../components/HelpingHands";
import Colors from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import Color from "../constants/colors";
import axios from "axios";
//import AsyncStorage from "@react-native-community/async-storage";

const initialState = {
  mobileNo: "",
  password: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "mobileNo":
      console.log(action.mobileNo);
      return { ...state, mobileNo: action.mobileNo };
    case "password":
      console.log(action.password);
      return { ...state, password: action.password };
    default:
      console.log(action);
      return;
  }
};

export default function LoginModal(props) {
  const [isVisible, setIsVisible] = useState(true);
  const hideMe = () => {
    setIsVisible(false);
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Modal isVisible={isVisible} onBackdropPress={hideMe}>
      <View style={{ ...styles.container }}>
        <HelpingHands textColor={Color.PrimaryColor} />
        <TextInput
          editable
          style={{ ...styles.input, marginTop: 8 }}
          keyboardType="number-pad"
          placeholder="Mobile No"
          onChangeText={text => {
            dispatch({ type: "mobileNo", mobileNo: text });
          }}
        ></TextInput>
        <TextInput
          editable
          style={{ ...styles.input }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => {
            dispatch({ type: "password", password: text });
          }}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            color={Color.PrimaryColor}
            onPress={() => LoginHandler(state)}
          ></Button>
          <Button title="Signup" color={Color.SecondaryColor}></Button>
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
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between"
  }
});
