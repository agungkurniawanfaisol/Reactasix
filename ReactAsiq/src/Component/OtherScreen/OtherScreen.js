import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {AsyncStorage, View, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {Button} from 'react-native-paper';

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          alignContent: 'center',
          padding: '5%',
        }}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

export default OtherScreen;
