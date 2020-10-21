import React from 'react';
import {View, StatusBar} from 'react-native';
import styles from '@components/styles/header.styles';
import Colors from '@const/Colors';

const Header = ({children}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.darkGreen}
        translucent
        barStyle="light-content"
      />
      <View style={styles.header}>{children}</View>
    </View>
  );
};

export default Header;
