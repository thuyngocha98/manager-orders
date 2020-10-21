import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  viewItemInfo: {
    paddingVertical: responsiveHeight(15),
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  txtTitleName: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  txtName: {
    marginTop: responsiveHeight(5),
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
});
export default styles;
