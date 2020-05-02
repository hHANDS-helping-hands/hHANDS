import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  StatusBar
} from "react-native";
import Color from "../constants/colors";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import accountSvg from "../assets/account.svg";
import ShowMap from "../components/MapPreview";
import ShowList from "../components/ShowList";
import debugMode from "../constants/debug";
import { TouchableOpacity } from "react-native-gesture-handler";
import LoginModal from "../components/LoginModal";

export default function HomePage(props) {
  console.log("something" + accountSvg);
  console.log("something below");

  const [mapView, setMapView] = useState(true);

  const handleAddDonee = () => {
    console.log("add donee pressed");
  };

  const handleViewInList = () => {
    setMapView(false);
    console.log("view in list pressed");
  };

  const handleFilter = () => {
    console.log("filter button pressed");
  };
  const handleAccount = () => {
    console.log("account icnon clicked");
  };

  return (
    <View style={{ ...styles.container, ...debugMode.debug }}>
      <View style={{ ...styles.header, ...debugMode.debug }}>
        <TouchableOpacity onPress={handleAccount}>
          <MaterialIcons
            name="account-circle"
            size={36}
            color={Color.PrimaryColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleViewInList}>
          <View style={styles.button}>
            <Feather name="list" size={18} color={Color.White} />
            <Text style={styles.text}>View in List</Text>
          </View>
          <LoginModal></LoginModal>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFilter}>
          <View style={styles.button}>
            <Feather name="filter" size={18} color={Color.White} />
            <Text style={styles.text}>Filter</Text>
          </View>
        </TouchableOpacity>
        {/* <Button title="View in List" color={Color.White}/>
        <Button title="Filter" color={Color.White} /> */}
      </View>
      <View style={{ ...styles.mapContainer, ...debugMode.debug }}>
        {mapView ? (
          <ShowMap></ShowMap>
        ) : (
          <ShowList
            style={{ ...debugMode.debug, backgroundColor: "pink" }}
          ></ShowList>
        )}
      </View>
      <View style={{ ...styles.bottomBar, ...debugMode.debug }}>
        <Button
          title="Add Donee"
          style={{ ...styles.addButton }}
          color={Color.PrimaryColor}
          onPress={handleAddDonee}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    alignItems: "center",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  mapContainer: {
    flex: 1,
    width: "100%",
    borderColor: "white",
    borderWidth: 0,
    padding: 0
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    padding: 20
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 12,
    margin: 0,
    paddingLeft: 4,
    paddingRight: 4,
    alignItems: "center",
    zIndex: 1
  },
  addButton: {},
  button: {
    backgroundColor: Color.PrimaryColor,
    borderRadius: 4,
    padding: 4,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: Color.White,
    fontSize: 18,
    paddingLeft: 4
  }
});
