import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight} from '@utils/DimenUtils';
const styles = StyleSheet.create({
  viewIconEnable: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: responsiveHeight(12),
    backgroundColor: Colors.darkGreen,
    height: responsiveHeight(24),
    width: responsiveHeight(40),
    paddingHorizontal: responsiveHeight(2),
  },
  viewIconNoneEnable: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: responsiveHeight(12),
    backgroundColor: Colors.gray,
    height: responsiveHeight(24),
    width: responsiveHeight(40),
    paddingHorizontal: responsiveHeight(2),
  },
  viewCircleSwitch: {
    width: responsiveHeight(20),
    height: responsiveHeight(20),
    borderRadius: responsiveHeight(10),
    backgroundColor: Colors.white,
  },
});
export default styles;
