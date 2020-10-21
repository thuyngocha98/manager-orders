import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveWidth} from '@utils/DimenUtils';
import Fonts from '@const/Fonts';
const styles = StyleSheet.create({
  viewInput: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewInputUnit: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    marginLeft: responsiveWidth(10),
  },
  txtTitleUnit: {
    color: Colors.gray,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.text,
    fontWeight: 'normal',
  },
  viewIconRight: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
});
export default styles;
