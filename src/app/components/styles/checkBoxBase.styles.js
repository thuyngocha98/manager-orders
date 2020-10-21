import {StyleSheet} from 'react-native';
import Colors from '@const/Colors';
import {responsiveHeight} from '@utils/DimenUtils';
const styles = StyleSheet.create({
  viewCheckBox: {
    width: responsiveHeight(17),
    height: responsiveHeight(17),
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
