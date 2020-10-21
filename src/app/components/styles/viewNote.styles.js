import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
import {isIphoneX} from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  // =========== style note =========
  viewNote: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    paddingLeft: responsiveWidth(15),
    paddingRight: responsiveWidth(10),
    paddingVertical: responsiveHeight(15),
    marginBottom: isIphoneX() ? responsiveHeight(100) : responsiveHeight(90),
  },
  viewHeaderNote: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewIconNote: {
    paddingVertical: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
  },
  titleHaveContent: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  titleNoneContent: {
    color: Colors.darkGreen,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'bold',
  },
  txtContentNote: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
});
export default styles;
