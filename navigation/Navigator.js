import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import DoneeDetailsPage from "../pages/DoneeDetailsPage";
import HomePage from "../pages/HomePage";
import SplashScreen from "../pages/SplashScreen";
import Signup from "../pages/Signup";
import Color from "../constants/colors";
import DebugScreen from "../pages/DebugScreen";
import LocationScreen from "../pages/LocationScreen";
import ProfilePage from "../pages/ProfilePage";
import ShowDoneeDetails from "../pages/ShowDoneeDetails";
import Feedback from "../pages/Feedback";
import ForgotPassword from "../pages/ForgotPassword";
import EditableUserData from "../pages/EditableUserData";

const Navigator = createStackNavigator({
  // DebugScreen: {
  //   screen: DebugScreen,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
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
      title: "Add Donee",
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
      headerTintColor: Color.White,
      title: "SignUp",
      headerStyle: {
        backgroundColor: Color.PrimaryColor,
      },
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 18,
      },
    },
  },

  LocationScreen: {
    screen: LocationScreen,
    navigationOptions: {
      headerTintColor: Color.White,
      title: "Add Location",
      headerStyle: {
        backgroundColor: Color.PrimaryColor,
      },
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 18,
      },
    },
  },

  ShowDoneeDetails: {
    screen: ShowDoneeDetails,
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

  ProfilePage: {
    screen: ProfilePage,
    navigationOptions: {
      headerTintColor: Color.White,
      title: "Profile",
      headerStyle: {
        backgroundColor: Color.PrimaryColor,
      },
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 18,
      },
    },
  },

  Feedback: {
    screen: Feedback,
    navigationOptions: {
      headerTintColor: Color.White,
      title: "Feedback",
      headerStyle: {
        backgroundColor: Color.PrimaryColor,
      },
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 18,
      },
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      headerTintColor: Color.White,
      title: "Forgot Password",
      headerStyle: {
        backgroundColor: Color.PrimaryColor,
      },
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 18,
      },
    },
  },
  EditableUserData: {
    screen: EditableUserData,
    navigationOptions: {
      headerTintColor: Color.White,
      title: "Edit Profile",
      headerStyle: {
        backgroundColor: Color.PrimaryColor,
      },
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 18,
      },
    },
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

export default createAppContainer(Navigator);
