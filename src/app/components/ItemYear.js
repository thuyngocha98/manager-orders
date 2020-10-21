import React, {memo} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from '@components/styles/itemYear.styles';
const ItemYearAddCustomer = ({item, onSelectYear}) => {
  return (
    <TouchableOpacity
      style={styles.viewItemYear}
      onPress={() => onSelectYear(item)}>
      <Text style={styles.txtYear}>{item.toString()}</Text>
    </TouchableOpacity>
  );
};

export default memo(ItemYearAddCustomer);
