import React from 'react';
import {View, Text} from 'react-native';
import styles from '@modules/home/styles/itemProcess.styles';
import {responsiveWidth, responsiveHeight} from '@utils/DimenUtils';
import Colors from '@const/Colors';
import I18n from '@assets/localization/I18n';
import IconWorking from '@assets/iconSvg/IconWorking';
import IconProcessing from '@assets/iconSvg/IconProcessing';

const ItemProcess = ({title, number}) => {
  //background view icon
  var bgColorIcon =
    title !== I18n.t('debt')
      ? Colors.backgroundIconWorking
      : Colors.backgroundIconProcessing;
  // tag icon
  var Icon = title === I18n.t('debt') ? IconProcessing : IconWorking;
  return (
    <View style={styles.viewItemProcess}>
      {/* view icon*/}
      <View style={[styles.viewIconProcess, {backgroundColor: bgColorIcon}]}>
        <Icon width={responsiveWidth(30)} height={responsiveHeight(30)} />
      </View>
      {/* view number*/}
      <View style={styles.viewNumberData}>
        <Text style={styles.txtNumber1}>{number}</Text>
        {/* <Text style={styles.txtNumber2}>{data.data.number2}</Text> */}
      </View>
      {/* view title*/}
      <View style={styles.titleProcess}>
        <Text style={styles.txtTitleProcess} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default ItemProcess;
