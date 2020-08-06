import React, { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import debugmode from "../constants/debug";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Color from "../constants/colors";
import ShowDoneeDetails from "../pages/ShowDoneeDetails";
import { hasStartedLocationUpdatesAsync } from "expo-location";
import Config from "../utilities/Config";
export default function MapPreview(props) {
  const mapRegion = {
    latitude: props.userLocation.latitude,
    longitude: props.userLocation.longitude,
    latitudeDelta: 0.00222,
    longitudeDelta: 0.00922,
  };
  const tappedLocation = props.tappedLocation;
  const setTappedLocation = props.setTappedLocation;
  var marker = null;
  var flag = null;
  const selectPlaceHandler = (event) => {
    if (setTappedLocation)
      setTappedLocation({
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      });
  };
  return (
    <MapView
      key={0}
      region={mapRegion}
      style={styles.mapStyle}
      onPress={selectPlaceHandler}
      showsUserLocation={true}
      showsMyLocationButton={false}
      showsCompass={false}
      onRegionChangeComplete={() => flag && flag.showCallout()}
    >
      {props.coordinates &&
        props.coordinates.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              longitude: item.location.coordinates[0],
              latitude: item.location.coordinates[1],
            }}
            ref={(_marker) => {
              if (!flag) flag = _marker;
            }}
            onCalloutPress={() => {
              //console.log("Callout pressed");
              props.navigation.navigate("ShowDoneeDetails", { ticket: item });
            }}
            title={item.name}
            description={item.problem}
            pinColor={Color.SecondaryColor}
            style={debugmode.debug}
          />
        ))}
      {props.markLocation && (
        <Marker
          title="Map"
          ref={(_marker) => {
            marker = _marker;
          }}
          description="description"
          pinColor={Color.SecondaryColor}
          coordinate={tappedLocation}
          onPress={() => {
            marker.hideCallout();
          }}
        />
      )}
    </MapView>
  );
}
const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
