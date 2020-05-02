import React, { useState, useReducer } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  Picker
} from "react-native";
import Modal from "react-native-modal";
import HelpingHands from "../components/HelpingHands";
import Colors from "../constants/colors";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import Color from "../constants/colors";
import axios from "axios";
import OtpModal from "../components/OtpModal";
import Values from "../constants/stringValues";
//import AsyncStorage from "@react-native-community/async-storage";

const initialState = {
  mobileNo: "",
  name: "",
  profession: "",
  age: 0,
  password: "",
  confirmPassword: "",
  accuracy: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case Values.mobileNo:
      console.log(action.mobileNo);
      return { ...state, mobileNo: action.value };
    case Values.password:
      console.log(action.password);
      return { ...state, password: action.value };
    case Values.age:
      console.log(action.age);
      return { ...state, age: action.value };
    case Values.confirmPassword:
      console.log(action.confirmPassword);
      return { ...state, confirmPassword: action.value };
    case Values.profession:
      console.log(action.profession);
      return { ...state, profession: action.value };
    case Values.name:
      console.log(action.name);
      return { ...state, name: action.value };
    default:
      console.log(action);
      return;
  }
};

export default function LoginModal(props) {
  const [isVisible, setIsVisible] = useState(true);
  const hideme = () => {
    setOtpModalVisible(false);
  };
  const showme = () => {
    let result = validateData(state);
    if (result.status) {
      setShowError({
        value: false
      });
      setOtpModalVisible(true);
    } else
      setShowError({
        value: true,
        text: result.msg
      });
  };

  const [showError, setShowError] = useState({
    value: false,
    text: ""
  });

  const [state, dispatch] = useReducer(reducer, initialState);
  const [otpModalVisible, setOtpModalVisible] = useState(false);

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
          onChangeText={text => {
            dispatch({ type: Values.mobileNo, value: text });
          }}
        ></TextInput>
        <TextInput
          editable
          style={{ ...styles.input }}
          placeholder="Name"
          onChangeText={text => {
            dispatch({ type: Values.name, value: text });
          }}
        ></TextInput>
        <TextInput
          editable
          style={{ ...styles.input }}
          placeholder="Profession (Student, Engineer)"
          onChangeText={text => {
            dispatch({ type: Values.profession, value: text });
          }}
        ></TextInput>
        <TextInput
          editable
          style={{ ...styles.input }}
          placeholder="Age (25, 39)"
          onChangeText={text => {
            dispatch({ type: Values.age, value: text });
          }}
        ></TextInput>
        <TextInput
          editable
          style={{ ...styles.input }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => {
            dispatch({ type: Values.password, value: text });
          }}
        ></TextInput>
        <TextInput
          editable
          style={{ ...styles.input }}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={text => {
            dispatch({ type: Values.confirmPassword, value: text });
          }}
        ></TextInput>
        {showError.value && (
          <Text style={{ color: Color.SecondaryColor }}>{showError.text}</Text>
        )}
        <View style={{ ...styles.buttonContainer }}>
          <Button
            title="Verify Otp"
            color={Color.SecondaryColor}
            onPress={showme}
          ></Button>
        </View>
      </View>
      <OtpModal hide={hideme} isVisible={otpModalVisible}></OtpModal>
    </ScrollView>
  );
}
//`var headers;
const validateData = state => {
  let mobileNoReg = /^\d{10}$/;
  let ageReg = /^[1-9]\d$|^1\d\d$/;
  let professionReg = /^[a-zA-Z][a-zA-Z ]*$/;
  let nameReg = /^[a-zA-Z][a-zA-Z ]*$/;
  if (!state.mobileNo.match(mobileNoReg))
    return {
      status: false,
      msg: "MobileNo not valid(10 digits)"
    };
  if (!state.name.match(nameReg))
    return {
      status: false,
      msg: "Name not valid(Alphabaetical string)"
    };
  if (!state.profession.match(professionReg))
    return {
      status: false,
      msg: "Profession not valid(Alphabaetical string)"
    };
  if (!state.age.match(ageReg))
    return {
      status: false,
      msg: "Age not valid(10-199)"
    };
  return {
    status: true
  };
};

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
    margin: 6,
    borderBottomColor: Color.PrimaryColor,
    borderBottomWidth: 1,
    fontSize: 14
  },
  buttonContainer: {
    marginTop: 40,
    width: "50%",
    justifyContent: "center"
  }
});
