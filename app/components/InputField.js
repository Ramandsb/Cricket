/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {TextInput, View, Text} from 'react-native';

export default class InputField extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          borderRadius: 5,
          padding: 20,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 10,
            lineHeight: 14,
            letterSpacing: 0,
            color: 'rgba(0, 0, 0, 0.4)',
            textTransform: 'uppercase',
            marginBottom: 5,
          }}>
          {this.props.label}
        </Text>
        <TextInput {...this.props} />
      </View>
    );
  }
}
