/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as images from '../images';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate('AppNavTab');
        } else {
          navigation.navigate('AuthNavStack');
        }
      });
    }, 1500);
  }, []);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
        flex: 1,
      }}>
      <Image
        source={images.icon}
        style={{width: 200, height: 200, borderRadius: 100}}
      />
    </View>
  );
};
export default SplashScreen;
