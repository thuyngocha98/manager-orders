import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
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
});
export default styles;
