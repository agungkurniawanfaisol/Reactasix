import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('Test');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
