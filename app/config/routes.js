import React from 'react';
import {Platform, StatusBar, Image, Dimensions} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SplashScreen from '../Screens/Splash';
import LoginScreen from '../Screens/Login';
import RegisterScreen from '../Screens/Register';
import HomeScreen from '../Screens/Home';
import InfoScreen from '../Screens/Info';
import SearchPlayersScreen from '../Screens/SearchPlayers';
import SettingsScreen from '../Screens/Settings';
import MatchInfoScreen from '../Screens/MatchInfo';
import SquadsScreen from '../Screens/Squads';
import InfoDetailsScreen from '../Screens/InfoDetails';
import PlayerDetailsScreen from '../Screens/PlayerDetails';
import * as images from '../images';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  backgroundColor: 'white',
};

const TAB_IMAGES = {
  Home: 'Home',
  Info: 'Info',
  Search: 'Search',
  Settings: 'Settings',
};

const getNavigationOptions = (shadow) => {
  if (Platform.OS === 'ios') {
    return {
      headerBackTitle: ' ',
      headerStyle: [
        {borderBottomWidth: 0},
        shadow
          ? {
              shadowColor: 'rgb(0, 0, 0)',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.09,
              shadowRadius: 1,
              elevation: 1,
            }
          : null,
        headerStyle,
      ],
      headerTitleStyle: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0,
        color: '#000',
      },
      headerTitleAllowFontScaling: false,
    };
  }

  return {
    headerBackTitle: ' ',
    headerStyle: [shadow ? null : {elevation: 0}],
    headerTitleAllowFontScaling: false,
  };
};

/* Auth Sign In Tab */
const AuthNavStack = createStackNavigator(
  {
    SignIn: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    SignUp: createSwitchNavigator(
      {
        SignUp: {
          screen: RegisterScreen,
        },
      },
      {
        initialRouteName: 'SignUp',
        navigationOptions: getNavigationOptions(true),
      },
    ),
  },
  {
    initialRouteName: 'SignIn',
    navigationOptions: getNavigationOptions(false),
  },
);

const HomeStack = createStackNavigator(
  {HomeScreen, MatchInfoScreen, SquadsScreen},
  {navigationOptions: getNavigationOptions(true)},
);

const InfoStack = createStackNavigator(
  {InfoScreen, InfoDetailsScreen},
  {navigationOptions: getNavigationOptions(true)},
);

const PlayersStack = createStackNavigator(
  {SearchPlayersScreen, PlayerDetailsScreen},
  {navigationOptions: getNavigationOptions(true)},
);
const SettingsStack = createStackNavigator(
  {SettingsScreen},
  {navigationOptions: getNavigationOptions(true)},
);
const AppNavTab = createBottomTabNavigator(
  {
    Home: {screen: InfoStack},
    Info: {screen: HomeStack},
    Search: {screen: PlayersStack},
    Settings: {screen: SettingsStack},
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => {
      const {routeName} = navigation.state;
      return {
        tabBarIcon: ({focused}) => (
          <Image
            source={images[TAB_IMAGES[routeName] || 'Home']}
            style={{opacity: focused ? 1 : 0.3}}
            accessibilityLabel={routeName}
          />
        ),
      };
    },
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
      },
    },
  },
);

const RootView = createSwitchNavigator(
  {
    SplashScreen,
    AuthNavStack,
    AppNavTab,
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

const MainNavigator = createStackNavigator(
  {
    RootView,
  },
  {
    headerMode: 'none',
    mode: 'card',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const MainContainer = createAppContainer(MainNavigator);

export default MainContainer;
