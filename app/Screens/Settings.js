/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{width: '100%', padding: 20, backgroundColor: 'white'}}>
          <TouchableOpacity
            onPress={() =>
              auth()
                .signOut()
                .then(() => {
                  this.props.navigation.navigate('AuthNavStack');
                })
            }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 50,
            }}>
            <Text style={{color: 'red'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
