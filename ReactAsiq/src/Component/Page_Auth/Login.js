import React from 'react';
import {View, Text, TouchableOpacity, StatusBar, TextInput} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'react-native-paper';
import Css_Login from './css_login';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Helper_login from './Helper/Helper_Login';

const Login_Page = props => {
  const {colors} = useTheme();

  function cek() {
    props.logindata(true);
    // alert('asd');
  }

  return (
    <View style={Css_Login.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={Yup.object({
          username: Yup.number()
            .required('Required Number')
            .test(val => {
              return parseInt(val);
            }),
          password: Yup.string().required('Required'),
        })}
        onSubmit={async (data, action) => {
          // console.log(daata);
          if (data.username.length < 16) {
            let response = await Helper_login(data);
            if (response.data.status == 200) {
              cek();
            } else {
              alert('3000');
            }
            // console.log(Response);
            cek();
          } else {
            alert('NIK ');
          }
          action.resetForm();
        }}>
        {props => {
          return (
            <>
              <View style={Css_Login.header}>
                <Text style={Css_Login.text_header}>Welcome!</Text>
              </View>
              <Animatable.View
                animation="fadeInUpBig"
                style={[
                  Css_Login.footer,
                  {
                    backgroundColor: colors.background,
                  },
                ]}>
                <Text
                  style={[
                    Css_Login.text_footer,
                    {
                      color: colors.text,
                    },
                  ]}>
                  Username
                </Text>
                <View style={Css_Login.action}>
                  <FontAwesome name="user-o" color={colors.text} size={20} />
                  <TextInput
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={[
                      Css_Login.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    autoCapitalize="none"
                    onChangeText={props.handleChange('username')}
                    value={props.values.username}
                    keyboardType={'numeric'}
                  />
                  {props.values.username.length > 0 ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  ) : null}
                </View>

                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={Css_Login.errorMsg}>
                    {props.errors.username}
                  </Text>
                </Animatable.View>

                <Text
                  style={[
                    Css_Login.text_footer,
                    {
                      color: colors.text,
                      marginTop: 35,
                    },
                  ]}>
                  Password
                </Text>
                <View style={Css_Login.action}>
                  <Feather name="lock" color={colors.text} size={20} />
                  <TextInput
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    // secureTextEntry={data.secureTextEntry ? true : false}
                    secureTextEntry={true}
                    style={[
                      Css_Login.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    autoCapitalize="none"
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                  />
                  {/* <TouchableOpacity>
                    {data.secureTextEntry ? (
                      <Feather name="eye-off" color="grey" size={20} />
                    ) : (
                      <Feather name="eye" color="grey" size={20} />
                    )}
                  </TouchableOpacity> */}
                </View>
                {/* {data.isValidPassword ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={Css_Login.errorMsg}>
                      Password must be 8 characters long.
                    </Text>
                  </Animatable.View>
                )} */}

                <TouchableOpacity>
                  <Text style={{color: '#009387', marginTop: 15}}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
                <View style={Css_Login.button}>
                  <TouchableOpacity
                    style={Css_Login.signIn}
                    onPress={props.handleSubmit}>
                    <LinearGradient
                      colors={['#08d4c4', '#01ab9d']}
                      style={Css_Login.signIn}>
                      <Text
                        style={[
                          Css_Login.textSign,
                          {
                            color: '#fff',
                          },
                        ]}>
                        Sign In
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    // onPress={() => navigation.navigate('SignUpScreen')}
                    style={[
                      Css_Login.signIn,
                      {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15,
                      },
                    ]}>
                    <Text
                      style={[
                        Css_Login.textSign,
                        {
                          color: '#009387',
                        },
                      ]}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default Login_Page;
