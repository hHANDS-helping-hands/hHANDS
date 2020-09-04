import React, { useReducer, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Picker,
  StatusBar,
  Keyboard,
} from "react-native";
import HelpingHands from "../components/HelpingHands";
import Colors from "../constants/colors";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import Color from "../constants/colors";
import Values, { ErrorMsgs } from "../constants/stringValues";
import { AxiosPostReq } from "../utilities/AxiosReq";
import CustomAlert from "../utilities/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { Placeholders } from "../constants/stringValues";
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
  profession: "Profession",
  otherProfession: "",
  gender: "Gender",
  otherGender: "",
  showError: "",
  otpModalVisible: false,
  isVisible: true,
  disableSignupButton: false,
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
    case "profession":
      return { ...state, profession: action.value };
    case "showError":
      return { ...state, showError: action.value };
    case "otpModalVisible":
      return { ...state, otpModalVisible: action.value };
    case "isVisible":
      return { ...state, isVisible: action.value };
    case "otherProfession":
      return { ...state, otherProfession: action.value };
    case "otherGender":
      return { ...state, otherGender: action.value };
    case "disableSignupButton":
      return { ...state, disableSignupButton: action.value };
    default:
      return;
  }
};

export default function EditableUserData(props) {
  const params = props.navigation.state.params;
  const hideme = () => {
    dispatch({ type: "otpModalVisible", value: false });
  };
  const dispatchStore = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = useSelector((state) => state.authentication.token);
  const userData = useSelector((state) => {
    return state.authentication.userData;
  });

  const signUp = async () => {
    if (!validateData(state).status) {
      dispatch({ type: "showError", value: validateData(state).msg });
      return;
    }
    dispatch({ type: "disableSignupButton", value: true });
    const response = await AxiosPostReq(
      {
        gend: state.gender == "Other" ? state.otherGender : state.gender,
        name: state.name,
        prof:
          state.profession == "Other"
            ? state.otherProfession
            : state.profession,
        age: state.age,
      },
      "/updateUserData",
      token
    );

    if (response) {
      console.log(response.data);
      if (response.data.success) {
        console.log(response.data.userData);
        dispatchStore(
          setUserData({
            ...userData,
            age: state.age,
            gender: state.gender == "Other" ? state.otherGender : state.gender,
            name: state.name,
            profession:
              state.profession == "Other"
                ? state.otherProfession
                : state.profession,
          })
        );
        props.navigation.goBack();
        //hideme();
        // props.navigation.pop();
        // props.navigation.navigate(
        //   //params && params.destination ? params.destination : "HomePage"
        //   "HomePage"
        // );
        // CustomAlert(Alerts.loggedIn.title, Alerts.loggedIn.description);
      }
    }
    dispatch({ type: "disableSignupButton", value: false });
  };

  const _keyboardDidShow = () => {
    dispatch({ type: "showError", value: "" });
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    console.log("use effect ran");
    console.log(userData);
    dispatch({ type: "name", value: userData.name });
    dispatch({ type: "age", value: userData.age + "" });
    if (userData.gender != "Male" && userData.gender != "Female") {
      dispatch({ type: "gender", value: "Other" });
      dispatch({ type: "otherGender", value: userData.gender });
    } else dispatch({ type: "gender", value: userData.gender });

    if (userData.profession == "Student" || userData.profession == "Engineer")
      dispatch({ type: "profession", value: userData.profession });
    else {
      dispatch({ type: "profession", value: "Other" });
      dispatch({ type: "otherProfession", value: userData.profession });
    }
    return () => {
      console.log("cleaned up, Edit Profile screen");
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
    };
  }, [userData]);

  return (
    <View style={styles.statusContainer}>
      <StatusBar
        backgroundColor={Color.PrimaryColor}
        barStyle="light-content"
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{ flex: 1, backgroundColor: Color.White }}
      >
        <View style={{ ...styles.container }}>
          <HelpingHands textColor={Color.PrimaryColor} />

          <TextInput
            editable
            style={{ ...styles.input }}
            placeholder="Name"
            onChangeText={(text) => {
              dispatch({ type: Values.name, value: text });
            }}
            value={state.name}
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
              <Picker.Item
                label="Gender"
                value="Gender"
                color={Colors.Placeholder}
              />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {state.gender == "Other" && (
            <TextInput
              editable
              style={{ ...styles.input }}
              placeholder="Enter gender"
              value={state.otherGender}
              onChangeText={(text) => {
                dispatch({ type: "otherGender", value: text });
              }}
            ></TextInput>
          )}

          <View
            style={{
              ...styles.input,
            }}
          >
            <Picker
              mode="dropdown"
              selectedValue={state.profession}
              style={{
                ...styles.input,
                marginLeft: -8,
                width: "100%",
              }}
              onValueChange={(itemValue, itemIndex) =>
                dispatch({ type: "profession", value: itemValue })
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
          {state.profession == "Other" && (
            <TextInput
              editable
              style={{ ...styles.input }}
              placeholder="Enter profession"
              value={state.otherProfession}
              onChangeText={(text) => {
                dispatch({ type: "otherProfession", value: text });
              }}
            ></TextInput>
          )}
          <TextInput
            editable
            style={{ ...styles.input }}
            placeholder={Placeholders.age}
            keyboardType="number-pad"
            value={state.age}
            onChangeText={(text) => {
              dispatch({ type: Values.age, value: text });
            }}
          ></TextInput>

          {state.showError != "" && (
            <Text style={{ color: Color.SecondaryColor }}>
              {state.showError}
            </Text>
          )}

          <View style={{ ...styles.buttonContainer }}>
            <Button
              title="Save & Close"
              disabled={state.disableSignupButton}
              color={Color.SecondaryColor}
              onPress={signUp}
            ></Button>
          </View>
          <Text style={{ color: Color.BlackLLL }}>
            ** This data will not be shared with any donor or donee **
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

//`var headers;
const validateData = (state) => {
  let ageReg = /^[1-9]\d$|^1\d\d$/;
  let professionReg = /^[a-zA-Z][a-zA-Z ]*$/;
  let nameReg = /^[a-zA-Z][a-zA-Z ]*$/;
  if (!state.name.match(nameReg))
    return {
      status: false,
      msg: ErrorMsgs.nameAlphabaetical,
    };

  if (!state.gender.match(professionReg) || state.gender == "Gender") {
    //console.error("Printing" + state.profession);
    //console.log("printing" + state.profession);
    return {
      status: false,
      msg: ErrorMsgs.genderAlphabaetical,
    };
  }

  if (state.gender == "Other" && !state.otherGender.match(professionReg)) {
    //console.error("Printing" + state.gender);
    console.log("printing" + state.gender);
    return {
      status: false,
      msg: ErrorMsgs.genderAlphabaetical,
    };
  }
  if (
    !state.profession.match(professionReg) ||
    state.profession == "Profession"
  ) {
    //console.error("Printing" + state.profession);
    console.log("printing" + state.profession);
    return {
      status: false,
      msg: ErrorMsgs.professionAlphabaetical,
    };
  }
  if (
    state.profession == "Other" &&
    !state.otherProfession.match(professionReg)
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
  return {
    status: true,
  };
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
    fontSize: 16,
    //backgroundColor: Colors.PrimaryColor,
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 8,
    width: "50%",
    justifyContent: "center",
  },
});
