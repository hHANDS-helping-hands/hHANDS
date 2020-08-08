import Config from "./Config";
import CustomAlert from "./CustomAlert";
import { useSelector, useDispatch } from "react-redux";
import {
  setToken,
  login,
  setUserData,
  logout,
} from "../store/actions/authentication";
import axios from "axios";
import { getData, Keys, storeData } from "../utilities/AsyncStorage";
import store from "../store/store";

const AxiosGetReq = async (params, endpoint, token) => {
  //const dispatch = useDispatch();
  try {
    let response = await axios.get(Config.server + endpoint, {
      params: params,
      headers: token
        ? {
            Authorization: "Bearer " + token,
          }
        : {},
    });
    //console.log(response);
    if (response && !response.data.success) {
      console.log(response.data);
      if (response.data.message == "TokenExpiredError") {
        const userData = await getData(Keys.userData);
        response = await AxiosPostReq(
          { username: userData.username, password: userData.password },
          "/login"
        );

        if (response && response.data.success) {
          token = response.data.token;
          console.log("printing token " + token);
          store.dispatch(setToken(token));
          response = await axios.get(Config.server + endpoint, {
            params: params,
            headers: token
              ? {
                  Authorization: "Bearer " + token,
                }
              : {},
          });
        } else if (!response.data.success) {
          store.dispatch(setToken(null));
          store.dispatch(setUserData(null));
          store.dispatch(logout());
          CustomAlert(
            "Logged Out",
            "You are logged out, please log in again. Happy helping."
          );
        }
        //console.log(requesting again)
      }
    }
    return response;
  } catch (e) {
    console.log(e);
    CustomAlert(
      "Bad Request",
      "Please check your internet connection or try again later."
    );
  }
  return null;
};

const AxiosPostReq = async (data, endpoint, token) => {
  try {
    let response = await axios.post(Config.server + endpoint, data, {
      headers: token
        ? {
            Authorization: "Bearer " + token,
          }
        : {},
    });

    if (response && !response.data.success) {
      console.log(response.data);
      if (response.data.message == "TokenExpiredError") {
        const userData = await getData(Keys.userData);
        response = await AxiosPostReq(
          { username: userData.username, password: userData.password },
          "/login"
        );

        if (response && response.data.success) {
          token = response.data.token;
          console.log("printing token " + token);
          store.dispatch(setToken(token));
          response = await axios.post(Config.server + endpoint, data, {
            headers: token
              ? {
                  Authorization: "Bearer " + token,
                }
              : {},
          });
        } else if (!response.data.success) {
          store.dispatch(setToken(null));
          store.dispatch(setUserData(null));
          store.dispatch(logout());
          CustomAlert(
            "Logged Out",
            "You are logged out, please log in again. Happy helping."
          );
        }
        //console.log(requesting again)
      }
    }

    return response;
  } catch (e) {
    console.log(e);
    CustomAlert(
      "Bad Request",
      "Please check your internet connection or try again later."
    );
  }

  return null;
};

export { AxiosGetReq, AxiosPostReq };

const nextRequest = async (token) => {
  //let token = await AsyncStorage.getItem("token");
  //console.log("nextRequest: " + token);
  let response = await axios.get("http://192.168.29.82:8080/handle", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  console.log(response.data);
};
