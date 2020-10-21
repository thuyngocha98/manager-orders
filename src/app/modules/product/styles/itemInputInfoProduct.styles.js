import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  viewItemInfo: {
    paddingVertical: responsiveHeight(15),
    flexDirection: 'column',
  },
  txtTitleName: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  input: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
    paddingBottom: 0,
    height: responsiveHeight(40),
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
});
export default styles;
