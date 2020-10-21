import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from '@components/styles/switchBase.styles';
const SwitchBase = ({toggleSwitch, isEnabledSwitch}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={toggleSwitch}
      style={
        isEnabledSwitch ? styles.viewIconEnable : styles.viewIconNoneEnable
      }>
      <View style={styles.viewCircleSwitch} />
    </TouchableOpacity>
  );
};

export default SwitchBase;
