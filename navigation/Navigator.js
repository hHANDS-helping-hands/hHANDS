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
import DebugScreen from "../pages/DebugScreen";
import LocationScreen from "../pages/LocationScreen";
import ProfilePage from "../pages/ProfilePage";
import ShowDoneeDetails from "../pages/ShowDoneeDetails";
import Feedback from "../pages/Feedback";
import ForgotPassword from "../pages/ForgotPassword";
import AdminFeedback from "../pages/AdminFeedback";
import AlternateFeedback from "../pages/AlternateFeedback";

const Navigator = createStackNavigator({
  DebugScreen: {
    screen: DebugScreen,
    navigationOptions: {
      headerShown: false,
    },
  },

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

  TestMe: {
    screen: TestMe,
  },

  LocationScreen: {
    screen: LocationScreen,
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

  ShowDoneeDetails: {
    screen: ShowDoneeDetails,
    navigationOptions: {
      headerTintColor: Color.White,
      title: "ShowDoneeDetails",
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
      title: "ProfilePage",
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
      title: "ForgotPassword",
      headerStyle: {
        backgroundColor: Color.PrimaryColor,
      },
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 18,
      },
    },
  },

  AdminFeedback: {
    screen: AdminFeedback,
    navigationOptions: {
      headerTintColor: Color.White,
      title: "AdminFeedback",
      headerStyle: {
        backgroundColor: Color.PrimaryColor,
      },
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 18,
      },
    },
  },

  AlternateFeedback: {
    screen: AlternateFeedback,
    navigationOptions: {
      headerTintColor: Color.White,
      title: "AlternateFeedback",
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
