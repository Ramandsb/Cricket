import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import * as images from '../images';

const HeaderBackButton = ({onPress, navigation}) => (
  <TouchableOpacity
    style={{
      marginRight: 8,
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    activeOpacity={0.8}
    onPress={() => {
      navigation.popToTop();
    }}>
    <Image source={images.chevronLeft} />
  </TouchableOpacity>
);

HeaderBackButton.defaultProps = {
  onPress: null,
};

HeaderBackButton.propTypes = {
  navigation: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

export default HeaderBackButton;
