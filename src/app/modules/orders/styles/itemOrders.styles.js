import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  // ============== list item =========
  viewMainItemOrders: {
    flexDirection: 'column',
  },
  viewItemOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(10),
    marginHorizontal: responsiveWidth(15),
  },
  viewLeft: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  txtNameItem: {
    color: Colors.txtDart,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
  txtTypeCustomer: {
    marginTop: responsiveHeight(5),
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  txtTimeItem: {
    marginTop: responsiveHeight(5),
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  viewRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  txtMoney: {
    color: Colors.txtDart,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.h4,
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
  txtStatus: {
    marginTop: responsiveHeight(5),
    color: Colors.txtDart,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
  line: {
    height: 1,
    borderWidth: 0.5,
    borderColor: Colors.line,
    marginHorizontal: responsiveWidth(15),
    marginTop: responsiveHeight(10),
  },
});
export default styles;
