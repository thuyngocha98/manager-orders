import React from 'react';
import {View, Text} from 'react-native';
import IconCheckMark from '@assets/iconSvg/IconCheckMark';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import styles from '@modules/product/styles/itemTitleAndCheckMark.styles';
const ItemTitleAndCheckMark = ({item, isChecked}) => {
  return (
    <View style={styles.viewItem}>
      <Text style={styles.txtItem}>{item.title}</Text>
      <IconCheckMark
        fill={isChecked ? Colors.darkGreen : Colors.white}
        width={responsiveWidth(20)}
        height={responsiveHeight(20)}
      />
    </View>
  );
};

export default React.memo(ItemTitleAndCheckMark);
