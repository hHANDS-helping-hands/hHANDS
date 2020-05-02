import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator
} from "react-native";
import Color from "../constants/colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default function DoneeDetailsPage(props) {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "you need to grant location permission to use this app",
        [{ text: "Okay" }]
      );

      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;
    setIsFetching(true);
    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude
      });
    } catch (error) {
      Alert.alert(
        "could not fetch location",
        "Please try again or pick a location on map",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPreview}>
        {isFetching ? <ActivityIndicator /> : <Text>Location not chosen</Text>}
      </View>
      <Button
        title="Get location"
        onPress={() => {
          console.log("clicked");
          getLocationHandler();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.PrimaryColor,
    alignItems: "center",
    justifyContent: "center"
  },
  mapPreview: {
    width: "100%",
    borderColor: Color.Black,
    borderWidth: 4
  }
});
