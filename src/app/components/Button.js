import React from 'react';
import {Text, View} from 'react-native';
import styles from '@components/styles/button.styles';
import {responsiveWidth} from '@utils/DimenUtils';

const Button = ({title, type, width}) => {
  if (type === 0) {
    return (
      <View style={[styles.container0, {width: responsiveWidth(width)}]}>
        <Text style={styles.txtTitle0}>{title}</Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.container1, {width: responsiveWidth(width)}]}>
        <Text style={styles.txtTitle1}>{title}</Text>
      </View>
    );
  }
};

export default Button;
