import React, { useState, useReducer, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import HelpingHands from "../components/HelpingHands";
import Colors from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import Color from "../constants/colors";
import axios from "axios";
import { AxiosGetReq, AxiosPostReq } from "../utilities/AxiosReq";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredential,
  setToken,
  login,
  setUserData,
} from "../store/actions/authentication";
import CustomAlert from "../utilities/CustomAlert";
import Screens from "../constants/screens";

const initialState = {
  mobileNo: "",
  password: "",
  disableLoginButton: false,
  showError: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "mobileNo":
      //console.log(action.mobileNo);
      return { ...state, mobileNo: action.mobileNo };
    case "password":
      //console.log(action.password);
      return { ...state, password: action.password };
    case "disableLoginButton":
      return { ...state, disableLoginButton: action.data };
    case "showError":
      return { ...state, showError: action.data };
    default:
      //console.log(action);
      return;
  }
};

export default function LoginModal(props) {
  //const [isVisible, setIsVisible] = useState(false);

  const hideMe = () => {
    props.setIsVisible(false);
  };
  const dispatchStore = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const jwtToken = useSelector((state) => state.authentication.token);

  const _keyboardDidShow = () => {
    dispatch({ type: "showError", data: "" });
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    //Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      //Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={hideMe}
      onRequestClose={hideMe}
    >
      <View style={{ ...styles.container }}>
        <HelpingHands textColor={Color.PrimaryColor} />
        <TextInput
          editable
          style={{ ...styles.input, marginTop: 8 }}
          keyboardType="number-pad"
          placeholder="Mobile No"
          autoFocus={true}
          onChangeText={(text) => {
            dispatch({ type: "mobileNo", mobileNo: text });
          }}
        ></TextInput>
        <TextInput
          editable
          style={{ ...styles.input }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            dispatch({ type: "password", password: text });
          }}
        ></TextInput>

        {state.showError != "" && (
          <Text style={{ color: Color.SecondaryColor, marginTop: 8 }}>
            {state.showError}
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            color={Color.PrimaryColor}
            disabled={state.disableLoginButton}
            onPress={() => {
              LoginHandler(state, dispatchStore, dispatch, hideMe, props);
            }}
          ></Button>
          <Button
            title="Signup"
            color={Color.SecondaryColor}
            onPress={() => {
              hideMe();
              props.navigation.navigate(Screens.Signup, {
                destination: props.destination,
              });
            }}
          ></Button>
        </View>
        <TouchableOpacity
          onPress={() => {
            hideMe();
            props.navigation.navigate("ForgotPassword");
          }}
        >
          <Text
            style={{
              color: Color.SecondaryColor,
              marginTop: 8,
              textDecorationLine: "underline",
            }}
          >
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
//`var headers;
const LoginHandler = async (state, dispatchStore, dispatch, hideMe, props) => {
  const params = {
    username: state.mobileNo,
    password: state.password,
  };
  Keyboard.dismiss();
  dispatch({ type: "disableLoginButton", data: true });
  var token;
  const response = await AxiosPostReq(params, "/login");
  if (response) {
    if (!response.data.success) {
      dispatch({ type: "showError", data: response.data.message });
      console.log(response.data.message);
    } else {
      token = response.data.token;
      dispatchStore(setToken(token));
      dispatchStore(setCredential(state.mobileNo, state.password));
      dispatchStore(login());
      console.log(response.data.userData);
      dispatchStore(setUserData(response.data.userData));
      console.log(response.data.token);
      hideMe();
      props.navigation.navigate(props.destination);
      CustomAlert(
        "Logged In",
        "You are logged in, seek help or help people around you"
      );
      console.log("navigated");
    }
    dispatch({ type: "disableLoginButton", data: false });
  }

  //
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
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
});
