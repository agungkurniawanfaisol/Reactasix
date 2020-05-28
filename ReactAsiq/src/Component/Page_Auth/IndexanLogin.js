import React, {Component} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CryptoJS from 'react-native-crypto-js';
import {withNavigation} from 'react-navigation';
import Login_Page from './Login';

class IndexanLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateDisplay: false,
    };
  }

  logindata = data => {
    // console.log(data);
    if (data == true) {
      // console.log(this.props.navigation);
      let ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify('asdasdasdasdasdasdads'),
        'Test',
      ).toString();
      console.log(ciphertext);
      const X = AsyncStorage.setItem('Test', ciphertext);
      console.log(X);
      this.props.navigation.navigate('App');
      this.setState({updateDisplay: !this.state.updateDisplay});
      alert('masuk sni');
    } else {
      alert('3000');
    }
  };

  render() {
    return (
      <>
        <Login_Page logindata={this.logindata} />
      </>
    );
  }
}

export default withNavigation(IndexanLogin);
