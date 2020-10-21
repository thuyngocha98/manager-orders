import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import styles from '@components/styles/bottomModalBase.styles';

const BottomModalBase = ({toggleModal, isModalVisible, children, ...props}) => {
  return (
    <Modal
      {...props}
      onBackdropPress={toggleModal}
      isVisible={isModalVisible}
      style={styles.mainModal}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      statusBarTranslucent>
      <View style={styles.viewModal}>{children}</View>
    </Modal>
  );
};

export default BottomModalBase;
