import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    marginBottom: responsiveHeight(10),
  },
  // ============= view content ========
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
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  txtContent: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
  titleContact: {
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'normal',
  },
});
export default styles;
