import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from '@components/styles/checkBoxBase.styles';
import IconCheckMark from '@assets/iconSvg/IconCheckMark';
import {responsiveHeight} from '@utils/DimenUtils';
import Colors from '@const/Colors';

const CheckBoxBase = ({isChecked, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.viewCheckBox,
        {borderColor: isChecked ? Colors.darkGreen : Colors.gray},
      ]}>
      <IconCheckMark
        fill={isChecked ? Colors.darkGreen : Colors.white}
        width={responsiveHeight(13)}
        height={responsiveHeight(13)}
      />
    </TouchableOpacity>
  );
};

export default CheckBoxBase;
