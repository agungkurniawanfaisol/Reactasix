import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Easing, Animated, YellowBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import {OtherScreen} from '../Component/OtherScreen';
import MainPage from '../Component/Page_MainDefault/MainPage';
import IndexanLogin from '../Component/Page_Auth/IndexanLogin';
import AuthLoadingScreen from '../Component/AuthLoading/Authloading';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

class FirstScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateDisplay: false,
      dataUser: {},
    };
  }

  async componentDidMount() {}

  componentWillUnmount = () => {};

  render() {
    return <ContainerX screenProps={this.props} />;
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const STACK1 = createStackNavigator(
  {
    Home: MainPage,
    OtherScreen: OtherScreen,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gestureEnabled: true,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const {layout, position, scene} = sceneProps;
        const {index} = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return {opacity, transform: [{translateY}]};
      },
    }),
  },
);

// Menyembunyikan bottom tab bar ketika menampilkan sub menu
STACK1.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'Home') {
        tabBarVisible = true;
      } else {
        tabBarVisible = false;
      }
    });
  }
  return {
    tabBarVisible,
  };
};

const MyDrawerNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: STACK1,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="md-home" size={25} color={tintColor} />
        ),
      },
    },

    Kartu: {
      screen: OtherScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-card" size={25} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    labeled: true,
    swipeEnabled: true,
    shifting: true,
    barStyle: {
      backgroundColor: '#fff',
      shadowOpacity: 0.8,
      shadowRadius: 20,
      elevation: 22,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 80},
    },
    inactiveColor: '#3e2465',
    activeColor: '#f00',
  },
);

const AppStack = createStackNavigator(
  {Home: MyDrawerNavigator, Other: OtherScreen},
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
    },
  },
);

const AuthStack = createStackNavigator(
  {
    SignIn: IndexanLogin,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
    },
    initialRouteName: 'SignIn',
  },
);

const ContainerX = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default FirstScreen;

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
