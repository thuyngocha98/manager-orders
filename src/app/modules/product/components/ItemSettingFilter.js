import React from 'react';
import {View, Text} from 'react-native';
import styles from '@modules/product/styles/itemSettingFilter';

const ItemSettingFilter = ({isChecked, name}) => {
  return (
    <View style={styles.viewItem}>
      <Text style={styles.txtItem}>{name}</Text>
      <View
        style={isChecked ? styles.viewCircleCheck : styles.viewCircleNoneCheck}>
        <View
          style={
            isChecked
              ? styles.viewCircleCenterCheck
              : styles.viewCircleCenterNoneCheck
          }
        />
      </View>
    </View>
  );
};

export default ItemSettingFilter;
