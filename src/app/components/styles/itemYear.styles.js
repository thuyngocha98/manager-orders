import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  viewItemYear: {
    width: responsiveWidth(375),
    alignItems: 'center',
    paddingVertical: responsiveHeight(15),
    backgroundColor: Colors.white,
  },
  txtYear: {
    color: Colors.txtDark,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
    letterSpacing: 0.8,
  },
});
export default styles;
