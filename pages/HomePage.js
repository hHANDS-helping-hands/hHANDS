import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Image,
  Switch,
} from "react-native";
import Color from "../constants/colors";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import ShowMap from "../components/MapPreview";
import ShowList from "../components/ShowList";
import debugMode from "../constants/debug";
import { TouchableOpacity } from "react-native-gesture-handler";
import LoginModal from "../components/LoginModal";
import Screens from "../constants/screens";
import { getLocationHandler } from "../utilities/LocationHandler";
import { AxiosGetReq } from "../utilities/AxiosReq";
import { setLocation, setTicketList } from "../store/actions/inMemoryData";
import CustomAlert from "../utilities/CustomAlert";

export default function HomePage(props) {
  var isMounted = true;
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const dispatchStore = useDispatch();
  const [destination, setDestination] = useState("");
  const [dataLoading, setDataLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [mapView, setMapView] = useState({
    state: true,
    buttonText: "Map",
  });

  const [titleHeight, setTitleHeight] = useState(0);
  const location = useSelector((state) => state.inMemoryData.location);
  const ticketList = useSelector((state) => state.inMemoryData.ticketList);
  const userData = useSelector((state) => state.authentication.userData);

  const fetchTickets = async (currentLocation) => {
    if (!currentLocation) currentLocation = location;
    let response = await AxiosGetReq(
      {
        long: currentLocation.longitude,
        lat: currentLocation.latitude,
      },
      "/posts"
    );
    console.log(
      "printing tickets in Homepage" +
        JSON.stringify(response.data.message.length)
    );
    if (response && response.data.success) {
      if (response.data.message.length == 0) {
        CustomAlert(
          "No Donee Found",
          "We could not find any DONEE around you. Please add people in need as DONEE to help them. \nHappy helping."
        );
      }
      dispatchStore(setTicketList(response.data.message));
      //setMarkers(response.data.message);
    }
  };

  const fetchLocationThenTicket = async () => {
    setDataLoading(true);
    let currentLocation = await getLocationHandler();
    if (currentLocation && currentLocation.coords) {
      dispatchStore(
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        })
      );

      await fetchTickets({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    }
    setDataLoading(false);
  };

  useEffect(() => {
    console.log("first render");
    fetchLocationThenTicket();
    return () => {
      isMounted = false;
      console.log("cleaned up, home page");
    };
  }, []);

  const handleAddDonee = () => {
    if (loggedIn) props.navigation.navigate(Screens.DoneeDetailsPage);
    else {
      setDestination(Screens.DoneeDetailsPage);
      setIsVisible(true);
    }

    //console.log("add donee pressed");
  };

  // const handleViewInList = () => {
  //   if (mapView.state)
  //     setMapView({
  //       state: false,
  //       buttonText: "View in Map",
  //     });
  //   else
  //     setMapView({
  //       state: true,
  //       buttonText: "View in List",
  //     });
  //   //console.log("view in list pressed");
  // };

  const handleFeedback = () => {
    props.navigation.navigate(Screens.Feedback);
    //console.log("filter button pressed");
  };

  const handleAccount = () => {
    if (loggedIn) props.navigation.navigate("ProfilePage");
    else {
      setDestination("ProfilePage");
      setIsVisible(true);
    }
    //console.log("account icon clicked");
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
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: mapView.state ? Color.Black : Color.White,
            opacity: mapView.state ? 0.2 : 1,
          }}
        ></View>
        <TouchableOpacity onPress={handleAccount}>
          <Image
            source={
              userData && userData.gender == "Female"
                ? require("../assets/avatars/girl1.png")
                : require("../assets/avatars/boy1.png")
            }
            style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>
        <View style={{ ...styles.button, paddingRight: 8 }}>
          <Switch
            onValueChange={() => {
              console.log("value changed");
              setMapView(
                mapView.state
                  ? { state: false, buttonText: "List" }
                  : { state: true, buttonText: "Map" }
              );
            }}
            thumbColor={Color.SecondaryColor}
            trackColor={{
              true: Color.White,
              false: Color.BlackLLL,
            }}
            value={mapView.state}
          />
          <Text style={styles.text}>{mapView.buttonText}</Text>
        </View>
        <LoginModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          dispatchStore={dispatchStore}
          destination={destination}
          navigation={props.navigation}
        ></LoginModal>

        <TouchableOpacity onPress={handleFeedback}>
          <View style={styles.button}>
            <Text style={styles.text}>Feedback</Text>
          </View>
        </TouchableOpacity>
        {}
      </View>
      <View
        style={{
          ...styles.horBar,
          top: titleHeight,
          zIndex: 10,
        }}
      ></View>
      <View style={{ ...styles.mapContainer, ...debugMode.debug }}>
        {mapView.state ? (
          <View style={{ flex: 1, width: "100%" }}>
            <ShowMap
              coordinates={ticketList}
              userLocation={location}
              navigation={props.navigation}
            ></ShowMap>
            <View style={styles.gpsButton}>
              <TouchableOpacity onPress={fetchLocationThenTicket}>
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
        ) : (
          <ShowList
            style={{ backgroundColor: "pink" }}
            titleHeight={titleHeight}
            marginBottom={60}
            tickets={ticketList}
            loading={dataLoading}
            navigation={props.navigation}
            onRefresh={fetchTickets}
            showNoDoneeFound={true}
          ></ShowList>
        )}
      </View>
      <View style={styles.bottomBar}>
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
  gpsButton: {
    position: "absolute",
    bottom: 100,
    right: 40,
  },
  horBar: {
    position: "absolute",
    left: 0,
    //borderBottomColor: "#ffffff",
    borderColor: Color.Placeholder,
    borderBottomWidth: 0.8,
    width: "100%",
    height: 1,
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
    padding: 14,
    margin: 0,
    paddingLeft: 10,
    paddingRight: 10,
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
    fontSize: 16,
    paddingLeft: 4,
  },
});
