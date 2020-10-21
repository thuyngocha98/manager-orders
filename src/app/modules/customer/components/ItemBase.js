import React from 'react';
import {View, Text} from 'react-native';
import styles from '@modules/customer/styles/itemBase.styles';
const ItemBase = ({title, content}) => {
  return (
    <View style={styles.viewItem}>
      <Text style={styles.txtTitle}>{title}</Text>
      <Text style={styles.txtContent}>{content}</Text>
    </View>
  );
};

export default React.memo(ItemBase);
