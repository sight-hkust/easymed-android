import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Login from './Login'
import Registration from './Registration'
import SplashScreen from './SplashScreen'
import Entrance from './Entrance'
import Triage from './Triage'
import Consultation from './Consultation'
import Pharmacy from './Pharmacy'
import Settings from './Settings'

const AppStack = createStackNavigator({
  Entrance,
  Triage,
  Consultation,
  Pharmacy,
  Settings
},
{
  initialRouteName: 'Entrance',
  headerMode: 'none'
});
const AuthStack = createStackNavigator({ Login, Registration },{headerMode: 'none'});

const Storyboard = createSwitchNavigator(
  {
    AuthLoading: SplashScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none'
  }
);

export default Storyboard;