import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default function MapPreview(props) {
  var imageUrl =
    "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyBgXwH9fSvwq2wf-Luzwf75nxy5nZb3L0k";

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922
  };
  return <MapView regions={mapRegion} style={styles.mapStyle}></MapView>;
}
const styles = StyleSheet.create({
  mapStyle: {
    flex: 1
  }
});
