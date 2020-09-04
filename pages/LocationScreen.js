import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  StatusBar,
  Keyboard,
} from "react-native";
import ShowMap from "../components/MapPreview";
import Color from "../constants/colors";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { getLocationHandler } from "../utilities/LocationHandler";
import debugMode from "../constants/debug";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Config from "../utilities/Config";

var initialState = {
  address1: "",
  address2: "",
  address3: "",
  pincode: "",
  location: "",
  showError: "",
};
console.log("ran right now");

export default function LocationScreen(props) {
  const {
    dispatchParent,
    locationParent,
    addressParent,
  } = props.navigation.state.params;
  const [tappedLocation, setTappedLocation] = useState(
    locationParent != "" ? locationParent : Config.initialLocation
  );
  var isMounted = true;
  const [location, setLocation] = useState(
    locationParent != "" ? locationParent : Config.initialLocation
  );
  const [showError, setError] = useState("");
  const [address, setAddress] = useState(
    addressParent != ""
      ? addressParent
      : {
          a1: "",
          a2: "",
          a3: "",
          pin: "",
        }
  );

  const _keyboardDidShow = () => {
    setError("");
  };

  const submitHandler = () => {
    var result = validateData(tappedLocation, address);
    if (result.status) {
      dispatchParent({ type: "location", value: tappedLocation });
      dispatchParent({
        type: "address",
        value: address,
      });
      dispatchParent({ type: "addressTitle", value: "Edit Location" });
      props.navigation.goBack();
      console.log("good to go");
    } else {
      setError(result.msg);
      console.log(showError);
    }
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    var location =
      locationParent != ""
        ? locationParent
        : getLocationHandler().then((location) => {
            if (isMounted && location) {
              setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
              setTappedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
            }
          });
    return () => {
      isMounted = false;
      console.log("cleaned up, location screen");
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
    };
  }, []);

  return (
    <View style={styles.statusContainer}>
      <StatusBar
        backgroundColor={Color.PrimaryColor}
        barStyle="light-content"
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{ flex: 1, ...debugMode.debug, backgroundColor: Color.White }}
      >
        <View
          style={{
            ...styles.container,
            ...debugMode.debug,
            borderColor: "red",
          }}
        >
          <View
            style={{
              ...debugMode.debug,
              borderColor: "white",
              ...styles.mapPreview,
            }}
          >
            <ShowMap
              userLocation={location}
              markLocation
              tappedLocation={tappedLocation}
              setTappedLocation={setTappedLocation}
            ></ShowMap>

            <View
              style={{
                position: "absolute",
                bottom: 40,
                right: 40,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  var location = getLocationHandler().then((location) => {
                    setLocation({
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    });
                  });
                }}
              >
                <MaterialIcons
                  name="my-location"
                  style={{
                    color: Color.White,
                    backgroundColor: Color.Placeholder,
                    borderColor: Color.BlackLLL,
                    borderWidth: 1,
                  }}
                  size={36}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              ...debugMode.debug,
              borderColor: "pink",
              ...styles.addressContainer,
            }}
          >
            <TextInput
              editable
              value={address.a1}
              style={{ ...styles.input }}
              placeholder="Address Line 1"
              onChangeText={(text) => {
                setAddress({ ...address, a1: text });
              }}
            ></TextInput>
            <TextInput
              editable
              value={address.a2}
              style={{ ...styles.input }}
              placeholder="Address Line 2"
              onChangeText={(text) => {
                setAddress({ ...address, a2: text });
              }}
            ></TextInput>
            <TextInput
              editable
              value={address.a3}
              style={{ ...styles.input }}
              placeholder="Address Line 3"
              onChangeText={(text) => {
                setAddress({ ...address, a3: text });
              }}
            ></TextInput>
            <TextInput
              editable
              value={address.pin}
              style={{ ...styles.input }}
              placeholder="Pin Code"
              keyboardType="number-pad"
              onChangeText={(text) => {
                setAddress({ ...address, pin: text });
              }}
            ></TextInput>
            {showError != "" && (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                {showError}
              </Text>
            )}
            <View style={{ ...styles.buttonContainer }}>
              <Button
                title="Submit"
                color={Color.PrimaryColor}
                onPress={submitHandler}
              ></Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    flex: 1,
    backgroundColor: Color.PrimaryColor,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Color.White,
  },
  container: {
    backgroundColor: Color.PrimaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  mapPreview: {
    width: "100%",
    borderColor: Color.Placeholder,
    borderWidth: 2,
    height: (Dimensions.get("window").height * 1) / 2,
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
  addressContainer: {
    width: "100%",
    backgroundColor: Color.White,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  buttonContainer: {
    marginTop: 40,
    width: "50%",
    justifyContent: "center",
  },
});

const validateData = (tappedLocation, address) => {
  let contactReg = /^\d{6}$/;
  console.log("Initial state" + JSON.stringify(initialState));
  if (address.a1 == "" && address.a2 == "" && address.a3 == "")
    return { status: false, msg: "Address not valid" };
  if (!address.pin.match(contactReg))
    return { status: false, msg: "Pincode must be of 6 digits" };

  return { status: true };
};
