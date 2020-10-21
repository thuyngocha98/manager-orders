import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight} from '@utils/DimenUtils';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveHeight(58) + getStatusBarHeight(),
    flexDirection: 'column',
    backgroundColor: Colors.darkGreen,
  },
  header: {
    flex: 1,
    marginTop: getStatusBarHeight() + responsiveHeight(14),
  },
});
export default styles;
