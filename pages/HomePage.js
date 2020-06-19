import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  StatusBar,
} from "react-native";
import Color from "../constants/colors";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import ShowMap from "../components/MapPreview";
import ShowList from "../components/ShowList";
import debugMode from "../constants/debug";
import { TouchableOpacity } from "react-native-gesture-handler";
import LoginModal from "../components/LoginModal";
import Screens from "../constants/screens";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/CustomButton";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function HomePage(props) {
  console.log("HomePage", props);
  const [mapView, setMapView] = useState({
    state: true,
    buttonText: "View in List",
  });

  const [titleHeight, setTitleHeight] = useState(0);
  const handleAddDonee = () => {
    props.navigation.navigate(Screens.DoneeDetailsPage);
    console.log("add donee pressed");
  };

  const handleViewInList = () => {
    console.log(mapView.state);
    if (mapView.state)
      setMapView({
        state: false,
        buttonText: "View in Map",
      });
    else
      setMapView({
        state: true,
        buttonText: "View in List",
      });
    console.log("view in list pressed");
  };

  const handleFilter = () => {
    console.log("filter button pressed");
  };
  const handleAccount = () => {
    console.log("account icon clicked");
    props.navigation.openDrawer();
  };

  return (
    <View style={{ ...styles.container, ...debugMode.debug }}>
      <StatusBar
        backgroundColor={Color.PrimaryColor}
        barStyle="light-content"
      />
      <View
        style={{ ...styles.header, ...debugMode.debug }}
        onLayout={(event) => {
          setTitleHeight(event.nativeEvent.layout.height);
        }}
      >
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
            <Text style={styles.text}>{mapView.buttonText}</Text>
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
      <View
        style={{
          position: "absolute",
          top: titleHeight,
          left: 0,
          //borderBottomColor: "#ffffff",
          borderColor: Color.Placeholder,
          borderBottomWidth: 0.8,
          width: "100%",
          height: 1,
          zIndex: 0,
        }}
      ></View>
      <View style={{ ...styles.mapContainer, ...debugMode.debug }}>
        {mapView.state ? (
          <ShowMap></ShowMap>
        ) : (
          <ShowList
            style={{ ...debugMode.debug, backgroundColor: "pink" }}
            titleHeight={titleHeight}
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
    //marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mapContainer: {
    flex: 1,
    width: "100%",
    borderColor: "white",
    borderWidth: 0,
    padding: 0,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    padding: 20,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 18,
    margin: 0,
    paddingLeft: 4,
    paddingRight: 4,
    alignItems: "center",
    zIndex: 1,
  },
  addButton: {},
  button: {
    backgroundColor: Color.PrimaryColor,
    borderRadius: 4,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Color.White,
    fontSize: 18,
    paddingLeft: 4,
  },
});

HomePage.navigationOptions = (navData) => {
  return {
    headerTitle: "HomePage",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            console.log("Menu button clicked");
            navData.navigation.toggleDrawer();
          }}
          color={Colors.PrimaryColor}
        />
      </HeaderButtons>
    ),
  };
};
console.log("HomePage after setting navigationOption", HomePage);
