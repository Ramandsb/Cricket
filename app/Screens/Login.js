import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import InputField from '../components/InputField';
import auth from '@react-native-firebase/auth';
import {Snackbar} from 'react-native-material-ui';
import * as images from '../images';

export default class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    isErrorVisible: false,
    error: '',
  };
  signInUser = () => {
    const {email, password} = this.state;
    if (!email || !password) {
      this.setState({isErrorVisible: true, error: 'All fields are required!'});
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('AppNavTab');
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={images.icon}
            style={{width: 150, height: 150, borderRadius: 75}}
          />
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
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                alignItems: 'center',
                backgroundColor: 'green',
                paddingVertical: 10,
              }}
              onPress={this.signInUser}>
              <Text style={{color: 'white'}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{alignItems: 'center', paddingVertical: 10}}
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={{color: 'red'}}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Snackbar
          visible={this.state.isErrorVisible}
          message={this.state.error}
          onRequestClose={() => this.setState({isErrorVisible: false})}
        />
      </>
    );
  }
}
