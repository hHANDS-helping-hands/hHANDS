import React, { useState, useReducer, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TextInput,
  Picker,
  Keyboard,
} from "react-native";
import Color from "../constants/colors";
import { ScrollView } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import { AxiosPostReq, AxiosGetReq } from "../utilities/AxiosReq";
import { useSelector, useDispatch } from "react-redux";
import { setTicketList } from "../store/actions/inMemoryData";
import { ErrorMsgs } from "../constants/stringValues";

const initialState = {
  name: "",
  contact: "",
  gender: "Male",
  problem: "Need Food",
  otherProblem: "",
  address: "",
  location: "",
  description: "",
  showError: "",
  numMembers: "",
  addressTitle: "Enter Location",
  disableAddressButton: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };
    case "contact":
      return { ...state, contact: action.value };
    case "gender":
      return { ...state, gender: action.value };
    case "problem":
      return { ...state, problem: action.value };
    case "otherProblem":
      return { ...state, otherProblem: action.value };
    case "address":
      return { ...state, address: action.value };
    case "location":
      //console.log(action.value);
      return { ...state, location: action.value };
    case "description":
      return { ...state, description: action.value };
    case "numMembers":
      return { ...state, numMembers: action.value };
    case "showError":
      return { ...state, showError: action.value };
    case "addressTitle":
      return { ...state, addressTitle: action.value };
    case "disableAddressButton":
      return { ...state, disableAddressButton: action.value };
    default:
      return;
  }
};

export default function DoneeDetailsPage(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const token = useSelector((state) => state.authentication.token);
  const dispatchStore = useDispatch();
  const username = useSelector((state) => {
    if (state.authentication.userData)
      return state.authentication.userData.username;
  });
  const location = useSelector((state) => state.inMemoryData.location);

  const fetchTicket = async () => {
    let response = await AxiosGetReq(
      {
        long: location.longitude,
        lat: location.latitude,
      },
      "/posts"
    );
    console.log(
      "printing tickets in doneedetails page " +
        JSON.stringify(response.data.message.length)
    );
    if (response && response.data.success) {
      dispatchStore(setTicketList(response.data.message));
    }
  };

  const postData = async () => {
    const response = await AxiosPostReq(
      {
        long: state.location.longitude,
        lat: state.location.latitude,
        src: username + "",
        name: state.name,
        gend: state.gender,
        cont: state.contact,
        prob: state.problem == "Other" ? state.otherProblem : state.problem,
        desc: state.description,
        num: state.numMembers,
        addr: state.address,
      },
      "/posts",
      token
    );
    setDisableSubmit(false);
    if (response && response.data.success) {
      fetchTicket();
      console.log("in DoneeDetails page " + response.data.message);
      props.navigation.goBack();
    } else if (response && !response.data.success) {
      props.navigation.goBack();
    } else {
      dispatch({
        type: "showError",
        value:
          "Could not post " + response && !response.data.success
            ? response.data.msg
            : "",
      });
    }

    console.log(response.data);
  };
  const handleSubmit = async () => {
    let result = validateData(state);
    if (result.status) {
      dispatch({
        type: "showError",
        value: "",
      });
      //sendData to server
      setDisableSubmit(true);
      await postData();
    } else
      dispatch({
        type: "showError",
        value: result.msg,
      });
  };

  const locationHandler = () => {
    dispatch({ type: "disableAddressButton", value: true });
    props.navigation.navigate("LocationScreen", {
      dispatchParent: dispatch,
      locationParent: state.location,
      addressParent: state.address,
    });
    dispatch({ type: "disableAddressButton", value: false });
  };

  const _keyboardDidShow = () => {
    dispatch({
      type: "showError",
      value: "",
    });
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      console.log("cleaned up, donee details page");
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Color.PrimaryColor}
        barStyle="light-content"
      />
      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={{ color: Color.BlackLLL }}>
          ** This data will be shared with our users **
        </Text>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            dispatch({ type: "name", value: text });
          }}
        ></TextInput>

        <Text style={styles.text}>Gender</Text>

        <View
          style={{
            ...styles.textInput,
          }}
        >
          <Picker
            mode="dropdown"
            selectedValue={state.gender}
            style={{
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

        <Text style={styles.text}>Number of Family Members</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.textInput}
          onChangeText={(text) => {
            dispatch({ type: "numMembers", value: text });
          }}
        ></TextInput>

        <View style={{ ...debugMode.debug, ...styles.horizontal }}>
          <Text style={{ ...styles.text, ...debugMode.debug }}>Contact</Text>
          {/* <Text style={{ ...styles.verify, ...debugMode.debug }}>Verify</Text> */}
        </View>
        <TextInput
          keyboardType="number-pad"
          style={styles.textInput}
          onChangeText={(text) => {
            dispatch({ type: "contact", value: text });
          }}
        ></TextInput>
        <Text style={styles.text}>Problem</Text>
        <View
          style={{
            ...styles.textInput,
          }}
        >
          <Picker
            mode="dropdown"
            selectedValue={state.problem}
            style={{
              marginLeft: -8,
              width: "100%",
            }}
            onValueChange={(itemValue, itemIndex) =>
              dispatch({ type: "problem", value: itemValue })
            }
          >
            <Picker.Item label="Need Food" value="Need Food" />

            <Picker.Item
              label="Need Medical Attention"
              value="Need Medical Attention"
            />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
        {state.problem == "Other" && (
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              dispatch({ type: "otherProblem", value: text });
            }}
          ></TextInput>
        )}
        {state.address != "" && (
          <View>
            <Text style={{ color: Color.BlackL, fontWeight: "bold" }}>
              Address
            </Text>
            <Text style={{ color: Color.BlackLL }}>
              {state.address.a1 +
                " " +
                state.address.a2 +
                " " +
                state.address.a3}
            </Text>
            <Text style={{ color: Color.BlackLL }}>
              {"Pin " + state.address.pin}
            </Text>
          </View>
        )}
        <View style={styles.button}>
          <Button
            title={state.addressTitle}
            color={Color.PrimaryColor}
            onPress={locationHandler}
            disabled={state.disableAddressButton}
          ></Button>
        </View>
        <View style={{ ...debugMode.debug, ...styles.horizontal }}>
          <Text style={styles.text}>Description</Text>
          <Text style={{ ...styles.verify, ...debugMode.debug }}>
            {state.description.length}/{800}
          </Text>
        </View>

        <TextInput
          multiline
          numberOfLines={5}
          maxLength={800}
          style={{
            ...styles.textInput,
            textAlignVertical: "top",
            paddingTop: 4,
          }}
          value={state.description}
          onChangeText={(text) => {
            dispatch({ type: "description", value: text });
          }}
        ></TextInput>
        {state.showError != "" && (
          <Text style={{ color: "red", fontWeight: "bold" }}>
            {state.showError}
          </Text>
        )}
        <View style={styles.button}>
          <Button
            title="Submit"
            style={styles.button}
            color={Color.PrimaryColor}
            onPress={handleSubmit}
            disabled={disableSubmit}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
}

const validateData = (state) => {
  let contactReg = /^\d{10}$/;
  let nameReg = /^[a-zA-Z][a-zA-Z ]*$/;
  let numMembersReg = /^[1-9]$|^1[0-5]$/;

  if (!state.name.match(nameReg))
    return {
      status: false,
      msg: ErrorMsgs.nameAlphabaetical,
    };
  if (!state.numMembers.match(numMembersReg))
    return {
      status: false,
      msg: ErrorMsgs.familyMemberMax,
    };
  if (!state.contact.match(contactReg))
    return {
      status: false,
      msg: ErrorMsgs.mobileNoTenDigits,
    };

  if (state.problem == "") {
    //console.error("Printing" + state.profession);
    return {
      status: false,
      msg: "Problem can't be empty",
    };
  }
  if (state.problem == "Other" && state.otherProblem == "") {
    //console.error("Printing" + state.profession);
    return {
      status: false,
      msg: "Problem can't be empty",
    };
  }
  if (state.address == "")
    return {
      status: false,
      msg: "Address can't be empty",
    };
  if (state.location == "")
    return {
      status: false,
      msg: "Location can't be empty",
    };
  if (state.description == "" || state.description.length < 20)
    return {
      status: false,
      msg: ErrorMsgs.descriptionMinimum,
    };
  return {
    status: true,
  };
};

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
    fontSize: 14,
    lineHeight: 20,
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
    color: Color.BlackLLL,
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
