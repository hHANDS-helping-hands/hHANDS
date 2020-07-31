import CustomAlert from "./CustomAlert";
import NoInternetAlert from "./NoInternetAlert";

export default function checkInternet() {
  //do check if server is up.

  const connectServer = true;
  const connectGoogle = true;

  if (connectGoogle)
    CustomAlert(
      "No Response",
      "Our server is not responding, please bear with down time"
    );
  else if (!connectGoogle) NoInternetAlert();
}
