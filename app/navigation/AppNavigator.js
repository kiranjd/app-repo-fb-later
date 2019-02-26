import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import Login from '../components/login/login';
import numberEntry from '../components/signUp/enterMobileNumber'
import SignupForm from '../components/signUp/SignupForm';
import Home from '../home/home';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import SideMenu from './sideMenu';
import calendars from '../components/calendar/calendar';
import { CameraVid } from '../components/video/camera';
// import Friends from './Friends';
// import Signup from './Components/Signup/Signup';
// import SignupDetails from './Components/Signup/SignupDetails';
// import CardViewCustom from './Components/CardView/CardView';

const MainDrawer = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Classes: {
      screen: Home,
    },
    Profile: {
      screen: Home,
    },
    Calendar: {
      screen: calendars,
    },
    Logout: {
      screen: Login,
    },
    Camera: {
      screen: CameraVid,
    }
  },     {
    contentComponent: SideMenu,
    drawerWidth: wp('70%'),
  }
)

const LoginStack = createStackNavigator(
  {
    Login: Login,
    SendOTPScreen: {
      screen: numberEntry,
      navigationOptions : {
        title: 'Phone validation',
      }
    },
    SignupDetails: {
      screen: SignupForm,
      navigationOptions : {
        title: 'Enter your details',
      }
    },
  }
);

const AppNavigator = createSwitchNavigator(
  {
    BeforeLogin: {
      screen: LoginStack
    },
    
    Home: { 
      screen: MainDrawer,
    }
  //   Friends: MainDrawer,
  }
);

// export const Drawer = DrawerNavigator({
//   Stack: { screen: Login },
// });

export default AppNavigator;