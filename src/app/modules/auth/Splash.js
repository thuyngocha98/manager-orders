import React from 'react';
import {View, Text, StatusBar, Animated} from 'react-native';
import styles from '@modules/auth/styles/splash.styles';
import Colors from '@const/Colors';
const Splash = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white}
        translucent
        barStyle="light-content"
      />
      <Animated.View style={[styles.viewImage, {opacity: fadeAnim}]}>
        <Text style={styles.txtSplash}>Splash</Text>
      </Animated.View>
    </View>
  );
};

export default Splash;
