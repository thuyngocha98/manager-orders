import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
import HeightBottomTab from '@const/HeightBottomTab';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  // =========== style bottom modal select product type==========
  viewModalBottom: {
    flexDirection: 'column',
    paddingTop: responsiveHeight(15),
    paddingHorizontal: responsiveWidth(15),
  },
  txtTitleModal: {
    textAlign: 'center',
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'bold',
    marginBottom: responsiveHeight(15),
  },
  viewItemAllProductType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
  },
  txtItemAllProductType: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  // =========== style line ==========
  line: {
    width: '100%',
    height: 1,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  // =========== style bottom modal select setting filter =========
  viewModalFilter: {
    flexDirection: 'column',
    paddingTop: responsiveHeight(15),
  },
  viewItemSelectModalFilter: {
    paddingVertical: responsiveHeight(15),
    marginHorizontal: responsiveWidth(15),
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  viewItemSelectModalFilter1: {
    paddingVertical: responsiveHeight(15),
    marginHorizontal: responsiveWidth(15),
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  txtTitleTypeModalFilter: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'bold',
  },
  viewItemModalFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtItemFilter: {
    color: Colors.darkGreen,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  viewButtonSaveModalFilter: {
    paddingVertical: responsiveHeight(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  txtSaveModalFilter: {
    color: Colors.lightGreen,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
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
    paddingTop: responsiveHeight(15),
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
  // ============= style type product ======
  viewTypeProductAndFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewIconFilter: {
    width: responsiveWidth(25),
    height: responsiveHeight(25),
    marginRight: responsiveWidth(10),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewTypeProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsiveWidth(15),
  },
  txtTitleTypeProduct: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.h4,
    fontWeight: 'bold',
    marginRight: responsiveWidth(5),
  },
  viewIconDown: {
    transform: [{rotate: '180deg'}],
  },
  // ============ style view number item ====
  viewNumberItem: {
    width: '100%',
    height: responsiveHeight(40),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  viewAbsolute1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.backgroundColor,
  },
  txtNumberItem: {
    marginLeft: responsiveWidth(15),
    color: Colors.lightGreen,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  // ============= style item product ==========
  viewFlatList: {
    flex: 1,
  },
  enableMarginBottom: {
    marginBottom: HeightBottomTab,
  },
  // ============= style item product ==========
  viewItemProduct: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  viewImage: {
    width: responsiveHeight(60),
    height: responsiveHeight(60),
    borderRadius: 8,
    marginRight: responsiveWidth(20),
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: 'hidden',
  },
  image: {
    width: responsiveHeight(60),
    height: responsiveHeight(60),
    resizeMode: 'stretch',
  },
  viewLoading: {
    position: 'absolute',
    top: responsiveHeight(20),
    left: responsiveHeight(20),
  },
  viewContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  viewNameProduct: {
    flex: 2,
    paddingRight: responsiveWidth(5),
  },
  txtNameProduct: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  viewPriceAndAmount: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  txtPrice: {
    textAlign: 'right',
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  txtAmount: {
    marginTop: responsiveHeight(5),
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  viewCheck: {
    position: 'absolute',
    top: responsiveHeight(5),
    left: responsiveWidth(5),
    width: responsiveHeight(20),
    height: responsiveHeight(20),
    borderRadius: responsiveHeight(10),
    backgroundColor: Colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  itemSelectedOpacity: {
    opacity: 0.3,
  },
});
export default styles;
