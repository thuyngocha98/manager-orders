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
  // ============= style modal ===========
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
  // ============== style content ========
  viewContent: {
    flexDirection: 'column',
  },
  // =============== style view image ========
  viewListImage: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: responsiveHeight(90),
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(15),
  },
  viewImage: {
    width: responsiveHeight(60),
    height: responsiveHeight(60),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: 'hidden',
    marginRight: responsiveWidth(10),
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
  // =============== style info product =====
  viewInfoProduct: {
    marginTop: responsiveHeight(10),
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(15),
    backgroundColor: Colors.white,
  },
  // ============== style inventory ============
  viewStock: {
    marginTop: responsiveHeight(10),
    backgroundColor: Colors.white,
    paddingVertical: responsiveHeight(15),
    paddingHorizontal: responsiveWidth(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewIconWareHouseAndContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIconWareHouse: {
    width: responsiveHeight(30),
    height: responsiveHeight(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitleWareHouse: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  txtInventory: {
    marginTop: responsiveHeight(5),
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  txtCanSell: {
    marginTop: responsiveHeight(5),
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  viewContentStock: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: responsiveWidth(15),
  },
  // ================= style allow sell =======
  viewAllowSell: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginTop: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
  },
  viewIconAllowSell: {
    width: responsiveHeight(30),
    height: responsiveHeight(30),
    borderRadius: responsiveHeight(15),
    backgroundColor: Colors.process,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIconNoneAllowSell: {
    width: responsiveHeight(30),
    height: responsiveHeight(30),
    borderRadius: responsiveHeight(15),
    backgroundColor: Colors.gray,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtAllowSell: {
    marginLeft: responsiveWidth(15),
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  // ================ style delete =============
  viewDelete: {
    marginTop: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(15),
    paddingTop: responsiveHeight(15),
    paddingBottom: isIphoneX() ? responsiveHeight(25) : responsiveHeight(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  viewContentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIconDelete: {
    width: responsiveHeight(30),
    height: responsiveHeight(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtDelete: {
    marginLeft: responsiveWidth(15),
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
});
export default styles;
