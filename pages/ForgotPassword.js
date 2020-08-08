import React, { useState, useReducer, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  Picker,
  StatusBar,
  Keyboard,
} from "react-native";
import HelpingHands from "../components/HelpingHands";
import Colors from "../constants/colors";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import Color from "../constants/colors";
import axios from "axios";
import OtpModal from "../components/OtpModal";
import Values from "../constants/stringValues";
import { AxiosGetReq } from "../utilities/AxiosReq";
import CustomAlert from "../utilities/CustomAlert";
import { useDispatch } from "react-redux";
import {
  setToken,
  setCredential,
  login,
  setUserData,
} from "../store/actions/authentication";
import { Alerts } from "../constants/stringValues";

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
  showError: "",
  otpModalVisible: false,
  isVisible: true,
};

const reducer = (state, action) => {
  console.log(action.value);
  switch (action.type) {
    case Values.username:
      return { ...state, username: action.value };
    case Values.password:
      return { ...state, password: action.value };
    case Values.confirmPassword:
      return { ...state, confirmPassword: action.value };
    case "showError":
      return { ...state, showError: action.value };
    case "otpModalVisible":
      return { ...state, otpModalVisible: action.value };
    case "isVisible":
      return { ...state, isVisible: action.value };
    default:
      return;
  }
};

export default function ForgotPassword(props) {
  //const params = props.navigation.state.params;
  const dispatchStore = useDispatch();
  const hideme = () => {
    dispatch({ type: "otpModalVisible", value: false });
  };
  const showme = async () => {
    let result = validateData(state);
    if (result.status) {
      dispatch({
        type: "showError",
        value: "",
      });
      let response = await AxiosGetReq(
        { user: state.username, action: "resetPassword" },
        "/getotp"
      );
      if (handleResponse(response))
        dispatch({ type: "otpModalVisible", value: true });
    } else
      dispatch({
        type: "showError",
        value: result.msg,
      });
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const resetPassword = async (token) => {
    const response = await AxiosGetReq(
      {
        pass: state.password,
      },
      "/resetpassword",
      token
    );
    if (response) {
      console.log(response.data);
      if (response.data.success) {
        dispatchStore(login());
        dispatchStore(setToken(response.data.token));
        console.log(response.data.userData);
        dispatchStore(setUserData(response.data.userData));
        dispatchStore(
          setCredential(
            response.data.userData.username,
            response.data.userData.password
          )
        );
        hideme();
        props.navigation.navigate("HomePage");
        CustomAlert(Alerts.loggedIn.title, Alerts.loggedIn.description);
      }
    }
  };

  const _keyboardDidShow = () => {
    dispatch({ type: "showError", value: "" });
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    return () => {
      console.log("cleaned up, Signup screen");
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
    };
  }, []);

  return (
    <View style={styles.statusContainer}>
      <StatusBar
        backgroundColor={Color.PrimaryColor}
        barStyle="light-content"
      />
      <ScrollView style={{ flex: 1, backgroundColor: Color.White }}>
        <View style={{ ...styles.container }}>
          <HelpingHands textColor={Color.PrimaryColor} />
          <TextInput
            autoCompleteType="off"
            editable
            style={{ ...styles.input, marginTop: 30 }}
            keyboardType="number-pad"
            placeholder="Mobile No"
            onChangeText={(text) => {
              dispatch({ type: Values.username, value: text });
            }}
          ></TextInput>

          <TextInput
            editable
            style={{ ...styles.input }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              dispatch({ type: Values.password, value: text });
            }}
          ></TextInput>
          <TextInput
            editable
            style={{ ...styles.input }}
            placeholder="Confirm Password"
            secureTextEntry={true}
            numberOfLines={10}
            multiline
            onChangeText={(text) => {
              dispatch({ type: Values.confirmPassword, value: text });
            }}
          ></TextInput>
          {state.showError != "" && (
            <Text style={{ color: Color.SecondaryColor }}>
              {state.showError}
            </Text>
          )}
          <View style={{ ...styles.buttonContainer }}>
            <Button
              title="Verify Otp"
              color={Color.SecondaryColor}
              onPress={showme}
            ></Button>
          </View>
        </View>
        <OtpModal
          hide={hideme}
          isVisible={state.otpModalVisible}
          username={state.username}
          action={resetPassword}
        ></OtpModal>
      </ScrollView>
    </View>
  );
}

//`var headers;
const validateData = (state) => {
  let usernameReg = /^\d{10}$/;

  if (!state.username.match(usernameReg))
    return {
      status: false,
      msg: "Mobile number not valid(10 digits)",
    };
  if (state.password == "" || state.confirmPassword == "")
    return {
      status: false,
      msg: "Password entries can't be empty",
    };
  if (state.password != state.confirmPassword)
    return {
      status: false,
      msg: "Confirm password entry does not match password",
    };
  return {
    status: true,
  };
};

const handleResponse = (response) => {
  if (response) {
    console.log(response.data);
    if (response.data.success) return true;
    CustomAlert(Alerts.userNotFound.title, Alerts.userNotFound.description);
    return false;
  }
  return false;
};

const styles = StyleSheet.create({
  statusContainer: {
    flex: 1,
    backgroundColor: Color.PrimaryColor,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Color.White,
  },
  container: {
    backgroundColor: Colors.White,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  input: {
    width: "90%",
    height: 40,
    margin: 6,
    borderBottomColor: Color.PrimaryColor,
    borderBottomWidth: 1,
    fontSize: 14,
    //backgroundColor: Colors.PrimaryColor,
  },
  buttonContainer: {
    marginTop: 40,
    width: "50%",
    justifyContent: "center",
  },
});
