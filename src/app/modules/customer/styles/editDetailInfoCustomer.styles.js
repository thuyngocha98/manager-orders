import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
import {isIphoneX} from 'react-native-iphone-x-helper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
  },
  // ============= style modal ==============
  viewCalendar: {
    width: responsiveWidth(375),
    height: isIphoneX() ? responsiveHeight(350) : responsiveHeight(320),
    justifyContent: 'flex-start',
  },
  viewHeaderCalendar: {
    position: 'absolute',
    top: 0,
    marginLeft: responsiveWidth(80),
    width: responsiveWidth(215),
    height: responsiveHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewSelectYear: {
    paddingTop: responsiveHeight(40),
    width: responsiveWidth(375),
    height: isIphoneX() ? responsiveHeight(350) : responsiveHeight(320),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(15),
  },
  viewItemYear: {
    width: responsiveWidth(375),
    alignItems: 'center',
    paddingVertical: responsiveHeight(15),
    backgroundColor: Colors.white,
  },
  txtYear: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
    letterSpacing: 0.8,
  },
  txtTitleYear: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.giant,
    fontWeight: 'normal',
    letterSpacing: 0.8,
  },
  // ============= style header ===========
  viewHeader: {
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
  // =============== style content ========
  viewContent: {
    flex: 1,
  },
  containerInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  viewTextInput: {
    paddingTop: responsiveHeight(5),
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputLabel: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  inputStyle: {
    paddingVertical: 0,
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
    height: responsiveHeight(40),
  },
  // ============= style day of birth ===========
  viewDayOfBirth: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    backgroundColor: Colors.white,
  },
  txtDayOfBirth: {
    marginTop: responsiveHeight(5),
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  // =========== style sex =============
  viewLabel: {
    paddingTop: responsiveHeight(5),
    paddingBottom: responsiveHeight(15),
    paddingHorizontal: responsiveWidth(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    backgroundColor: Colors.white,
  },
  txtLabel: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  viewCheckSex: {
    flexDirection: 'row',
    marginTop: responsiveHeight(5),
  },
  checkSex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtSex: {
    marginLeft: responsiveWidth(5),
    marginRight: responsiveWidth(15),
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  // ============= style contact =============
  titleContact: {
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
});
export default styles;
