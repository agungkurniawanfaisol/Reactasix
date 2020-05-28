import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const MainPage = props => {
  async function logoutPress() {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
      <Text> MainPage </Text>
      <Button icon="camera" mode="contained" onPress={logoutPress}>
        Press me
      </Button>
    </View>
  );
};

export default withNavigation(MainPage);
