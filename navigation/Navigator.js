import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import DoneeDetailsPage from "../pages/DoneeDetailsPage";
import HomePage from "../pages/HomePage";
import SplashScreen from "../pages/SplashScreen";
import ShowVideo from "../pages/ShowVideo";
import TestMe from "../pages/TestMe";
import Signup from "../pages/Signup";
import Color from "../constants/colors";

const Navigator = createStackNavigator({
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Color.PrimaryColor
      },
      headerTitleStyle: {
        color: Color.White
      }
    }
  },
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      headerShown: false
    }
  },
  TestMe: {
    screen: TestMe
  },

  DoneeDetailsPage: DoneeDetailsPage,
  ShowVideo: {
    screen: ShowVideo
  },
  SplashScreen: SplashScreen
});

export default createAppContainer(Navigator);
