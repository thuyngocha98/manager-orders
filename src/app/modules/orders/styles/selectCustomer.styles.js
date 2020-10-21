import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
import HeightBottomTab from '@const/HeightBottomTab';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
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
  // ============== style search =========
  viewSearch: {
    backgroundColor: Colors.white,
  },
  // ============== style filter =======
  viewSync: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveHeight(40),
  },
  viewIconSync: {
    width: responsiveWidth(25),
    height: responsiveHeight(25),
    marginRight: responsiveWidth(15),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewNumberCustomer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsiveWidth(15),
  },
  txtNumberCustomer: {
    color: Colors.lightGreen,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  // ============= style item customer =======
  viewItem: {
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  viewHeaderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtName: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
  txtPhone: {
    marginTop: responsiveHeight(5),
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  txtAddress: {
    marginTop: responsiveHeight(5),
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  // ============= style list customer ==========
  viewFlatList: {
    flex: 1,
  },
  enableMarginBottom: {
    marginBottom: HeightBottomTab,
  },
});
export default styles;
