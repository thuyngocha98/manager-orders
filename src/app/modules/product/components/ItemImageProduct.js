import React, {memo} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styles from '@modules/product/styles/itemImageProduct.styles';
import IconClear from '@assets/iconSvg/IconClear';
import {responsiveHeight} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import IconSync from '@assets/iconSvg/IconSync';
import SelectPathImage from '@utils/SelectPathImage';

const ItemImageProduct = ({item, removeImage}) => {
  return (
    <View style={styles.viewImageItem}>
      <TouchableOpacity onPress={removeImage} style={styles.viewDeleteImage}>
        <IconClear
          width={responsiveHeight(9)}
          height={responsiveHeight(9)}
          fill={Colors.txtDark}
        />
      </TouchableOpacity>
      <View style={styles.viewImage}>
        <View style={styles.viewLoading}>
          <IconSync
            width={responsiveHeight(20)}
            height={responsiveHeight(20)}
            fill={Colors.gray}
          />
        </View>
        <Image
          style={styles.imageItem}
          source={{
            uri: item?.path ? item.path : SelectPathImage(item),
            cache: 'force-cache',
          }}
        />
      </View>
    </View>
  );
};

export default memo(ItemImageProduct);
