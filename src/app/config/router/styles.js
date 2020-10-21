import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Fonts from '@const/Fonts';
import HeightBottomTab from '@const/HeightBottomTab';

const styles = StyleSheet.create({
  viewBtnAdd: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(50),
    height: responsiveHeight(50),
  },
  viewIcon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(28),
    height: responsiveHeight(28),
  },
  txtLabelFocus: {
    fontFamily: Fonts.type.medium,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.tiny,
    color: Colors.darkGreen,
  },
  txtLabel: {
    fontFamily: Fonts.type.medium,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: Fonts.size.tiny,
    color: Colors.gray,
  },
  plus: {
    position: 'absolute',
    color: Colors.white,
    fontSize: 28,
  },
  mainTabBar: {
    flexDirection: 'row',
    height: HeightBottomTab,
    paddingBottom: isIphoneX() ? responsiveHeight(18) : 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    elevation: 8,
  },
  mTabBar: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
