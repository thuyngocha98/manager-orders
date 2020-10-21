import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '@modules/extend/styles/notification.styles';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Header from '@components/Header';
import IconGoBackArrow from '@assets/iconSvg/IconGoBackArrow';
import I18n from '@assets/localization/I18n';

const Notification = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* view header */}
      <Header>
        <View style={styles.contentHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconGoBackArrow
              width={responsiveWidth(20)}
              height={responsiveHeight(20)}
            />
          </TouchableOpacity>
          <Text style={styles.txtTitleHeader}>{I18n.t('notification')}</Text>
          <View style={{width: responsiveWidth(20)}} />
        </View>
      </Header>
      <View style={styles.viewNoNotification}>
        <Text style={styles.txtNoNotification}>{I18n.t('noNotification')}</Text>
      </View>
    </View>
  );
};

export default Notification;
