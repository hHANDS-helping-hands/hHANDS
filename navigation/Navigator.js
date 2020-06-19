import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import DoneeDetailsPage from "../pages/DoneeDetailsPage";
import HomePage from "../pages/HomePage";
import SplashScreen from "../pages/SplashScreen";
import ShowVideo from "../pages/ShowVideo";
import TestMe from "../pages/TestMe";
import Signup from "../pages/Signup";
import Color from "../constants/colors";

const Navigator = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      headerShown: false,
    },
  },

  DoneeDetailsPage: {
    screen: DoneeDetailsPage,
    navigationOptions: {
      headerTintColor: Color.White,
      title: "Donee Details",
      headerStyle: {
        backgroundColor: Color.PrimaryColor,
      },
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 18,
      },
    },
  },

  Signup: {
    screen: Signup,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Color.PrimaryColor,
      },
      headerTitleStyle: {
        color: Color.White,
      },
    },
  },

  TestMe: {
    screen: TestMe,
  },

  ShowVideo: {
    screen: ShowVideo,
  },
});

const mainNavigator = createDrawerNavigator(
  {
    MyNavigator: Navigator,
  },
  {
    defaultNavigationOptions: { drawerLockMode: "locked-closed" },
  }
);

export default createAppContainer(mainNavigator);
