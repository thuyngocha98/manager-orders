import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '@modules/product/styles/itemInputUnitProduct.styles';
import IconArrowRight from '@assets/iconSvg/IconArrowRight';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';

const ItemInputUnitProduct = ({children, title, onPressSelectUnit}) => {
  return (
    <View style={styles.viewInputUnit}>
      <View style={styles.viewInput}>
        <Text style={styles.txtTitleUnit}>{title}</Text>
        {children}
      </View>
      <TouchableOpacity
        onPress={onPressSelectUnit}
        style={styles.viewIconRight}>
        <IconArrowRight
          width={responsiveWidth(20)}
          height={responsiveHeight(20)}
          fill={Colors.gray}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ItemInputUnitProduct;
