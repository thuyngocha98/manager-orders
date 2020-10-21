import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '@components/styles/viewNote.styles';
import {responsiveHeight} from '@utils/DimenUtils';
import IconNote from '@assets/iconSvg/IconNote';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';

const ViewNote = ({contentNote, toggleModal}) => {
  return (
    <View style={styles.viewNote}>
      <View style={styles.viewHeaderNote}>
        {contentNote ? (
          <Text style={styles.titleHaveContent}>{I18n.t('note')}</Text>
        ) : (
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.titleNoneContent}>{I18n.t('addNote')}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={toggleModal} style={styles.viewIconNote}>
          <IconNote
            width={responsiveHeight(20)}
            height={responsiveHeight(20)}
            fill={Colors.gray}
          />
        </TouchableOpacity>
      </View>
      {contentNote?.length > 0 && (
        <Text style={styles.txtContentNote}>{contentNote}</Text>
      )}
    </View>
  );
};

export default ViewNote;
