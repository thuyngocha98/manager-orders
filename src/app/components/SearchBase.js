import React from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import IconSearch from '@assets/iconSvg/IconSearch';
import IconClear from '@assets/iconSvg/IconClear';
import styles from '@components/styles/searchBase.styles';

const SearchBase = ({placeholder, onClear, text, ...props}) => {
  return (
    <View style={styles.viewSearch}>
      <IconSearch
        fill={Colors.darkGreen}
        width={responsiveWidth(20)}
        height={responsiveHeight(20)}
      />
      <TextInput style={styles.input} placeholder={placeholder} {...props} />
      {text.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.viewIconClear}>
          <IconClear
            fill={Colors.darkGreen}
            width={responsiveHeight(14)}
            height={responsiveHeight(14)}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBase;
