import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";
import Color from "../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import debugMode from "../constants/debug";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { AxiosGetReq, AxiosPostReq } from "../utilities/AxiosReq";
import { useSelector } from "react-redux";
import { getData, Keys, storeData } from "../utilities/AsyncStorage";
import { TextValues } from "../constants/stringValues";

export default function AdminFeedback(props) {
  var isMounted = true;
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const [token, username] = useSelector((state) => {
    if (state.authentication.userData && state.authentication.userData.username)
      return [
        state.authentication.token,
        state.authentication.userData.username + "",
      ];
    else return ["", "random"];
  });
  const [msglist, setmsglist] = useState([]);
  const [loading, setloading] = useState(true);

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

  const renderSeparator = () => {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Color.Placeholder,
          marginLeft: 48,
        }}
      ></View>
    );
    //<View style={{ height: 4 }}></View>
  };

  const fetchFeedback = async () => {
    console.log("inside fetchfeedback");

    if (loggedIn) {
      const response = await AxiosGetReq({}, "/adminFeedback", token);
      console.log("fetched feedback" + JSON.stringify(response.data.message));
      if (response && response.data.success && isMounted) {
        setmsglist(response.data.message);
      }
    }

    setloading(false);
  };

  const [refreshing, setRefreshing] = useState(false);

  const refreshHandler = async () => {
    setRefreshing(true);
    console.log("refreshing");
    await fetchFeedback();
    setRefreshing(false);
  };

  useEffect(() => {
    console.log("calling fetchfeedback");
    fetchFeedback();

    return () => {
      isMounted = false;
      console.log("cleaned up, feedback screen");
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Color.PrimaryColor}
        barStyle="light-content"
      />

      <FlatList
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={renderSeparator}
        onRefresh={refreshHandler}
        refreshing={refreshing}
        style={{
          marginBottom: 4,
          padding: 4,
          borderWidth: 2,
        }}
        data={msglist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("AlternateFeedback", {
                recip: item._id,
                fetchFeedback: fetchFeedback,
              });
              console.log("clicked");
            }}
          >
            <View
              style={{
                marginTop: 4,
                padding: 8,
                flexDirection: "row",
                borderRadius: 4,
                marginBottom: 8,
              }}
            >
              <Image
                source={
                  item.gender == "Male"
                    ? require("../assets/avatars/boy1.png")
                    : require("../assets/avatars/girl1.png")
                }
                style={{ width: 32, height: 32 }}
              />
              <View style={{ flexDirection: "column", marginLeft: 8 }}>
                <Text
                  style={{
                    width: "auto",
                    color: Color.Black,
                    alignSelf: "auto",
                    fontSize: 16,
                    color: Color.BlackL,
                  }}
                >
                  {item.name ? item.name : "Random"}
                </Text>
                <Text
                  style={{
                    width: "auto",
                    color: Color.Black,
                    alignSelf: "auto",
                    color: Color.BlackL,
                    fontSize: 14,
                  }}
                >
                  {item.msg}
                </Text>
              </View>
              <Text
                style={{
                  width: "auto",
                  color: Color.Black,
                  flex: 1,
                  alignSelf: "flex-end",
                  textAlign: "right",
                  color: Color.Placeholder,
                }}
              >
                {getNativeTime(item.timestamp)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
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

const getNativeTime = (id) => {
  //id = id.substring(0, id.length - 4);
  let temp = new Date(parseInt(id));

  if (Math.abs(temp.getYear() - new Date().getYear())) {
    if (Math.abs(temp.getYear() - new Date().getYear()) == 1)
      return "a year ago";
    return Math.abs(temp.getYear() - new Date().getYear()) + " years ago";
  }
  if (Math.abs(temp.getMonth() - new Date().getMonth())) {
    if (Math.abs(temp.getMonth() - new Date().getMonth()) == 1)
      return "a month ago";
    return Math.abs(temp.getMonth() - new Date().getMonth()) + " months ago";
  }
  if (Math.abs(temp.getDate() - new Date().getDate())) {
    if (Math.abs(temp.getDate() - new Date().getDate()) == 1)
      return "a day ago";
    return Math.abs(temp.getDate() - new Date().getDate()) + " days ago";
  }

  return "today";
};
