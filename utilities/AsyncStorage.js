import AsyncStorage from "@react-native-community/async-storage";

const storeData = async (key, value) => {
  try {
    console.log("storing " + value);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log("got value " + jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const Keys = {
  loginCredential: "loginCredential",
  userData: "userData",
  token: "token",
  loggedIn: "loggedIn",
  feedbackList: "feedbackList",
};

export { storeData, getData, Keys };
