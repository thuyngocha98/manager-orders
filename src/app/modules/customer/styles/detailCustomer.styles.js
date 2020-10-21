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
  // ============ style modal note // ========== style modal ========
  viewModalNote: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: 'column',
  },
  txtTitleModalNote: {
    marginVertical: responsiveHeight(15),
    textAlign: 'center',
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.giant,
    fontWeight: 'normal',
  },
  viewInputNote: {
    marginHorizontal: responsiveWidth(15),
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 5,
    borderRadius: 5,
    marginBottom: responsiveHeight(15),
  },
  input: {
    paddingTop: 0,
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.giant,
    fontWeight: 'normal',
    height: responsiveHeight(100),
    textAlignVertical: 'top',
  },
  lineModal: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.gray,
  },
  viewBtnModal: {
    flex: 1,
    marginHorizontal: responsiveWidth(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTxtBtnModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(15),
  },
  txtBtnModal: {
    color: Colors.lightGreen,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  // ============= style modal delete ===========
  viewModal: {
    paddingHorizontal: responsiveWidth(15),
    marginTop: responsiveHeight(15),
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: 'column',
  },
  viewItemDelete: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtDeleteCustomer: {
    marginLeft: responsiveWidth(10),
    color: Colors.tomato,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
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
  // ============= style content ======
  viewContent: {
    flex: 1,
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    paddingVertical: responsiveHeight(15),
    backgroundColor: Colors.white,
  },
  txtTitle: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  viewClickIconItem: {
    transform: [
      {
        rotate: '-90deg',
      },
    ],
  },
  // ============== style content info ===========
  titleContact: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.small,
    fontWeight: 'normal',
  },
  viewHeaderContentInfo: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: responsiveWidth(5),
    paddingVertical: responsiveHeight(5),
    paddingLeft: responsiveWidth(15),
  },
  viewIconEdit: {
    paddingVertical: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(10),
  },
  // ============== style address ===========
  viewContentAddress: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  viewItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
    backgroundColor: Colors.white,
  },
  viewItemAddress: {
    marginTop: responsiveHeight(-5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: responsiveWidth(5),
    paddingBottom: responsiveHeight(5),
    paddingLeft: responsiveWidth(15),
    backgroundColor: Colors.white,
    marginBottom: responsiveHeight(10),
  },
  viewHeaderItemAddress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtHeaderAddress: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  viewInput: {
    flex: 1,
  },
  txtTextAddress: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
    marginBottom: responsiveHeight(5),
  },
  line: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
});
export default styles;
