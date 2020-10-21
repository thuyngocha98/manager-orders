import React from 'react';
import {View, Text} from 'react-native';
import styles from '@modules/product/styles/itemInputAmountProduct.styles';
const ItemInputAmountProduct = ({title, children}) => {
  return (
    <View style={styles.viewInput}>
      <Text style={styles.txtTitleUnit}>{title}</Text>
      {children}
    </View>
  );
};

export default ItemInputAmountProduct;
