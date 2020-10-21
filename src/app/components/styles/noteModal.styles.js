import {StyleSheet} from 'react-native';
import {responsiveWidth} from '@utils/DimenUtils';
const styles = StyleSheet.create({
  // ========== style modal ========
  mainModal: {
    position: 'absolute',
    left: 0,
    right: 0,
    marginHorizontal: responsiveWidth(40),
  },
});
export default styles;
