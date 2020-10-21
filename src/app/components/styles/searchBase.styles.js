import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight, responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  viewSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: responsiveWidth(15),
    borderRadius: 5,
    backgroundColor: Colors.backgroundColor,
    borderWidth: 1,
    borderColor: Colors.darkGreen,
    paddingLeft: responsiveWidth(5),
  },
  input: {
    paddingVertical: 0,
    marginLeft: responsiveWidth(5),
    flex: 1,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    height: responsiveHeight(40),
  },
  viewIconClear: {
    width: responsiveHeight(30),
    height: responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
