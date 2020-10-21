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
  // =========== style modal ==========
  mainModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewModal: {
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(15),
    paddingTop: responsiveHeight(15),
  },
  txtTitleModal: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'bold',
  },
  chooseAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewIconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtModal: {
    marginLeft: responsiveWidth(10),
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  viewCheckBox: {
    paddingRight: responsiveHeight(15),
    paddingVertical: responsiveHeight(10),
  },
  // =========== style filter =======
  viewFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleFilter: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: responsiveWidth(15),
  },
  txtTitleFilter: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.h4,
    fontWeight: 'bold',
    marginRight: responsiveWidth(10),
  },
  underLineTitleFilter: {
    backgroundColor: Colors.gray,
    paddingHorizontal: responsiveWidth(10),
    height: responsiveHeight(4),
    borderRadius: responsiveHeight(2),
  },
  viewIconFilter: {
    width: responsiveWidth(25),
    height: responsiveHeight(25),
    marginRight: responsiveWidth(10),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  // ============== list item =========
  viewFlatList: {
    flex: 1,
  },
  enableMarginBottom: {
    marginBottom: HeightBottomTab,
  },
});
export default styles;
