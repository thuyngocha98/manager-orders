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
  // ============= style bottom modal select unit ===========
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
  viewListUnit: {
    marginTop: -1,
    paddingHorizontal: responsiveWidth(15),
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
    flex: 1,
  },
  // =============== style view image ========
  viewImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: responsiveHeight(15),
    paddingHorizontal: responsiveWidth(15),
  },
  viewImageItem: {
    marginRight: responsiveWidth(15),
  },
  listItemImage: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageAdd: {
    width: responsiveHeight(60),
    height: responsiveHeight(60),
    borderRadius: 8,
    resizeMode: 'stretch',
    tintColor: Colors.gray,
  },
  imageItem: {
    width: responsiveHeight(60),
    height: responsiveHeight(60),
    borderRadius: 8,
    resizeMode: 'stretch',
  },
  viewDeleteImage: {
    zIndex: 1,
    position: 'absolute',
    top: -responsiveHeight(9),
    right: -responsiveHeight(9),
    width: responsiveHeight(18),
    height: responsiveHeight(18),
    borderRadius: responsiveHeight(9),
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // =============== style info product =====
  viewInfoProduct: {
    marginTop: responsiveHeight(10),
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(15),
    backgroundColor: Colors.white,
  },
  // ============== style unit ============
  viewUnit: {
    marginTop: responsiveHeight(10),
    backgroundColor: Colors.white,
    paddingVertical: responsiveHeight(15),
    paddingHorizontal: responsiveWidth(15),
    flexDirection: 'column',
  },
  txtTitleViewUnit: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  viewMainInputUnit: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(10),
  },
  inputUnit: {
    width: '100%',
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
    paddingVertical: 0,
    height: responsiveHeight(30),
  },
  // ================= style allow sell =======
  viewAllowSell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginTop: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(15),
    paddingTop: responsiveHeight(15),
    paddingBottom: isIphoneX() ? responsiveHeight(25) : responsiveHeight(15),
  },
  txtAllowSell: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
});
export default styles;
