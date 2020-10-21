import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight} from '@utils/DimenUtils';
import {isIphoneX} from 'react-native-iphone-x-helper';
const styles = StyleSheet.create({
  mainModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewModal: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    overflow: 'hidden',
    paddingBottom: isIphoneX() ? responsiveHeight(30) : responsiveHeight(20),
  },
});
export default styles;
