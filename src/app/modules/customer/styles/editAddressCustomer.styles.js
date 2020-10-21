import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveWidth, responsiveHeight} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
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
  // =========== style content ===========
  viewContent: {
    flex: 1,
  },
  containerInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  viewTextInput: {
    paddingTop: responsiveHeight(5),
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputLabel: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  inputStyle: {
    paddingVertical: 0,
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
    height: responsiveHeight(40),
  },
});
export default styles;
