/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import InputField from '../components/InputField';
import HeaderBackButton from '../components/HeaderBackButton';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {Snackbar} from 'react-native-material-ui';

export default class RegisterScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Register',
    headerLeft: (
      <HeaderBackButton onPress={navigation.pop} navigation={navigation} />
    ),
  });
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    isErrorVisible: false,
    error: '',
  };
  registerUser = () => {
    const {email, password, confirmPassword} = this.state;
    if (!email || !password) {
      this.setState({isErrorVisible: true, error: 'All fields are required!'});
      return;
    }
    if (password !== confirmPassword) {
      this.setState({isErrorVisible: true, error: 'Passwords does not match'});
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('SignIn')
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          this.setState({
            isErrorVisible: true,
            error: 'That email address is already in use!',
          });
        }

        if (error.code === 'auth/invalid-email') {
          this.setState({
            isErrorVisible: true,
            error: 'That email address is invalid!',
          });
        }

        console.error(error);
      });
  };
  render() {
    return (
      <>
        <ScrollView
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: '100%', padding: 20}}>
              <InputField
                placeholder="Enter Email"
                label={'Email'}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
              />
              <InputField
                placeholder="Enter Password"
                label={'Password'}
                secureTextEntry
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
              />
              <InputField
                placeholder="Enter Password"
                label={'Confirm Password'}
                secureTextEntry
                onChangeText={(text) => this.setState({confirmPassword: text})}
                value={this.state.confirmPassword}
              />
              <TouchableOpacity
                activeOpacity={0.2}
                style={{
                  alignItems: 'center',
                  backgroundColor: 'green',
                  paddingVertical: 10,
                }}
                onPress={this.registerUser}>
                <Text style={{color: 'white'}}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Snackbar
          visible={this.state.isErrorVisible}
          message={this.state.error}
          onRequestClose={() => this.setState({isErrorVisible: false})}
        />
      </>
    );
  }
}
