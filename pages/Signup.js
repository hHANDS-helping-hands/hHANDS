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
import OtpModal from "../components/OtpModal";
import Values, { ErrorMsgs } from "../constants/stringValues";
import { AxiosGetReq } from "../utilities/AxiosReq";
import CustomAlert from "../utilities/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { Placeholders, PickerLabels } from "../constants/stringValues";
import {
  setToken,
  setCredential,
  login,
  setUserData,
} from "../store/actions/authentication";
import { Alerts } from "../constants/stringValues";

const initialState = {
  username: "",
  name: "",
  age: "",
  password: "",
  confirmPassword: "",
  accuracy: 0,
  selectedValue: "Profession",
  otherValue: "",
  gender: "Male",
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
    case "gender":
      return { ...state, gender: action.value };
    case Values.age:
      return { ...state, age: action.value };
    case Values.confirmPassword:
      return { ...state, confirmPassword: action.value };
    case Values.profession:
      return { ...state, profession: action.value };
    case Values.name:
      return { ...state, name: action.value };
    case "selectedValue":
      return { ...state, selectedValue: action.value };
    case "showError":
      return { ...state, showError: action.value };
    case "otpModalVisible":
      return { ...state, otpModalVisible: action.value };
    case "isVisible":
      return { ...state, isVisible: action.value };
    case "otherValue":
      return { ...state, otherValue: action.value };
    default:
      return;
  }
};

export default function SignUp(props) {
  const params = props.navigation.state.params;
  const hideme = () => {
    dispatch({ type: "otpModalVisible", value: false });
  };
  const dispatchStore = useDispatch();
  const showme = async () => {
    let result = validateData(state);
    if (result.status) {
      dispatch({
        type: "showError",
        value: "",
      });
      let response = await AxiosGetReq({ user: state.username }, "/getotp");
      if (handleResponse(response))
        dispatch({ type: "otpModalVisible", value: true });
    } else
      dispatch({
        type: "showError",
        value: result.msg,
      });
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const token = useSelector((state) => state.authentication.token);

  const signUp = async (token) => {
    const response = await AxiosGetReq(
      {
        user: state.username,
        pass: state.password,
        gend: state.gender,
        name: state.name,
        prof:
          state.selectedValue == "Other"
            ? state.otherValue
            : state.selectedValue,
        age: state.age,
      },
      "/signup",
      token
    );
    if (response) {
      console.log(response.data);
      if (response.data.success) {
        dispatchStore(login());
        dispatchStore(setToken(response.data.token));
        dispatchStore(setCredential(state.username, state.password));
        console.log(response.data.userData);
        dispatchStore(setUserData(response.data.userData));
        //hideme();
        props.navigation.pop();
        props.navigation.navigate(
          //params && params.destination ? params.destination : "HomePage"
          "HomePage"
        );
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
            placeholder="Name"
            onChangeText={(text) => {
              dispatch({ type: Values.name, value: text });
            }}
          ></TextInput>
          <View
            style={{
              ...styles.input,
            }}
          >
            <Picker
              mode="dropdown"
              selectedValue={state.gender}
              style={{
                ...styles.input,
                marginLeft: -8,
                width: "100%",
              }}
              onValueChange={(itemValue, itemIndex) =>
                dispatch({ type: "gender", value: itemValue })
              }
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Transgender" value="Transgender" />
            </Picker>
          </View>

          <View
            style={{
              ...styles.input,
            }}
          >
            <Picker
              mode="dropdown"
              selectedValue={state.selectedValue}
              style={{
                ...styles.input,
                marginLeft: -8,
                width: "100%",
              }}
              onValueChange={(itemValue, itemIndex) =>
                dispatch({ type: "selectedValue", value: itemValue })
              }
            >
              <Picker.Item
                label="Profession"
                value="Profession"
                color={Colors.Placeholder}
              />
              <Picker.Item label="Student" value="Student" />
              <Picker.Item label="Engineer" value="Engineer" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {state.selectedValue == "Other" && (
            <TextInput
              editable
              style={{ ...styles.input }}
              placeholder="Enter Profession"
              onChangeText={(text) => {
                dispatch({ type: "otherValue", value: text });
              }}
            ></TextInput>
          )}
          <TextInput
            editable
            style={{ ...styles.input }}
            placeholder={Placeholders.age}
            onChangeText={(text) => {
              dispatch({ type: Values.age, value: text });
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
          <Text style={{ color: Color.BlackLLL }}>
            ** This data will not be shared with any donor or donee **
          </Text>
        </View>
        <OtpModal
          hide={hideme}
          isVisible={state.otpModalVisible}
          username={state.username}
          password={state.password}
          destination={params.destination}
          navigation={props.navigation}
          action={signUp}
        ></OtpModal>
      </ScrollView>
    </View>
  );
}

//`var headers;
const validateData = (state) => {
  let usernameReg = /^\d{10}$/;
  let ageReg = /^[1-9]\d$|^1\d\d$/;
  let professionReg = /^[a-zA-Z][a-zA-Z ]*$/;
  let nameReg = /^[a-zA-Z][a-zA-Z ]*$/;
  if (!state.username.match(usernameReg))
    return {
      status: false,
      msg: ErrorMsgs.mobileNoTenDigits,
    };
  if (!state.name.match(nameReg))
    return {
      status: false,
      msg: ErrorMsgs.nameAlphabaetical,
    };
  if (
    !state.selectedValue.match(professionReg) ||
    state.selectedValue == "Profession"
  ) {
    //console.error("Printing" + state.profession);
    console.log("printing" + state.profession);
    return {
      status: false,
      msg: ErrorMsgs.professionAlphabaetical,
    };
  }
  if (
    state.selectedValue == "Other" &&
    !state.otherValue.match(professionReg)
  ) {
    //console.error("Printing" + state.profession);
    console.log("printing" + state.profession);
    return {
      status: false,
      msg: ErrorMsgs.professionAlphabaetical,
    };
  }
  if (!state.age.match(ageReg))
    return {
      status: false,
      msg: ErrorMsgs.ageNotValid,
    };

  if (state.password == "" || state.confirmPassword == "")
    return {
      status: false,
      msg: ErrorMsgs.passwordEmpty,
    };

  if (state.password != state.confirmPassword)
    return {
      status: false,
      msg: ErrorMsgs.confirmPasswordNotMatch,
    };
  return {
    status: true,
  };
};

const handleResponse = (response) => {
  if (response) {
    //console.log(response.data.success);
    if (response.data.success) return true;
    CustomAlert(Alerts.userExists.title, Alerts.userExists.description);
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
    marginBottom: 8,
    width: "50%",
    justifyContent: "center",
  },
});
