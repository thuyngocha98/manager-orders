import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  viewItem: {
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtName: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
  txtOrderStatus: {
    color: Colors.orange,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  txtPhone: {
    marginTop: responsiveHeight(5),
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  txtAddress: {
    marginTop: responsiveHeight(5),
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
});
export default styles;
