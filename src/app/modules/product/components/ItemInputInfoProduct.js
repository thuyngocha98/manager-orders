import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from '@modules/product/styles/itemInputInfoProduct.styles';
const ItemInfoProduct = ({title, placeholder, value, filed, ...props}) => {
  return (
    <View style={styles.viewItemInfo}>
      <Text style={styles.txtTitleName}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        {...props}
      />
    </View>
  );
};

export default ItemInfoProduct;
