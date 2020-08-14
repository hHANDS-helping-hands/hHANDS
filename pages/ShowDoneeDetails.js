import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TextInput,
  Linking,
} from "react-native";
import Color from "../constants/colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import ShowMap from "../components/MapPreview";
import { AxiosGetReq, AxiosPostReq } from "../utilities/AxiosReq";
import CustomAlert from "../utilities/CustomAlert";
import { useSelector } from "react-redux";
import { CustomCancelAlert } from "../utilities/CustomAlert";

export default function ShowDoneeDetails(props) {
  const token = useSelector((state) => state.authentication.token);
  const username = useSelector((state) =>
    state.authentication.userData ? state.authentication.userData.username : ""
  );
  const params = props.navigation.state.params;
  //console.log(JSON.stringify(params));
  if (params.ticket) {
    var ticket = params.ticket;
    var contact = ticket.contact;
    var name = ticket.name;
    var problem = ticket.problem;
    var gender = ticket.gender;
    var id = ticket.id;
    var address =
      ticket.address.a1 +
      ", " +
      ticket.address.a2 +
      ", " +
      ticket.address.a3 +
      ", " +
      ticket.address.pin;
    var location = {
      longitude: ticket.location.coordinates[0],
      latitude: ticket.location.coordinates[1],
    };
    var description = ticket.description;
  } else {
    var name = "Anurag";
    var contact = "9472627441";
    var gender = "Male";
    var problem = "Need food";
    var address = "Some Address";
    var location = { latitude: 37.78, longitude: -122.43 };
    var description = "I am fucking hungry";
  }
  const [report, setReport] = useState(false);
  const [reportText, setReportText] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const getNativeTime = () => {
    id = id.substring(0, id.length - 4);
    let temp = new Date(parseInt(id)).toLocaleString();
    return temp;
  };

  let time = getNativeTime();

  const reportPost = async () => {
    setDisableButton(true);
    const response = await AxiosGetReq(
      { id: id, report: reportText },
      "/reportPost",
      token
    );
    if (response && response.data.success) {
      console.log(response.data);
      CustomAlert("Reported", "You have reported this ticket");
      setReport(false);
      setReportText("");
    }
    setDisableButton(false);
  };

  const deleteTicket = async (ticket) => {
    const response = await AxiosPostReq(
      { ticket: ticket },
      "/deleteTicket",
      token
    );
    if (response && response.data.success)
      CustomAlert("Post Deleted", "You have successfully deleted the post");
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Color.PrimaryColor}
        barStyle="light-content"
      />
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <View style={styles.subContainer}>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.Text}>{name}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.text}>Gender</Text>
          <Text style={styles.Text}>{gender}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.text}>Time</Text>
          <Text style={styles.Text}>{time}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={{ ...styles.text, ...debugMode.debug }}>Contact</Text>
          <Text style={styles.Text}>{contact}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.text}>Problem</Text>
          <Text style={styles.Text}>{problem}</Text>
        </View>
        <Text style={styles.text}>Address</Text>
        <Text style={styles.Text}>{address}</Text>
        <Text style={styles.text}>Description</Text>
        <Text
          multiline
          numberOfLines={5}
          style={{
            ...styles.Text,
            textAlignVertical: "top",
            paddingTop: 4,
          }}
        >
          {description}
        </Text>
        <View style={{ width: "100%", height: 200 }}>
          <ShowMap
            userLocation={location}
            markLocation
            tappedLocation={location}
          ></ShowMap>
        </View>
        {/* <View style={{ ...styles.button, width: "auto", alignSelf: "center" }}> */}
        <Button
          title="Direction"
          color={Color.PrimaryColor}
          onPress={() => {
            Linking.openURL(
              "https://www.google.com/maps/dir/?api=1&destination=" +
                location.latitude +
                "," +
                location.longitude
            );
          }}
        ></Button>
        {/* </View> */}
        {token ? (
          username + "" == ticket.srcContact + "" ? (
            <TouchableOpacity
              onPress={() => {
                CustomCancelAlert(
                  "Delete",
                  "To delete this post, press ok",
                  deleteTicket,
                  ticket
                );
                //LogOutHandler(dispatch, props);
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: Color.BlackL,
                  textDecorationLine: "underline",
                  color: Color.SecondaryColor,
                  marginBottom: 4,
                  marginTop: 4,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setReport(!report);
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: Color.BlackL,
                  textDecorationLine: "underline",
                  color: Color.SecondaryColor,
                  marginBottom: 4,
                  marginTop: 4,
                }}
              >
                Report
              </Text>
            </TouchableOpacity>
          )
        ) : (
          <Text
            style={{
              textAlign: "right",
              color: Color.BlackL,
              //textDecorationLine: "underline",
              color: Color.SecondaryColor,
              marginBottom: 4,
            }}
          >
            Please login to report
          </Text>
        )}
        {report && (
          <View>
            <TextInput
              multiline
              autoFocus
              numberOfLines={5}
              onChangeText={(text) => setReportText(text)}
              value={reportText}
              style={{
                borderWidth: 1,
                textAlignVertical: "top",
                borderColor: Color.SecondaryColor,
                borderRadius: 4,
                padding: 4,
                marginBottom: 8,
              }}
            ></TextInput>
            <Button
              title="Report"
              color={Color.SecondaryColor}
              disabled={disableButton}
              onPress={reportPost}
            ></Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.PrimaryColor,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Color.White,
  },
  subContainer: {
    flexDirection: "row",
  },
  textInput: {
    borderColor: Color.SecondaryColor,
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: "top",
    textAlignVertical: "center",
    marginBottom: 12,
    paddingLeft: 4,
  },
  text: {
    color: Color.BlackL,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  Text: {
    color: Color.BlackLL,
    fontSize: 14,
    marginBottom: 8,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verify: {
    color: Color.White,
    backgroundColor: Color.SecondaryColor,
    borderRadius: 5,
    paddingLeft: 2,
    paddingRight: 2,
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    marginBottom: 12,
    marginTop: 12,
    width: "100%",
  },
});
