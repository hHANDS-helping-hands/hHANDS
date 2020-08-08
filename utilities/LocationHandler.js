import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native";
import { Alerts } from "../constants/stringValues";

const verifyPermission = async () => {
  const result = await Permissions.askAsync(Permissions.LOCATION);
  if (result.status !== "granted") {
    Alert.alert(
      "Insufficient Permissions",
      "you need to grant location permission to use this app",
      [{ text: "Okay" }]
    );

    return false;
  }
  return true;
};

const getLocationHandler = async (setIsFetching, timeout = 5000) => {
  const hasPermission = await verifyPermission();
  if (!hasPermission) return false;
  if (setIsFetching) setIsFetching(true);
  try {
    const location = await Location.getCurrentPositionAsync({
      timeout: timeout,
    });
    console.log(location);
    return location;
  } catch (error) {
    Alert.alert(
      Alerts.couldNotFetchLocation.title,
      Alerts.couldNotFetchLocation.description,
      [{ text: "Okay" }]
    );
    return false;
  }
  if (setIsFetching) setIsFetching(false);
};

export { verifyPermission, getLocationHandler };
