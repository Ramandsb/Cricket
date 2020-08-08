/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import * as images from '../images';

export default class SquadsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitleAlign: 'center',
    headerTitle: <Text style={{fontWeight: '700'}}>Squads</Text>,
    headerRight: <View />,
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Image source={images.chevronLeft} />
      </TouchableOpacity>
    ),
  });
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 15}}>Squads not announced Yet</Text>
      </View>
    );
  }
}
