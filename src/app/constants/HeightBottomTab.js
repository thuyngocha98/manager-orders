import {isIphoneX} from 'react-native-iphone-x-helper';
import {responsiveHeight} from '@utils/DimenUtils';

const HeightBottomTab = isIphoneX()
  ? responsiveHeight(82.5)
  : responsiveHeight(60);

export default HeightBottomTab;
