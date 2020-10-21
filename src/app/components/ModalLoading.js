import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';

const ModalLoading = ({isModalVisibleLoading, onNavigate, title}) => {
  return (
    <Modal
      isVisible={isModalVisibleLoading}
      style={styles.mainModalLoading}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationOutTiming={50}
      useNativeDriver={true}
      onModalWillHide={onNavigate}
      hideModalContentWhileAnimating={true}
      statusBarTranslucent>
      <View style={styles.viewModalLoading}>
        <ActivityIndicator size="large" color={Colors.lightGreen} />
        <Text style={styles.txtLoading}>{title}...</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainModalLoading: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModalLoading: {
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  txtLoading: {
    marginTop: responsiveHeight(10),
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
});

export default ModalLoading;
