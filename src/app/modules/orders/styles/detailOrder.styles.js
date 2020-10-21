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
  // ========== style modal note ========
  viewModal: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: 'column',
  },
  txtTitleModal: {
    marginVertical: responsiveHeight(15),
    textAlign: 'center',
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.giant,
    fontWeight: 'normal',
  },
  viewInput: {
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
  viewModalDelete: {
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
  txtTitleModalDelete: {
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
  // =========== style header ==========
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
  iconRightHeader: {
    width: responsiveWidth(20),
  },
  // =========== style total order =======
  viewTotalOrder: {
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
  },
  txtNameOrder: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'bold',
  },
  txtTotalOrder: {
    textAlign: 'center',
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.h3,
    fontWeight: 'bold',
  },
  // ============ style info customer ==============
  viewInfoCustomer: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
  },
  txtTitleInfoCustomer: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'bold',
  },
  // ============ style line =========
  line: {
    width: '100%',
    height: responsiveHeight(10),
    backgroundColor: Colors.backgroundColor,
  },
  // ============ style product =========
  viewProduct: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
  },
  txtTitleProduct: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'bold',
  },
  // =========== style detail price =======
  viewDetailPrice: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    paddingVertical: responsiveHeight(15),
    paddingHorizontal: responsiveWidth(15),
  },
  rowDetailPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titlePrice: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  txtPrice: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  // =========== style button payment ==========
  viewButtonPayment: {
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderColor: Colors.line,
    width: '100%',
    height: isIphoneX() ? responsiveHeight(90) : responsiveHeight(80),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: isIphoneX() ? responsiveHeight(15) : 0,
  },
  viewBtnPay: {
    flex: 1,
    backgroundColor: Colors.darkGreen,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(50),
    marginLeft: responsiveWidth(15),
  },
  txtPayment: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.h4,
    fontWeight: 'bold',
    color: Colors.white,
  },
  btnMore: {
    marginRight: responsiveWidth(15),
    marginLeft: responsiveWidth(10),
    width: responsiveHeight(50),
    height: responsiveHeight(50),
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray,
    transform: [{rotate: '90deg'}],
  },
});
export default styles;
