import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styles from '@modules/product/styles/itemInfoProductBase.styles';
const ItemInfoProductBase = ({title, nameDetails}) => {
  return (
    <View style={styles.viewItemInfo}>
      <Text style={styles.txtTitleName}>{title}</Text>
      <Text style={styles.txtName}>{nameDetails}</Text>
    </View>
  );
};

export default memo(ItemInfoProductBase);
