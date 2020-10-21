import React from 'react';
import {View, StatusBar, Text, TouchableOpacity} from 'react-native';
import styles from '@components/styles/headerNoGoBack.styles';
import Colors from '@const/Colors';

const HeaderNoGoBack = ({title, onPressIconRight, children}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.darkGreen}
        translucent
        barStyle="light-content"
      />
      <View style={styles.header}>
        <View style={styles.contentHeader}>
          <Text style={styles.txtTitleHeader}>{title}</Text>
          <TouchableOpacity onPress={onPressIconRight}>
            {children}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderNoGoBack;
