import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '@modules/product/styles/itemProduct.styles';
import number2money from '@utils/NumberToMoney';
import {responsiveHeight} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import IconSync from '@assets/iconSvg/IconSync';
import SelectPathImage from '@utils/SelectPathImage';
const ItemProduct = memo(({item, typePrice, onPress}) => {
  let image = item?.images[0] ? SelectPathImage(item.images[0]) : null;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.viewItemProduct}>
      <View style={styles.viewImage}>
        <View style={styles.viewLoading}>
          <IconSync
            width={responsiveHeight(20)}
            height={responsiveHeight(20)}
            fill={Colors.gray}
          />
        </View>
        <Image
          source={image ? {uri: image, cache: 'force-cache'} : null}
          style={styles.image}
        />
      </View>
      <View style={styles.viewContent}>
        <View style={styles.viewNameProduct}>
          <Text numberOfLines={2} style={styles.txtNameProduct}>
            {item.productName}
          </Text>
        </View>
        <View style={styles.viewPriceAndAmount}>
          <Text style={styles.txtPrice}>{number2money(item[typePrice])}</Text>
          <Text style={styles.txtAmount}>{item.amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default ItemProduct;
