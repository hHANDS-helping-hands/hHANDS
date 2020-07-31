import React from "react";
import { Image, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// navigator.geolocation = require('@react-native-community/geolocation');
// navigator.geolocation = require('react-native-geolocation-service');

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Enter Location"
      minLength={2}
      autoFocus={false}
      returnKeyType={"default"}
      debounce={500}
      //fetchDetails={true}
      styles={{
        textInputContainer: {
          backgroundColor: "rgba(0,0,0,0)",
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: "#5d5d5d",
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
        container: {
          width: "100%",
        },
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        //console.log("Location pressed here");
        //console.log(data, details);
      }}
      query={{
        key: "AIzaSyBp9rsue5x9eXKwTG4B5IL29zDBIyjHfwI",
        language: "en",
        components: "country:ind",
      }}
      //   currentLocation={true}
      //   currentLocationLabel="Current location"
    />
  );
};

export default GooglePlacesInput;
