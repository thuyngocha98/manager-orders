import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import IconArrowRight from '@assets/iconSvg/IconArrowRight';
import {responsiveHeight} from '@utils/DimenUtils';
import styles from '@modules/home/styles/itemRowDashboard.styles';
import number2money from '@utils/NumberToMoney';
const ItemRowDashboard = ({children, number, title, onPress, type}) => {
  return type === 0 ? (
    <View style={styles.contentBox}>
      <View style={styles.rowContent}>
        <View style={styles.viewLeftItemBox}>
          <View style={styles.viewIconLeftItemBox}>{children}</View>
          <Text style={styles.txtItemBox}>{title}</Text>
        </View>
        <View style={styles.viewRightItemBox}>
          <Text style={styles.txtRightItemBox}>{number2money(number)} ₫</Text>
        </View>
      </View>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress} style={styles.contentBox}>
      <View style={styles.rowContent}>
        <View style={styles.viewLeftItemBox}>
          <View style={styles.viewIconLeftItemBox}>{children}</View>
          <Text style={styles.txtItemBox}>{title}</Text>
        </View>
        <View style={styles.viewRightItemBox}>
          <Text style={styles.txtRightItemBox}>{number2money(number)}</Text>
          <View style={styles.viewIconRightItemBox}>
            <IconArrowRight
              width={responsiveHeight(12)}
              height={responsiveHeight(17)}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemRowDashboard;
