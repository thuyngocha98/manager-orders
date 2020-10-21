import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  //============== style modal ===========
  mainModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewCalendar: {
    width: responsiveWidth(375),
    height: responsiveHeight(320),
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
    height: responsiveHeight(370),
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
  viewBtnCancel: {
    paddingHorizontal: responsiveWidth(35),
    height: responsiveHeight(40),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(5),
  },
  btnCancel: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'bold',
    color: Colors.txtDark,
  },
  viewBtnChoose: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: responsiveWidth(15),
    marginTop: responsiveHeight(10),
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
  // ============ style title =========
  viewTitle: {
    paddingVertical: responsiveHeight(15),
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  txtTitleDebt: {
    textAlign: 'center',
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.giant,
    fontWeight: 'bold',
  },
  // ============== list item ==========
  viewListItem: {
    flex: 1,
  },
  viewItem: {
    paddingVertical: responsiveHeight(15),
    paddingHorizontal: responsiveWidth(15),
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  viewLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtHeader: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  txtDesc: {
    marginTop: responsiveHeight(5),
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
});
export default styles;
