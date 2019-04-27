import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import Login from '../components/login/login';
import numberEntry from '../components/signUp/enterMobileNumber'
import Home from '../home/home'
import calendars from '../components/calendar/calendar';
import Profile from '../components/profile/profile';
import LastClasses from '../components/lastClasses/lastClasses';
import SideMenu from './sideMenu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderBar from '../components/common/headerBar';
import UpdateProfile from '../components/signUp/SignupForm';
import AddUserInfo from '../components/signUp/AddUserInfo';
import GoLive from '../components/goLive/goLive';
import ParentOtp from '../components/parentOtp/parentOtp';
import LinkMobile from '../components/linkMobile/linkMobile';
import WebViewForVideo from '../components/showVideo';
import Event from '../components/calendar/event';


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

    showVideo: {
      screen: WebViewForVideo
    },

    LinkMobile: {
      screen: LinkMobile,
    },

    "Last Classes": {
      screen: LastClasses,
    },
    Calendar: {
      screen: calendars,
    },
    Event: {
      screen: Event,
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
  }
);

export default AppNavigator;