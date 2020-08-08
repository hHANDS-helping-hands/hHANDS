import CustomAlert from "./CustomAlert";
import NoInternetAlert from "./NoInternetAlert";
import { Alerts } from "../constants/stringValues";

export default function checkInternet() {
  //do check if server is up.

  const connectServer = true;
  const connectGoogle = true;

  if (connectGoogle)
    CustomAlert(Alerts.noResponse.title, Alerts.noResponse.description);
  else if (!connectGoogle) NoInternetAlert();
}
