import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import dataGenerator from "../utilities/DataGenerator";
import Color from "../constants/colors";
import debugMode from "../constants/debug";
import Card from "../components/Card";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { MaterialIcons, Feather } from "@expo/vector-icons";

export default function ShowList(props) {
  //console.log(props);
  //DATA = dataGenerator(20);
  var DATA = props.tickets;

  const [refreshing, setRefreshing] = useState(false);

  const renderFooter = () => {
    if (props.loading)
      return (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator animating size="small" />
        </View>
      );
    else if (props.showNoDoneeFound) {
      if (props.tickets.length == 0)
        return (
          <View style={{ padding: 16 }}>
            <Text style={{ color: Color.BlackLL, paddingRight: 16 }}>
              We could not find any DONEE around you. Please add people in need
              as DONEE to help them. Happy helping.
            </Text>
          </View>
        );
    }
    return <View style={{ height: 4 }}></View>;
  };

  const refreshHandler = async () => {
    if (props.onRefresh) {
      setRefreshing(true);
      await props.onRefresh();
      setRefreshing(false);
    }
  };

  const getNativeTime = (id) => {
    id = id.substring(0, id.length - 4);
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

  return (
    <FlatList
      ListHeaderComponent={props.header}
      ListFooterComponent={renderFooter}
      onRefresh={refreshHandler}
      refreshing={refreshing}
      style={{
        marginTop: props.titleHeight,
        marginBottom: props.marginBottom,
        backgroundColor: Color.White,
      }}
      data={DATA}
      renderItem={({ item }) => {
        let time = getNativeTime(item.id);
        console.log(time);

        return (
          <Card style={{ margin: 4, borderRadius: 4, marginBottom: 0 }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ShowDoneeDetails", { ticket: item });
              }}
            >
              <View style={{ ...styles.doneeDetail, ...debugMode.debug }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity>
                    {/* <MaterialIcons
                    name="account-circle"
                    size={24}
                    color={Color.PrimaryColor}
                  /> */}
                    <Image
                      source={
                        item.gender == "Male"
                          ? require("../assets/avatars/boy1.png")
                          : require("../assets/avatars/girl1.png")
                      }
                      style={{ width: 24, height: 24 }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      flex: 1,
                      textAlign: "right",
                      color: Color.Placeholder,
                    }}
                  >
                    {time}
                  </Text>
                </View>
                <Text style={{ color: Color.SecondaryColor, fontSize: 14 }}>
                  {item.problem}
                </Text>
                <Text style={{ color: Color.BlackLL, fontSize: 14 }}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  doneeDetail: {
    margin: 4,
  },
  name: {
    fontSize: 16,
    color: Color.BlackL,
    marginLeft: 4,
  },
});
