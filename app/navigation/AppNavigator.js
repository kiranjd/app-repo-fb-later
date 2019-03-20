import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import Login from '../components/login/login';
import numberEntry from '../components/signUp/enterMobileNumber'
import SignupForm from '../components/signUp/SignupForm';
import Home from '../home/home'
import calendars from '../components/calendar/calendar';
import Profile from '../components/profile/profile';
import Settings from '../components/settings/settings';
import LastClasses from '../components/lastClasses/lastClasses';
import CameraVid from '../components/video/camera'
import SideMenu from './sideMenu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderBar from '../components/common/headerBar';
import HandleLogin from '../components/login/HandleUserState';
import UpdateProfile from '../components/signUp/SignupForm';
import AddUserInfo from '../components/signUp/AddUserInfo';
import GoLive from '../components/goLive/goLive';
import ParentOtp from '../components/parentOtp/parentOtp';
import LinkMobile from '../components/linkMobile/linkMobile';


const MainDrawer = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Profile: {
      screen: Profile,
    },

    GoLive: {
      screen: GoLive,
    },

    ParentOtp: {
      screen: ParentOtp,
    },

    LinkMobile: {
      screen: LinkMobile,
    },
    
    Account: {
      screen: Home,
    },
    Notification: {
      screen: Home,
    },
    "Last Classes": {
      screen: LastClasses,
    },
    Calendar: {
      screen: calendars,
    },
    Logout: {
      screen: Login,
    },
    header: {
      screen: HeaderBar,
    }, 
    AddUserInfo: {
      screen: AddUserInfo,
    },

    UpdateProfile: {
      screen: UpdateProfile,
      navigationOptions : {
        title: 'Enter your details',
      }
    }
  },     {
    contentComponent: SideMenu,
    drawerWidth: wp('69%'),
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

    // UpdateProfile: {
    //   screen: UpdateProfile,
    //   navigationOptions : {
    //     title: 'Enter your details',
    //   }
    //},
  }
);


const AppNavigator = createSwitchNavigator(
  {
    // UserState: {
    //   screen: HandleLogin
    // },

    BeforeLogin: {
      screen: LoginStack
    },
    
    Home: { 
      screen: MainDrawer,
    }
  }
);

export default AppNavigator;