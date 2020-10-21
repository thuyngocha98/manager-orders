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
  // =========== style line ==========
  line: {
    width: '100%',
    height: 1,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  // ============= style modal ============
  viewModal: {
    flexDirection: 'column',
    paddingTop: responsiveHeight(15),
  },
  txtTitleModal: {
    textAlign: 'center',
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'bold',
    marginBottom: responsiveHeight(15),
  },
  viewContainerSearch: {
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
  },
  viewSearch: {
    paddingRight: responsiveWidth(5),
    borderRadius: 8,
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputSearch: {
    flex: 1,
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
    height: responsiveHeight(35),
    paddingVertical: 0,
  },
  iconClear: {
    padding: 5,
  },
  listArea: {
    height: responsiveHeight(500),
    paddingHorizontal: responsiveWidth(15),
  },
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
  viewItemSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(20),
    paddingHorizontal: responsiveWidth(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    backgroundColor: Colors.white,
  },
  txtItemTitle: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  viewNote: {
    marginTop: responsiveHeight(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(20),
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  txtAddNoteTitle: {
    color: Colors.lightGreen,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  txtAddNoteDesc: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
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
});
export default styles;
