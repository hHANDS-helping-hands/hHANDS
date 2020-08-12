import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Color from "../constants/colors";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { AxiosGetReq, AxiosPostReq } from "../utilities/AxiosReq";
import { useSelector } from "react-redux";
import { getData, Keys, storeData } from "../utilities/AsyncStorage";
import { TextValues } from "../constants/stringValues";

export default function AlternateFeedback(props) {
  var isMounted = true;
  const params = props.navigation.state.params;
  var recip = params && params.recip ? params.recip + "" : "7488663497";
  if (recip == "1") recip = "random";
  const username = "hhands";
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const [token] = useSelector((state) => {
    if (state.authentication.userData && state.authentication.userData.username)
      return [state.authentication.token];
    else return [""];
  });
  const [msglist, setmsglist] = useState([]);
  const [loading, setloading] = useState(true);
  const [feedback, setFeedback] = useState("");

  const renderFooter = () => {
    return (
      loading && (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator animating size="small" />
        </View>
      )
      //<View style={{ height: 4 }}></View>
    );
  };

  async function fetchFeedback() {
    if (loggedIn) {
      console.log(username + " " + recip);
      const response = await AxiosGetReq(
        { user: username, recip: recip },
        "/feedback",
        token
      );
      console.log("fetched feedback" + JSON.stringify(response.data.message));
      if (response && response.data.success && isMounted) {
        setmsglist(response.data.message.reverse());
      }
    }

    setloading(false);
  }

  async function postFeedback() {
    if (feedback) {
      setFeedback("");
      setloading(true);
      const response = await AxiosPostReq(
        { sender: username, msg: feedback, to: recip },
        "/feedback"
      );
      //console.log(response.data);

      setloading(false);
      console.log(response.data);
      if (response && response.data.success && isMounted) {
        setmsglist([
          { to: recip, msg: feedback, sender: username + "" },
          ...msglist,
        ]);
      }
    }
  }

  useEffect(() => {
    fetchFeedback();

    return () => {
      isMounted = false;
      console.log("cleaned up, feedback screen");
      params.fetchFeedback();
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Color.PrimaryColor}
        barStyle="light-content"
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          zIndex: -1,
        }}
      >
        <Text
          style={{
            color: Color.Placeholder,
            fontSize: 16,
            textAlign: "center",
            lineHeight: 30,
            marginBottom: 20,
            padding: 24,
          }}
        >
          {TextValues.feedbackWelcomeNote}
        </Text>
        {/* <Text
          style={{
            color: Color.Placeholder,
            fontSize: 22,
            textAlign: "center",
            lineHeight: 30,
            padding: 8,
          }}
        >
          Your support will help us extending out our helping hands to the ones
          in need.
        </Text> */}
      </View>
      <FlatList
        ListFooterComponent={renderFooter}
        inverted
        style={{
          marginTop: 4,
          marginBottom: 4,
          borderColor: "green",
          borderWidth: 0,
          padding: 4,
        }}
        data={msglist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              padding: 8,
              backgroundColor:
                item.sender == "hhands"
                  ? Color.PrimaryColor
                  : Color.SecondaryColor,
              direction: "row",
              alignSelf: item.sender == "hhands" ? "flex-end" : "flex-start",
              borderRadius: 4,
              marginBottom: 8,
              marginRight: item.sender == "hhands" ? 0 : 40,
              marginLeft: item.sender == "hhands" ? 40 : 0,
            }}
          >
            <Text
              style={{
                width: "auto",
                color: Color.White,
                alignSelf: "auto",
              }}
            >
              {item.msg}
            </Text>
          </View>
        )}
      ></FlatList>
      <View
        style={{ flexDirection: "row", alignItems: "flex-end", padding: 4 }}
      >
        <TextInput
          multiline
          numberOfLines={3}
          onChangeText={(text) => {
            setFeedback(text);
          }}
          value={feedback}
          style={{
            borderColor: Color.SecondaryColor,
            borderWidth: 2,
            borderRadius: 4,
            padding: 4,
            textAlignVertical: "top",
            backgroundColor: "white",
            marginBottom: 0,
            paddingLeft: 4,
            flex: 1,
            marginRight: 4,
            //width: "75%",
          }}
        ></TextInput>
        <TouchableOpacity onPress={postFeedback}>
          <MaterialIcons name="send" size={36} color={Color.SecondaryColor} />
        </TouchableOpacity>
      </View>
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
