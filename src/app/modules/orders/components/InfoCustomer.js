import React from 'react';
import {Text, View} from 'react-native';
import styles from '@modules/orders/styles/infoCustomer.styles';
import I18n from '@assets/localization/I18n';

const InfoCustomer = ({name, phone, address}) => {
  return (
    <View style={styles.viewDetailInfo}>
      <View style={styles.viewTextInfo}>
        <Text style={styles.txtInfo} numberOfLines={2}>
          {I18n.t('nameCustomer')}: {name}
        </Text>
        <Text style={styles.txtInfo} numberOfLines={2}>
          {I18n.t('phoneNumber')}: {phone}
        </Text>
        <Text style={styles.txtInfo} numberOfLines={2}>
          {I18n.t('address')}: {address}
        </Text>
      </View>
    </View>
  );
};

export default InfoCustomer;
