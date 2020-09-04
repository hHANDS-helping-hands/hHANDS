import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import Color from "../constants/colors";
import Screens from "../constants/screens";
import debugMode from "../constants/debug";
import Card from "../components/Card";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ShowList from "../components/ShowList";
import boy1 from "../assets/avatars/boy1.png";
import { useDispatch } from "react-redux";
import {
  logout,
  setToken,
  setUserData,
  setCredential,
} from "../store/actions/authentication";
import { AxiosGetReq } from "../utilities/AxiosReq";
import Axios from "axios";
import { CustomCancelAlert } from "../utilities/CustomAlert";
import { useSelector } from "react-redux";

export default function ProfilePage(props) {
  const dispatch = useDispatch();
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState([]);

  //const params = props.navigation.state.params;
  const token = useSelector((state) => state.authentication.token);
  var isMounted = true;
  const userData = useSelector((state) => state.authentication.userData);

  const fetchTickets = async () => {
    setDataLoading(true);
    const response = await AxiosGetReq({}, "/myposts", token);
    //console.log(response.data);
    if (isMounted && response && response.data.success) {
      setData(response.data.message);
    } else if (!response.data.success) {
      props.navigation.goBack();
    }
    setDataLoading(false);
  };

  const LogOutHandler = (dispatch, props) => {
    dispatch(logout());
    dispatch(setToken(null));
    dispatch(setUserData(null));
    dispatch(setCredential(null));

    props.navigation.goBack();
  };

  useEffect(() => {
    fetchTickets();
    return () => {
      isMounted = false;
      console.log("cleaned up profile page");
    };
  }, []);

  const appendHeader = () => {
    return (
      <View>
        <Card
          style={{
            alignItems: "center",
            marginTop: 8,
            marginBottom: 4,
            shadowRadius: 0,
            borderRadius: 2,
            marginLeft: 4,
            marginRight: 4,
          }}
        >
          <View style={{ alignSelf: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("EditableUserData");
              }}
            >
              <FontAwesome name="edit" size={24} color={Color.BlackL} />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity> */}
          <Image
            source={
              userData && userData.gender == "Female"
                ? require("../assets/avatars/girl1.png")
                : require("../assets/avatars/boy1.png")
            }
          />
          {/* </TouchableOpacity> */}
          <Text
            style={{ fontSize: 16, color: Color.BlackL, fontWeight: "bold" }}
          >
            {userData ? userData.name : ""}
          </Text>
          <View style={styles.buttonContainer}>
            <View style={{ flex: 1, padding: 4 }}>
              <Button
                title="Feedback"
                color={Color.PrimaryColor}
                onPress={() => {
                  props.navigation.navigate(Screens.Feedback);
                }}
              ></Button>
            </View>
            <View style={{ flex: 1, padding: 4 }}>
              <Button
                title="LogOut"
                titleStyle={{ fontSize: 12 }}
                color={Color.SecondaryColor}
                onPress={() => {
                  CustomCancelAlert(
                    "Log out",
                    "You will be logged out, press ok",
                    LogOutHandler,
                    dispatch,
                    props
                  );
                  //LogOutHandler(dispatch, props);
                }}
              ></Button>
            </View>
          </View>
        </Card>
        <Card
          style={{
            marginBottom: 4,
            shadowRadius: 0,
            borderRadius: 2,
            marginLeft: 4,
            marginRight: 4,
          }}
        >
          <Text style={{ fontSize: 16, color: Color.BlackL }}>
            Age : {userData ? userData.age : ""}
          </Text>
          <Text style={{ fontSize: 16, color: Color.BlackL }}>
            Profession : {userData ? userData.profession : ""}
          </Text>
        </Card>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: Color.PrimaryColor,
            borderRadius: 2,
            //alignSelf: "flex-start",
            padding: 4,
            paddingRight: 8,
            paddingLeft: 4,
            marginLeft: 4,
            marginRight: 4,
          }}
        >
          <Text style={{ color: Color.White }}>Posts</Text>
        </View>
      </View>
    );
  };

  const name = "Anurag";

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Color.PrimaryColor}
        barStyle="light-content"
      />
      <ShowList
        style={{ ...debugMode.debug, backgroundColor: "pink" }}
        titleHeight={0}
        header={appendHeader}
        tickets={data}
        loading={dataLoading}
        navigation={props.navigation}
        onRefresh={fetchTickets}
      ></ShowList>
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
    paddingLeft: 4,
    paddingRight: 4,
  },

  buttonContainer: {
    marginTop: 8,
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-evenly",
  },
});
