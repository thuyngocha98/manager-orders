import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  container0: {
    height: responsiveHeight(40),
    width: '100%',
    backgroundColor: Colors.darkGreen,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    height: responsiveHeight(40),
    width: '100%',
    backgroundColor: Colors.backgroundButtonCancel,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle0: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'bold',
    color: Colors.white,
  },
  txtTitle1: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.newText,
    fontWeight: 'bold',
    color: Colors.txtDark,
  },
});
export default styles;
