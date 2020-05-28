/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import FirstScreen from './src/Router/Router';

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => FirstScreen);
