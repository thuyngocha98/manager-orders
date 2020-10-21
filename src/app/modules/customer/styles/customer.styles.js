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
  // ============== style header =======
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
  viewIconRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIcon: {
    padding: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDisableSearch: {
    marginLeft: responsiveWidth(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  viewEnableSearch: {
    paddingRight: responsiveWidth(8),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  input: {
    marginRight: responsiveWidth(5),
    paddingVertical: 0,
    height: responsiveHeight(30),
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
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
  // ============= style list customer ==========
  viewFlatList: {
    flex: 1,
  },
  enableMarginBottom: {
    marginBottom: HeightBottomTab,
  },
  enableSearch: {
    width: '94%',
  },
  disableSearch: {
    width: 0,
  },
});
export default styles;
