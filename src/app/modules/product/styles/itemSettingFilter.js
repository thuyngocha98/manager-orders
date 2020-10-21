import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  viewItem: {
    marginTop: responsiveHeight(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtItem: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  viewCircleCheck: {
    backgroundColor: Colors.white,
    width: responsiveHeight(20),
    height: responsiveHeight(20),
    borderRadius: responsiveHeight(10),
    borderWidth: 1,
    borderColor: Colors.lightGreen,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCircleCenterCheck: {
    backgroundColor: Colors.lightGreen,
    width: responsiveHeight(12),
    height: responsiveHeight(12),
    borderRadius: responsiveHeight(6),
  },
  viewCircleNoneCheck: {
    backgroundColor: Colors.white,
    width: responsiveHeight(20),
    height: responsiveHeight(20),
    borderRadius: responsiveHeight(10),
    borderWidth: 1,
    borderColor: Colors.gray,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCircleCenterNoneCheck: {
    backgroundColor: Colors.white,
    width: responsiveHeight(12),
    height: responsiveHeight(12),
    borderRadius: responsiveHeight(6),
  },
});
export default styles;
