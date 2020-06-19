import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default function MapPreview(props) {
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.01922,
  };
  const selectPlaceHandler = (event) => {
    console.log(event);
  };
  return (
    <MapView
      region={mapRegion}
      style={styles.mapStyle}
      onPress={selectPlaceHandler}
      showsUserLocation={true}
    ></MapView>
  );
}
const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
