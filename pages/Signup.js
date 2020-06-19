import React, { useState, useReducer } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  Picker,
} from "react-native";
import HelpingHands from "../components/HelpingHands";
import Colors from "../constants/colors";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import Color from "../constants/colors";
import axios from "axios";
import OtpModal from "../components/OtpModal";
import Values from "../constants/stringValues";

const initialState = {
  mobileNo: "",
  name: "",
  profession: "",
  age: "",
  password: "",
  confirmPassword: "",
  accuracy: 0,
  selectedValue: "Profession",
  showError: {
    value: false,
  },
  otpModalVisible: false,
  isVisible: true,
};

const reducer = (state, action) => {
  console.log(action.value);

  switch (action.type) {
    case Values.mobileNo:
      return { ...state, mobileNo: action.value };
    case Values.password:
      return { ...state, password: action.value };
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
    default:
      return;
  }
};

export default function LoginModal(props) {
  const hideme = () => {
    dispatch({ type: "otpModalVisible", value: false });
  };

  const showme = () => {
    let result = validateData(state);
    if (result.status) {
      dispatch({
        type: "showError",
        value: {
          value: false,
        },
      });
      dispatch({ type: "otpModalVisible", value: true });
    } else
      dispatch({
        type: "showError",
        value: {
          value: true,
          text: result.msg,
        },
      });
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
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
            dispatch({ type: Values.mobileNo, value: text });
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
        {state.selectedValue != "Student" &&
          state.selectedValue != "Engineer" &&
          state.selectedValue != "Profession" && (
            <TextInput
              editable
              style={{ ...styles.input }}
              placeholder="Enter Profession"
              onChangeText={(text) => {
                dispatch({ type: "selectedValue", value: text });
              }}
            ></TextInput>
          )}
        <TextInput
          editable
          style={{ ...styles.input }}
          placeholder="Age (25, 39)"
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
          numberOfLines={10}
          multiline
          onChangeText={(text) => {
            dispatch({ type: Values.confirmPassword, value: text });
          }}
        ></TextInput>
        {state.showError.value && (
          <Text style={{ color: Color.SecondaryColor }}>
            {state.showError.text}
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
      <OtpModal hide={hideme} isVisible={state.otpModalVisible}></OtpModal>
    </ScrollView>
  );
}
//`var headers;
const validateData = (state) => {
  let mobileNoReg = /^\d{10}$/;
  let ageReg = /^[1-9]\d$|^1\d\d$/;
  let professionReg = /^[a-zA-Z][a-zA-Z ]*$/;
  let nameReg = /^[a-zA-Z][a-zA-Z ]*$/;
  if (!state.mobileNo.match(mobileNoReg))
    return {
      status: false,
      msg: "MobileNo not valid(10 digits)",
    };
  if (!state.name.match(nameReg))
    return {
      status: false,
      msg: "Name not valid(Alphabaetical string)",
    };
  if (
    !state.selectedValue.match(professionReg) ||
    state.selectedValue == "Profession"
  ) {
    //console.error("Printing" + state.profession);
    console.log("printing" + state.profession);
    return {
      status: false,
      msg: "Profession not valid(Alphabaetical string)",
    };
  }
  if (!state.age.match(ageReg))
    return {
      status: false,
      msg: "Age not valid(10-199)",
    };
  return {
    status: true,
  };
};

const LoginHandler = (state) => {
  axios
    .get("http://192.168.29.82:8080/login", {
      params: {
        username: state.mobileNo,
        password: state.password,
      },
    })
    .then((response) => {
      console.log(response.data.token);
      AsyncStorage.setItem();
      AsyncStorage.setItem("token", response.data.token).catch((error) => {
        console.log(error);
      });
      nextRequest();
    })
    .catch((error) => {
      console.log(error);
    });
};

const nextRequest = async () => {
  let token = await AsyncStorage.getItem("token");
  //console.log("nextRequest: " + token);
  let response = await axios.get("http://192.168.29.82:8080/handle", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  console.log(response.data);
};

const styles = StyleSheet.create({
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
