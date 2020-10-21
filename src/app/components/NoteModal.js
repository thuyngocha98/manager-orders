import React from 'react';
import styles from '@components/styles/noteModal.styles';
import {responsiveHeight} from '@utils/DimenUtils';
import Modal from 'react-native-modal';

const NoteModal = ({isModalVisible, children, keyboardSpace}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={[
        styles.mainModal,
        {
          bottom: keyboardSpace
            ? responsiveHeight(10) + keyboardSpace
            : responsiveHeight(250),
        },
      ]}
      statusBarTranslucent>
      {children}
    </Modal>
  );
};

export default NoteModal;
