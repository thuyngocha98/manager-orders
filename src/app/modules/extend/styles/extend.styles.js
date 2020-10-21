import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
  },
  // ============== style modal logout ============
  viewModalBottom: {
    marginTop: responsiveHeight(15),
    backgroundColor: Colors.white,
  },
  txtTitleModal: {
    textAlign: 'center',
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'bold',
  },
  txtVerifyDelete: {
    textAlign: 'center',
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
    paddingHorizontal: responsiveWidth(40),
    marginTop: responsiveHeight(20),
  },
  viewBtn: {
    marginTop: responsiveHeight(15),
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtn: {
    paddingTop: responsiveHeight(15),
    color: Colors.lightGreen,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  // ============== style item ===========
  viewItem: {
    backgroundColor: Colors.white,
    paddingVertical: responsiveHeight(15),
    paddingHorizontal: responsiveWidth(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  viewContentItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitleItem: {
    fontFamily: Fonts.type.medium,
    fontWeight: 'normal',
    fontSize: Fonts.size.text,
    color: Colors.txtDark,
    marginLeft: responsiveWidth(10),
  },
  // =========== styles Logout ========
  viewBtnLogout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
    backgroundColor: Colors.white,
  },
  txtLogout: {
    fontFamily: Fonts.type.medium,
    fontWeight: 'normal',
    fontSize: Fonts.size.text,
    color: Colors.tomato,
  },
});
export default styles;
