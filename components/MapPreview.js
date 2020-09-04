import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import debugmode from "../constants/debug";

import Color from "../constants/colors";
export default function MapPreview(props) {
  const mapRegion = {
    latitude: props.userLocation.latitude,
    longitude: props.userLocation.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
    // latitude: 22.0084312,
    // longitude: 82.4118888,
    // latitudeDelta: 26.922,
    // longitudeDelta: 26.922,
  };
  const tappedLocation = props.tappedLocation;
  const setTappedLocation = props.setTappedLocation;
  var marker = null;

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
              if (index == 0 && _marker) {
                _marker.showCallout();
              }
            }}
            onCalloutPress={() => {
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
