import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveHeight(58) + getStatusBarHeight(),
    flexDirection: 'column',
    backgroundColor: Colors.darkGreen,
  },
  header: {
    flex: 1,
    marginTop: getStatusBarHeight() + responsiveHeight(14),
  },
  contentHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(15),
  },
  txtTitleHeader: {
    color: Colors.white,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.giant,
    fontWeight: 'bold',
  },
});
export default styles;
