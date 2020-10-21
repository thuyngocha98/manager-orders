import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: getStatusBarHeight(),
  },
  viewSlider: {
    flex: 1,
  },
  viewButton: {
    height: isIphoneX() ? responsiveHeight(180) : responsiveHeight(165),
    paddingBottom: isIphoneX() ? responsiveHeight(15) : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkGreen,
    width: responsiveWidth(335),
    paddingVertical: responsiveHeight(20),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btnLogin: {
    marginTop: responsiveHeight(25),
    backgroundColor: Colors.white,
  },
  txtBtn: {
    fontFamily: Fonts.type.medium,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: Fonts.size.giant,
    color: Colors.white,
  },
  // ============= style item =========

  viewItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: responsiveWidth(375),
  },
  txtItem: {
    fontFamily: Fonts.type.medium,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: Fonts.size.giant,
    color: Colors.txtDark,
  },
  viewDot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: responsiveHeight(6),
    height: responsiveHeight(6),
    borderRadius: responsiveHeight(3),
    backgroundColor: Colors.gray,
    marginHorizontal: responsiveWidth(3),
  },
  activeDot: {
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    borderRadius: responsiveHeight(4),
    backgroundColor: Colors.darkGreen,
    marginHorizontal: responsiveWidth(4),
  },
});
export default styles;
