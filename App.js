import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DotIndicator } from "react-native-indicators";
import Color from "./constants/colors";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import SplashScreen from "./pages/SplashScreen";
import Navigator from "./navigation/Navigator";
import { createStore, combineReducers } from "redux";
import authenticationReducer from "./store/reducers/authentication";
import inMemoryDataReducer from "./store/reducers/inMemoryData";
import { Provider } from "react-redux";
import store from "./store/store";

// const rootReducer = combineReducers({
//   authentication: authenticationReducer,
//   inMemoryData: inMemoryDataReducer,
// });

// const store = createStore(rootReducer);

const fetchFonts = () => {
  console.log("started loading");
  // return new Promise(function(resolve) {
  //   setTimeout(() => {
  //     console.log("3000 ms are over");
  //     resolve();
  //   }, 3000);
  // });

  return Font.loadAsync({
    "open-sans-light": require("./assets/fonts/OpenSans-Light.ttf"),
    "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded)
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
          console.log("loaded");
        }}
      />
    );

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
