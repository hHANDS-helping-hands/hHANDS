import React, { useReducer, useEffect } from "react";
import { Text, View, StyleSheet, Button, Keyboard } from "react-native";
import Modal from "react-native-modal";
import HelpingHands from "../components/HelpingHands";
import Colors from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import Color from "../constants/colors";
import axios from "axios";
import Values from "../constants/stringValues";
import { AxiosGetReq } from "../utilities/AxiosReq";
import { setToken } from "../store/actions/authentication";
import { useDispatch } from "react-redux";

const initialState = {
  otp: "",
  showError: "",
  disableOtpButton: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case Values.otp:
      console.log(action.otp);
      return { ...state, otp: action.value };
    case "showError":
      return { ...state, showError: action.value };
    case "disableOtpButton":
      return { ...state, disableOtpButton: action.value };
    default:
      console.log(action);
      return;
  }
};

export default function OtpModal(props) {
  //console.log(props);

  const username = props.username;

  const hideHandler = () => {
    dispatch({ type: "showError", value: "" });
    dispatch({ type: Values.otp, value: "" });
    props.hide();
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchStore = useDispatch();

  const _keyboardDidShow = () => {
    dispatch({ type: "showError", value: "" });
  };
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      dispatch({ type: "showError", data: "" });
    };
  }, []);

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={hideHandler}
      onRequestClose={hideHandler}
    >
      <View style={{ ...styles.container }}>
        <HelpingHands textColor={Color.PrimaryColor} />
        <TextInput
          editable
          style={{ ...styles.input, marginTop: 8 }}
          keyboardType="number-pad"
          placeholder="OTP"
          onChangeText={(text) => {
            dispatch({ type: Values.otp, value: text });
          }}
        ></TextInput>
        {state.showError != "" && (
          <Text style={{ color: Color.SecondaryColor, marginTop: 8 }}>
            {state.showError}
          </Text>
        )}
        <View style={{ ...styles.buttonContainer, ...debugMode.debug }}>
          <Button
            title="Enter Otp"
            color={Color.PrimaryColor}
            disabled={state.disableOtpButton}
            onPress={() =>
              otpHandler(state.otp, props, dispatchStore, dispatch)
            }
          ></Button>
        </View>
      </View>
    </Modal>
  );
}
//`var headers;
const otpHandler = async (otp, props, dispatchStore, dispatch) => {
  dispatch({ type: "disableOtpButton", value: true });
  const { username } = props;
  if (otp.length != 4) {
    dispatch({ type: "showError", value: "Otp must be of 4 digits" });
    return;
  }
  const response = await AxiosGetReq({ user: username, otp: otp }, "/checkotp");
  if (response) {
    dispatch({ type: "disableOtpButton", value: false });
    if (response.data.success) {
      dispatch({ type: "showError", value: "" });
      dispatchStore(setToken(response.data.token));
      props.action(response.data.token);
      return;
    }
    dispatch({
      type: "showError",
      value:
        response.data.message == "Bad Otp"
          ? "Wrong otp"
          : response.data.message,
    });
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  input: {
    width: "80%",
    height: 40,
    borderBottomColor: Color.PrimaryColor,
    borderBottomWidth: 1,
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 24,
    width: "80%",
    justifyContent: "center",
  },
});
