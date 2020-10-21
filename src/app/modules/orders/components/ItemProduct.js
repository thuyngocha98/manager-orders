import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from '@modules/orders/styles/itemProduct.styles';
import number2money from '@utils/NumberToMoney';
import {responsiveHeight} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import IconSync from '@assets/iconSvg/IconSync';
import SelectPathImage from '@utils/SelectPathImage';

const ItemProduct = ({item}) => {
  let image = item?.image ? SelectPathImage(item.image) : null;
  return (
    <View style={styles.viewItemProduct}>
      <View style={styles.viewMainImage}>
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
        <View
          style={styles[`viewNumberProduct${item.amount.toString().length}`]}>
          <Text style={styles.txtNumberProduct}>{item.amount}</Text>
        </View>
      </View>
      <View style={styles.viewContentProduct}>
        <View style={styles.viewNameAndPriceProduct}>
          <Text style={styles.txtNameProduct}>{item.productName}</Text>
          <Text style={styles.txtNameProduct}>
            {number2money(item.amount * item.price)}
          </Text>
        </View>
        <Text style={styles.txtProduct}>SKU: {item.productCode}</Text>
        <Text style={styles.txtProduct}>{number2money(item.price)}</Text>
      </View>
    </View>
  );
};

export default ItemProduct;
