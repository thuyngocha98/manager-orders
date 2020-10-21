import React from 'react';
import {View} from 'react-native';
import styles from '@modules/customer/styles/detailInfoCustomer.styles';
import I18n from '@assets/localization/I18n';
import ItemBase from '@modules/customer/components/ItemBase';
const DetailInfoCustomer = ({data}) => {
  return (
    <View style={styles.container}>
      <ItemBase title={I18n.t('fullName')} content={data.name} />
      <ItemBase title={I18n.t('dayOfBirth')} content={data.dayOfBirth} />
      <ItemBase
        title={I18n.t('sex')}
        content={
          data.gender !== null
            ? data.gender === false
              ? I18n.t('female')
              : I18n.t('male')
            : ''
        }
      />
      <ItemBase title={I18n.t('phoneNumber')} content={data.phone} />
      <ItemBase title={I18n.t('email')} content={data.email} />
    </View>
  );
};

export default DetailInfoCustomer;
